import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ExploreState } from '../../../explore.state';
import { Store, select } from '@ngrx/store';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/date.adapter';
import { removeLayers, setLayers } from '../../../explore.action';
import { layerGroup } from 'leaflet';
import * as L from 'leaflet';
import { formatDateUSA } from 'src/app/shared/helpers/date';
import { MonitorService } from '../../monitor.service';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { DETERclasses, getPathRow, getSensor, getSatellite } from 'src/app/shared/helpers/CONSTS';
import intersect from '@turf/intersect';
import * as turf from "@turf/helpers";
import { Editable } from './box.interface';


@Component({
    selector: 'app-edit-boxform',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    providers: [{
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class EditBoxFormComponent implements OnInit {

    @Input('drawnItems') private drawnItems: L.FeatureGroup;
    @Output() toggleToEmit = new EventEmitter();

    public formEdit: FormGroup;
    public obj: Editable;

    public satsens = [];
    public classes = [];
    public ufs = [];
    public scenes = [];
    public features = [];
    public opacity = 1.0;

    /** base url of geoserver */
    private urlGeoserver = window['__env'].urlGeoserver;
    
    private token = '';

    constructor(
        private snackBar: MatSnackBar,
        private as: AuthService,
        private store: Store<ExploreState>,
        private ms: MonitorService,
        private fb: FormBuilder) {
          this.store.pipe(select('explore')).subscribe(res => {
              if(res.featuresPeriod) {
                const features = Object.values(res.featuresPeriod).slice(0, (Object.values(res.featuresPeriod).length - 1)) as object[];
                this.scenes = features.filter( feat => feat['enabled'] ).map( feat => feat['id'] );
                this.features = features.filter( feat => feat['enabled'] );
                
                this.satsens = [];
                this.features.forEach( feat => {
                    if (feat['id'].indexOf('CBERS') >= 0 && feat['id'].indexOf('MUX') >= 0) {
                        if (this.satsens.indexOf('CBERS-4:MUX') < 0) this.satsens.push('CBERS-4:MUX');

                    } else if (feat['id'].indexOf('CBERS') >= 0 && feat['id'].indexOf('WFI') >= 0) {
                        if (this.satsens.indexOf('CBERS-4:WFI') < 0) this.satsens.push('CBERS-4:WFI');

                    } else if (feat['id'].toLowerCase().indexOf('lc8') >= 0) {
                        if (this.satsens.indexOf('LANDSAT-8:OLI') < 0) this.satsens.push('LANDSAT-8:OLI');

                    } else if (feat['id'].toLowerCase().indexOf('s2') >= 0) {
                        if (this.satsens.indexOf('SENTINEL-2:MSI') < 0) this.satsens.push('SENTINEL-2:MSI');
                    }
                })
              }
          });
    
          this.formEdit = this.fb.group({
            viewDate: ['', [Validators.required]],
            class: ['', [Validators.required]]
          });
        }
    
    ngOnInit(): void {
        this.getAuthorizeToken();
        this.classes = DETERclasses;
        this.reset();
    }

    public reset() {
        this.obj = {
            viewDate: new Date(),
            class: null
        }
    }

    /**
     * emit event to close box edit form
     */
    public closeBox() {
        this.toggleToEmit.emit();
    }

    public async submit() {
        try {
            if (this.formEdit.status === 'VALID') {
                const feature = this.features.filter(feat => feat.editable);

                if (feature.length <= 0) {
                    this.snackBar.open('Select an IMAGE/SCENE!', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                        panelClass: 'app_snack-bar-warning'
                    });

                } else {                    
                    const polygonEdited = turf.multiPolygon(this.drawnItems.toGeoJSON()['features'].map( f => f.geometry.coordinates ));
                    const polygonScene = this.getCoordinates(feature[0]);
                    const intersection = intersect(polygonEdited, polygonScene);

                    const objToSend = {
                        view_date: formatDateUSA(this.obj['viewDate']),
                        classname: this.obj['class'],
                        quadrant: this.obj['quadrant'] || null,
                        path_row: getPathRow(feature[0]),
                        satellite: getSatellite(feature[0]),
                        sensor: getSensor(feature[0]),
                        areauckm: this.obj['areauckm'] || null,
                        uc: this.obj['uc'] || null,
                        areamunkm: this.obj['areamunkm'] || null,
                        municipali: this.obj['city'] || null,
                        uf: this.obj['uf'] || null,
                        image_date: formatDateUSA(new Date(feature[0]['properties']['datetime'])),
                        scene_id: feature[0]['id'],
                        geom: { "type": "FeatureCollection", "features": [intersection] }
                    }
                    const response = await this.ms.add(objToSend, this.token);
        
                    this.snackBar.open('Polygon added!', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                        panelClass: 'app_snack-bar-success'
                    });
                    this.clear();
                }
            }
        } catch(err) {
            this.snackBar.open('Error in added polygon!', '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: 'app_snack-bar-error'
            });
        }
    }

    private clear() {
        this.store.dispatch(removeLayers(['drawPolygons', 'overlayers_deter']));

        setTimeout( _ => {
            const layer = L.tileLayer.wms(`${this.urlGeoserver}/forest-monitor/wms`, {
                layers: `forest-monitor:deter`,
                format: 'image/png',
                styles: `forest-monitor:class_deter`,
                transparent: true,
                className: `overlayers_deter`,
                env: `opacity:${this.opacity.toString()}`
            } as any).setZIndex(9999);
            this.store.dispatch(setLayers([layerGroup([layer])]));
        });
        this.closeBox();
    }

    public getCoordinates(feature) {
        if (feature.geometry.type.toLowerCase() === 'polygon') {
            return turf.polygon(feature.geometry.coordinates);
        } else if (feature.geometry.type.toLowerCase() === 'multipolygon') {
            return turf.multiPolygon(feature.geometry.coordinates);
        }
    }

    public async getAuthorizeToken() {
        try {
            const response = await this.as.token(`${window['__env'].appName}:manage:POST`);
            if (response) {
              this.token = response.access_token;
            }
          } catch (err) {}
    }
}   
import { Component, EventEmitter, Output, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
import * as turf from '@turf/helpers';
import { Editable } from './box.interface';
import { LayerService } from '../../layers/layer.service';


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
    private workspaceGeoserver = window['__env'].workspaceGeoserver;

    private featureId = null;

    private feature = null;

    private token = '';

    public headerTitle = '';

    public isSplitFeature = false;
    public splitGeom = null;

    constructor(
        private snackBar: MatSnackBar,
        private as: AuthService,
        private store: Store<ExploreState>,
        private ms: MonitorService,
        private monitorService: MonitorService,
        private ls: LayerService,
        private dialogRef: MatDialogRef<EditBoxFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder) {


          this.store.pipe(select('explore')).subscribe(res => {
              if (res.featuresPeriod) {
                const features = Object.values(res.featuresPeriod).slice(0, (Object.values(res.featuresPeriod).length - 1)) as object[];
                this.scenes = features.filter( feat => feat['enabled'] ).map( feat => feat['id'] );
                this.features = features.filter( feat => feat['enabled'] );

                this.satsens = [];
                this.features.forEach( feat => {
                    if (feat['id'].indexOf('CBERS') >= 0 && feat['id'].indexOf('MUX') >= 0) {
                        if (this.satsens.indexOf('CBERS-4:MUX') < 0) { this.satsens.push('CBERS-4:MUX'); }

                    } else if (feat['id'].indexOf('CBERS') >= 0 && feat['id'].indexOf('WFI') >= 0) {
                        if (this.satsens.indexOf('CBERS-4:WFI') < 0) { this.satsens.push('CBERS-4:WFI'); }

                    } else if (feat['id'].toLowerCase().indexOf('lc8') >= 0) {
                        if (this.satsens.indexOf('LANDSAT-8:OLI') < 0) { this.satsens.push('LANDSAT-8:OLI'); }

                    } else if (feat['id'].toLowerCase().indexOf('s2') >= 0) {
                        if (this.satsens.indexOf('SENTINEL-2:MSI') < 0) { this.satsens.push('SENTINEL-2:MSI'); }
                    }
                });
              }
          });

          this.formEdit = this.fb.group({
            viewDate: ['', [Validators.required]],
            class: ['', [Validators.required]]
          });


          if (data != null) {
            if (data.drawnItems) {
              // If drawnItems isn't null, it's an insert
              this.drawnItems = data.drawnItems;
              this.headerTitle = 'Add new Feature';
            } else {
              this.isSplitFeature = data.isSplit;
              this.splitGeom = data.splitGeom;
              // If featureId isn't null, it's an update
              this.featureId = data.featureId;
              if (this.isSplitFeature) {
                this.headerTitle = 'Split Feature';
              } else {
                this.headerTitle = 'Edit Feature';
              }
              this.loadCurrentFeature();
            }
          }
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
        };
    }

    close(sucess: boolean) {
      this.dialogRef.close(sucess);
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

                    if (this.featureId == null) {
                        // Inserting new feature
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
                            project: `${window['__env'].appName}`,
                            geom: { type: 'FeatureCollection', features: [intersection] }
                        };

                        const response = await this.ms.add(objToSend, this.token);

                        this.snackBar.open('Feature added!', '', {
                            duration: 3000,
                            verticalPosition: 'top',
                            panelClass: 'app_snack-bar-success'
                        });
                    } else {
                      if (this.isSplitFeature) {

                        // Split feature

                        const polygonEdited = this.getCoordinates(this.splitGeom);
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
                          project: `${window['__env'].appName}`,
                          featureId: this.featureId,
                          geom: {type: 'FeatureCollection', features: [polygonEdited]}
                        };

                        const response = await this.ms.split(objToSend, this.token);

                        this.snackBar.open('Feature split!', '', {
                          duration: 3000,
                          verticalPosition: 'top',
                          panelClass: 'app_snack-bar-success'
                        });

                      } else {

                        // Editing new feature

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
                          project: `${window['__env'].appName}`
                        };

                        const response = await this.ms.update(this.featureId, objToSend, this.token);

                        this.snackBar.open('Feature edited!', '', {
                          duration: 3000,
                          verticalPosition: 'top',
                          panelClass: 'app_snack-bar-success'
                        });
                      }
                    }
                    this.clear();
                }
            }
        } catch (err) {
            this.snackBar.open('Error inserting Feature!', '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: 'app_snack-bar-error'
            });
        }
    }

    private clear() {

        const destinationLayer = this.ls.getDestinationOverlayer();

        if (destinationLayer != null) {
            const className = `overlayers_${destinationLayer.id}`;
            const layerName = `${this.workspaceGeoserver}:${destinationLayer.id}`;
            const layerStyle = `${this.workspaceGeoserver}:${destinationLayer.style}`;
            this.store.dispatch(removeLayers(['drawPolygons', className]));

            setTimeout( _ => {
                const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms?{randint}`, {
                    randint: (Math.floor( Math.random() * 200000 ) + 1),
                    layers: layerName,
                    format: 'image/png',
                    styles: layerStyle,
                    transparent: true,
                    className,
                    env: `opacity:${this.opacity.toString()}`
                } as any).setZIndex(9999);
                this.store.dispatch(setLayers([layerGroup([layer])]));
            });
            this.close(true);
        }
    }

    public getCoordinates(feature) {
        if (feature.geometry.type.toLowerCase() === 'polygon') {
            return turf.polygon(feature.geometry.coordinates);
        } else if (feature.geometry.type.toLowerCase() === 'multipolygon') {
            return turf.multiPolygon(feature.geometry.coordinates);
        }
    }

    public async getAuthorizeToken()  {
        try {
            const response = await this.as.token(`${window['__env'].appName}:manage:POST`);
            if (response) {
              this.token = response.access_token;
            }
          } catch (err) {}
    }

    public async loadCurrentFeature() {
        try {
            this.as.token(`${window['__env'].appName}:manage:POST`).then(response => {
                this.token = response.access_token;
                this.monitorService.readById(this.featureId, this.token).then(featureResponse => {
                    this.feature = JSON.parse(featureResponse);
                    if (this.feature) {
                        this.obj = {
                            viewDate: new Date(),
                            class: this.feature.classname
                        };
                        this.formEdit = this.fb.group({
                            viewDate: [formatDateUSA(new Date()), [Validators.required]],
                            class: [this.feature.classname, [Validators.required]]
                          });
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
}

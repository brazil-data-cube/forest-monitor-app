import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { removeGroupLayer, removeLayers, setSelectedFeatureRemove, setLayers } from '../../explore.action';
import { Store, select } from '@ngrx/store';
import { ExploreState } from '../../explore.state';
import { MatSnackBar } from '@angular/material';
import { MonitorService } from '../monitor.service';
import * as L from 'leaflet';

@Component({
    selector: 'app-map-del-feature',
    templateUrl: './del-feature.component.html',
    styleUrls: ['./del-feature.component.scss']
})
export class DelFeatureComponent implements OnInit {
    
    public featureLayer = null;
    public showActions = false;
    public showBoxForm = false;
    public authorized = false;
    private token = null;

    /** base url of geoserver */
    private urlGeoserver = window['__env'].urlGeoserver;

    constructor(
        private as: AuthService,
        private snackBar: MatSnackBar,
        private ms: MonitorService,
        private store: Store<ExploreState>,
        private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.checkAuth();
        this.store.pipe(select('explore')).subscribe(res => {
            if (res.selectedFeatureRemove) {
                this.featureLayer = res.selectedFeatureRemove;
                this.ref.detectChanges();
            } else {
                this.featureLayer = null;
                this.ref.detectChanges();
            }
        });
    }

    public toggleBoxActions() {
        this.showActions = !this.showActions;
        this.ref.detectChanges();
    }

    public async del() {
        try {
            let response = await this.ms.del(this.featureLayer, this.token);

            this.store.dispatch(removeLayers(['overlayers_deter']));            

            setTimeout( _ => {
                const layer = L.tileLayer.wms(`${this.urlGeoserver}/forest-monitor/wms`, {
                    layers: `forest-monitor:deter`,
                    format: 'image/png',
                    styles: `forest-monitor:class_deter`,
                    transparent: true,
                    className: `overlayers_deter`,
                    env: `opacity:1.0`
                } as any).setZIndex(9999);
                this.store.dispatch(setLayers([L.layerGroup([layer])]));

                this.snackBar.open('Polygon deleted!', '', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: 'app_snack-bar-success'
                });
                // remove last feature polygon
                this.store.dispatch(removeGroupLayer({
                    key: 'attribution',
                    prefix: 'feature_selected'
                }));
                this.store.dispatch(setSelectedFeatureRemove({ payload: null }));

                setTimeout( _ => {
                    this.toggleBoxActions();
                });
            });

        } catch(err) {
            this.snackBar.open('Error in deleted polygon!', '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: 'app_snack-bar-error'
            });
        }

    }

    public async checkAuth() {
        try {
          const response = await this.as.token(`${window['__env'].appName}:manage:DELETE`);
          this.token = response.access_token;
          this.authorized = true;
    
        } catch(err) {
          this.authorized = false;
        }
      }
}   
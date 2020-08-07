import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { removeGroupLayer, removeLayers, setSelectedFeatureRemove, setLayers } from '../../explore.action';
import { Store, select } from '@ngrx/store';
import { ExploreState } from '../../explore.state';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MonitorService } from '../monitor.service';
import * as L from 'leaflet';
import { FeatureInfoComponent } from '../feature-info/feature-info.component';

@Component({
    selector: 'app-map-del-feature',
    templateUrl: './del-feature.component.html',
    styleUrls: ['./del-feature.component.scss']
})
export class DelFeatureComponent implements OnInit {

    public featureId = null;
    public authorized = false;
    private token = null; 

    /** base url of geoserver */
    private urlGeoserver = window['__env'].urlGeoserver;
    private workspaceGeoserver = window['__env'].workspaceGeoserver;

    constructor(
        private as: AuthService,
        private snackBar: MatSnackBar,
        private ms: MonitorService,
        private store: Store<ExploreState>,
        private ref: ChangeDetectorRef,
        private dialogRef: MatDialogRef<DelFeatureComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) 
    {
        if(data.featureId)
        {
            this.checkAuth(); 
            this.featureId=data.featureId;
        }
    }

    ngOnInit() {
        
    }

    public async del() {
        try {
            let response = await this.ms.del(this.featureId, this.token);

            this.store.dispatch(removeLayers(['overlayers_deter']));

            setTimeout( _ => {
                const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms`, {
                    layers: `${this.workspaceGeoserver}:deter`,
                    format: 'image/png',
                    styles: `${this.workspaceGeoserver}:class_deter`,
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
                    
                  this.dialogRef.close(true);
                  
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

      public close()
      {
        this.dialogRef.close(false);
      }
}

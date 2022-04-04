import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AuthService} from 'src/app/pages/auth/auth.service';
import {removeLayers, setLayers} from '../../explore.action';
import {Store} from '@ngrx/store';
import {ExploreState} from '../../explore.state';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MonitorService} from '../monitor.service';
import * as L from 'leaflet';
import {layerGroup} from 'leaflet';
import {LayerService} from '../layers/layer.service';

@Component({
  selector: 'app-map-del-feature',
  templateUrl: './del-feature.component.html',
  styleUrls: ['./del-feature.component.scss']
})
export class DelFeatureComponent implements OnInit {

  public featureId = null;
  public authorized = false;
  public opacity = 1.0;
  private token = null;
  /** base url of geoserver */
  private urlGeoserver = window['__env'].urlGeoserver;
  private workspaceGeoserver = window['__env'].workspaceGeoserver;

  constructor(
    private as: AuthService,
    private snackBar: MatSnackBar,
    private ms: MonitorService,
    private ls: LayerService,
    private store: Store<ExploreState>,
    private ref: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DelFeatureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.featureId) {
      this.checkAuth();
      this.featureId = data.featureId;
    }
  }

  ngOnInit() {
  }

  public async del() {
    try {
      const response = await this.ms.del(this.featureId, this.token);

      this.clear();

    } catch (err) {
      this.snackBar.open('Error deleting Feature!', '', {
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

    } catch (err) {
      this.authorized = false;
    }
  }

  public close(bool: boolean) {
    this.dialogRef.close(bool);
  }

  private clear() {

    this.store.dispatch(removeLayers(['overlayers_deter']));

    const destinationLayer = this.ls.getDestinationOverlayer();

    if (destinationLayer != null) {
      const className = `overlayers_${destinationLayer.id}`;
      const layerName = `${this.workspaceGeoserver}:${destinationLayer.id}`;
      const layerStyle = `${this.workspaceGeoserver}:${destinationLayer.style}`;
      this.store.dispatch(removeLayers(['drawPolygons', className]));

      setTimeout(_ => {
        const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms?{randint}`, {
          randint: (Math.floor(Math.random() * 200000) + 1),
          layers: layerName,
          format: 'image/png',
          styles: layerStyle,
          transparent: true,
          className,
          env: `opacity:${this.opacity.toString()}`
        } as any).setZIndex(9999);
        this.store.dispatch(setLayers([layerGroup([layer])]));

        this.snackBar.open('Feature deleted!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'app_snack-bar-success'
        });

        this.close(true);
      });

    }
  }
}

import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {LayerService} from '../layers/layer.service';
import * as L from 'leaflet';
import {Map as MapLeaflet} from 'leaflet';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {destinationLayerIdField, DETERclassesSPLITALLOWED} from 'src/app/shared/helpers/CONSTS';
import {DelFeatureComponent} from '../del-feature/del-feature.component';
import {EditBoxFormComponent} from '../editable/box/box.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.scss'],
})

export class FeatureInfoComponent implements OnInit {
  public latlongTxt: any;
  public layersData: any;
  public featureId;
  public splitPolygon: any;
  public showSplit;
  private containerPoint: any;
  private drawControl: any;
  /** pointer to reference map */
  private map: MapLeaflet;
  private splitFeatureId: any;
  private splitGeometry: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FeatureInfoComponent>,
    private cdRef: ChangeDetectorRef,
    private ls: LayerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.latlongTxt = data.latlongTxt;
    this.containerPoint = data.containerPoint;
    this.map = data.map;
    this.drawControl = data.drawControl;
    this.layersData = [];
    this.getFeaturesInfo();
  }


  ngOnInit() {
  }

  async getFeaturesInfo() {
    const size = this.map.getSize();
    this.showSplit = false;

    try {
      const overlayers = this.ls.getOverlayers();
      const overlayersLength = overlayers.length;
      // get infos Feature by layer (From all Layers)
      for (let i = overlayersLength - 1; i > -1; i--) {
        const layer = overlayers[i];
        const response = await this.ls.getInfoByWMS(
          layer.id, this.map.getBounds().toBBoxString(), this.containerPoint.x, this.containerPoint.y, size.y, size.x);

        if (response.features.length > 0) {

          let featureId = null;
          const keys = Object.keys(response.features[0].properties);
          const properties = [];
          keys.forEach(key => {
            if (key.includes('date') || key.includes('created_at')) {
              let value = response.features[0].properties[key];
              if (value && value[value.length - 1] === 'Z') {
                value = value.substring(0, value.length - 1);
                response.features[0].properties[key] = value;
              }
            }
            const property = {
              name: key,
              value: response.features[0].properties[key]
            };
            properties.push(property);

            if (key === destinationLayerIdField) {
              featureId = response.features[0].properties[key];
            }

          });

          if (!this.showSplit && layer.destinationLayer) {
            const classNameIndex = properties.findIndex(value => value.name === 'classname');
            if (classNameIndex && classNameIndex !== -1) {
              const className = properties[classNameIndex].value;
              this.showSplit = DETERclassesSPLITALLOWED.includes(className);
            }
          }

          const data = {
            layerId: layer.id,
            layerName: layer.name,
            isDestinationLayer: layer.destinationLayer,
            featureProperties: properties,
            featureId,
            featureKey: destinationLayerIdField,
            geom: response.features[0].geometry
          };
          this.layersData.push(data);

        }
        this.cdRef.detectChanges();
      }

    } catch (err) {

      return;
    }
  }

  showDeleteFeature(featureId: any) {
    const delFeature = this.dialog.open(DelFeatureComponent,
      {
        width: '400px',
        height: '200px',
        data: {
          featureId
        }
      });
    delFeature.afterClosed().subscribe(result => {
      if (result === true) {
        this.close();
      }
    });
  }

  zoomToFeature(geom: any) {
    const layer = new L.GeoJSON(geom);
    const ll = layer.getBounds();
    this.map.fitBounds(ll);
  }

  showSplitFeature(featureData: any) {
    this.zoomToFeature(featureData.geom);

    this.enableSplitEditing(featureData.featureId);

    const dialogPosition = {left: `10px`};
    this.dialogRef.updatePosition(dialogPosition);
  }

  /** get shapefile */
  getShapefileById(layerId: any, featureKey: any, featureId: any) {
    const cqlFilter = `${featureKey}=${featureId}`;
    const outputFilename = `${layerId}-${featureId}.zip`;

    const url = this.ls.getFeaturesDownloadURL(layerId, outputFilename, cqlFilter);

    this.ls.getShapefileById(url).subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type
      });
      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = `${outputFilename}`;
      link.click();
      window.URL.revokeObjectURL(blob);
      link.remove();
    });

  }

  showEditFeature(featureId: any, isSplit: boolean, splitGeom: any, sourceGeom: any = null) {
    const editFeature = this.dialog.open(EditBoxFormComponent,
      {
        width: '360px',
        height: '320px',
        data: {
          featureId,
          isSplit,
          splitGeom,
          sourceGeom
        }
      });
    editFeature.afterClosed().subscribe(result => {
      if (result === true) {
        this.close();
      }
    });
  }

  copyCoordinatesToClipboard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackBar.open('Coordinates copied to the clipboard!!', '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'app_snack-bar-success'
    });
  }

  close() {
    this.dialogRef.close();
  }

  public enableSplitEditing(featureId: any) {
    if (!this.splitPolygon) {
      this.splitPolygon = new L.Draw.Polygon(this.map, this.drawControl.options.polygon);

      this.splitPolygon.enable();

      this.splitFeatureId = featureId;

      this.map.on(L.Draw.Event.CREATED, (e) => {
        this.splitGeometry = e.layer.toGeoJSON();

        if (document.getElementById('showSplitEditFeature')) {
          document.getElementById('showSplitEditFeature').click();
        }
      });
    }
  }

  public showSplitEditFeature(layerData: any) {
    const featureId = layerData.featureId;
    const sourceGeom = layerData.geom;
    this.showEditFeature(featureId, true, this.splitGeometry, sourceGeom);
  }

  public trackByFn(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }

}

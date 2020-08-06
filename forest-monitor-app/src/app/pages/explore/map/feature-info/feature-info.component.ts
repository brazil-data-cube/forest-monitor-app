import { Component, OnInit, Input, NgModule, Inject, Optional, ChangeDetectorRef } from '@angular/core';
import { LayerService } from '../layers/layer.service';
import { latLng, MapOptions, Layer, Map as MapLeaflet,
  LatLngBoundsExpression, Control, Draw, rectangle, LatLngLiteral } from 'leaflet';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-feature-info',
  templateUrl: './feature-info.component.html',
  styleUrls: ['./feature-info.component.scss'],
})

export class FeatureInfoComponent implements OnInit
{
  private latlong: any;
  private screenPosition: any; 
  public layersData: any;
  
  /** pointer to reference map */
  private map: MapLeaflet;

  panelOpenState = false;
  constructor( 
   @Inject(MAT_DIALOG_DATA) public data: any,
   private dialogRef: MatDialogRef<FeatureInfoComponent>,
   private cdRef: ChangeDetectorRef,
    private ls: LayerService,
    private focusMonitor: FocusMonitor)
  {
    this.latlong=data.latlong;
    this.screenPosition=data.screenPosition;
    this.map=data.map;
    
    this.layersData=[];
    this.getFeaturesInfo();

   }

  ngOnInit() {
  }

  async getFeaturesInfo()
  {
    const point = this.map.latLngToContainerPoint(this.latlong);
     const size = this.map.getSize();
     
     try {
       var overlayers = this.ls.getOverlayers();
       //get infos Feature by layer (From all Layers)
       for (let i = overlayers.length-1; i >= 0; i--) {
         let layer = overlayers[i];
         const response = await this.ls.getInfoByWMS(
           layer.id, this.map.getBounds().toBBoxString(), point.x, point.y, size.y, size.x);
        
           if (response.features.length > 0) {
             console.log()
             
             let keys = Object.keys(response.features[0].properties);
             let properties = [];
             keys.forEach(key => {
              let property = 
              {
                name: key,
                value: response.features[0].properties[key]
              }
              properties.push(property);
             });
             

             let data = 
             {
              layerId: layer.id,
              layerName: layer.name,
              isDestinationLayer: layer.destinationLayer,
              featureProperties: properties
             }
             this.layersData.push(data);
             
           }
           this.cdRef.detectChanges();
       }
       
     } catch(err) {

       return;
    }
  }

  close()
  {
  
    this.dialogRef.close();
  }

}

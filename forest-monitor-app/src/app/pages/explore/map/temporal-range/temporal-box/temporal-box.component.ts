import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as L from 'leaflet';
import {layerGroup} from 'leaflet';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from 'src/app/shared/helpers/date.adapter';

import {LayerService} from '../../layers/layer.service';
import {BdcOverlayer} from '../../layers/layer.interface';
import {ExploreState} from '../../../explore.state';
import {removeLayers, setLayers} from '../../../explore.action';
import {Editable} from './temporal-box.interface';
import {FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDateUSA} from 'src/app/shared/helpers/date';


@Component({
  selector: 'app-temporal-box',
  templateUrl: './temporal-box.component.html',
  styleUrls: ['./temporal-box.component.scss'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class TemporalBoxComponent implements OnInit {

  @Input('show') public showBox: boolean;
  @Output() toggleToEmit = new EventEmitter();
  public formEdit: FormGroup;
  public obj: Editable;
  public classes = [];
  public rangeTemporal: Date[];
  public layersTitle = [];
  public layers = {};
  public id = '1';
  public token = null;
  public startDate: any;
  public lastDate: any;
  public todayDate = new Date();
  events: string[] = [];
  /** base url of geoserver */
  private urlGeoserver = window['__env'].urlGeoserver;
  private workspaceGeoserver = window['__env'].workspaceGeoserver;

  constructor(private ls: LayerService,
              private store: Store<ExploreState>) {
  }

  ngOnInit(): void {
    this.mountListLayers();
  }

  public mountListLayers() {
    this.ls.getOverlayers().forEach((l: BdcOverlayer) => {
      this.layersTitle.push(l.name);
      this.layers[l.name] = {
        opacity: 10
      };
    });
    this.updateOpacityLayers();
  }

  public toggleBox() {
    this.toggleToEmit.emit();
  }


  startDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.startDate = formatDateUSA(event.value);
  }

  lastDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.lastDate = formatDateUSA(event.value);
  }

  public reset() {
    const overlayers = this.ls.getOverlayers().map(l => `overlayers_${l.id}`);
    this.store.dispatch(removeLayers(overlayers));

    setTimeout(_ => {
      this.ls.getOverlayers().forEach((l: BdcOverlayer) => {
        const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms`, {
          layers: `${this.workspaceGeoserver}:${l.id}`,
          format: 'image/png',
          styles: `${this.workspaceGeoserver}:${l.style}`,
          transparent: true,
          className: `overlayers_${l.id}`,
          env: `opacity:${(this.layers[l.name]['opacity'] / 10).toString()}`
        } as any).setZIndex(9999);
        this.store.dispatch(setLayers([layerGroup([layer])]));
      });
    });
  }

  public updateOpacityLayers() {
    const overlayers = this.ls.getOverlayers().map(l => `overlayers_${l.id}`);
    this.store.dispatch(removeLayers(overlayers));

    const destinationLayer = this.ls.getDestinationOverlayer();

    if (destinationLayer != null) {
      const className = `overlayers_${destinationLayer.id}`;
      const layerName = `${this.workspaceGeoserver}:${destinationLayer.id}`;
      const layerStyle = `${this.workspaceGeoserver}:${destinationLayer.style}`;

      setTimeout(_ => {
        const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms`, {
          layers: `${layerName}`,
          format: 'image/png',
          styles: `${layerStyle}`,
          transparent: true,
          className: `${className}`,
          crs: L.CRS.EPSG4326,
          CQL_FILTER: `view_date >= '${this.startDate}' && view_date <= '${this.lastDate}'`
        } as any).setZIndex(9999);
        this.store.dispatch(setLayers([layerGroup([layer])]));
      });
    }
  }
}

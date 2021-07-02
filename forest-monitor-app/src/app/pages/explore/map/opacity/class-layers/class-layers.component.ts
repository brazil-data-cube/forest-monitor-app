import {removeLayers, setLayers} from '../../../explore.action';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import {layerGroup} from 'leaflet';

import {ExploreState} from '../../../explore.state';
import {LayerService} from '../../layers/layer.service';
import {BdcClassLayer} from '../../layers/layer.interface';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-class-layers',
  templateUrl: './class-layers.component.html',
  styleUrls: ['./class-layers.component.scss']
})
export class ClassLayesrComponent implements OnInit {

  @Input('show') public showBox: boolean;
  @Output() toggleToEmit = new EventEmitter();


  /** base url of geoserver */
  private urlGeoserver = window['__env'].urlGeoserver;
  private workspaceGeoserver = window['__env'].workspaceGeoserver;

  constructor(private ls: LayerService,
              private store: Store<ExploreState>) {}

    public classDeter = [];
    public classD = {};


    ngOnInit() {
      this.moutclasss();

    }

    public toggleBoxC() {
      this.toggleToEmit.emit();
    }

    public moutclasss() {
      this.ls.getClass().forEach( (l: BdcClassLayer) => {
        this.classDeter.push(l.name);
        this.classD[l.name] = {
            opacity: 10
        };
    });
      this.updateOpacityClass();

    }


  public updateOpacityClass() {
    const overlayers = this.ls.getClass().map( l => `overlayers_${l.layer}` );
    this.store.dispatch(removeLayers(overlayers));
    setTimeout( _ => {
            this.ls.getClass().forEach( (l: BdcClassLayer) => {
                const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms`, {
                    layers: `${this.workspaceGeoserver}:${l.layer}`,
                    format: 'image/png',
                    styles: `${this.workspaceGeoserver}:${l.style}`,
                    transparent: true,
                    className: `overlayers_${l.layer}`,
                    crs: L.CRS.EPSG4326,
                    CQL_FILTER: `classname='${l.name}'`,
                    env: `opacity:${(this.classD[l.name]['opacity'] / 10).toString()}`
                } as any).setZIndex(9999);
                this.store.dispatch(setLayers([layerGroup([layer])]));

            });
        });
    }

}


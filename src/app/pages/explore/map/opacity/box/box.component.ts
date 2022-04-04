import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as L from 'leaflet';
import {layerGroup} from 'leaflet';

import {LayerService} from '../../layers/layer.service';
import {BdcOverlayer} from '../../layers/layer.interface';
import {ExploreState} from '../../../explore.state';
import {removeLayers, setLayers} from '../../../explore.action';

@Component({
    selector: 'app-map-opacity-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss']
})
export class OpacityBoxComponent implements OnInit {

    @Input('show') public showBox: boolean;

    @Output() toggleToEmit = new EventEmitter();

    public layersTitle = [];
    public layers = {};

    /** base url of geoserver */
    private urlGeoserver = window['__env'].urlGeoserver;
    private workspaceGeoserver = window['__env'].workspaceGeoserver;

    constructor(private ls: LayerService,
                private store: Store<ExploreState>) {}

    ngOnInit(): void {
        this.mountListLayers();
    }

    public mountListLayers() {
        let opacity;
        this.ls.getOverlayers().forEach( (l: BdcOverlayer) => {
            this.layersTitle.push(l.name);
            if (l.name === 'LIMITE MUNICIPAL') {
                opacity = 0;
            } else {
                 opacity = 10;
            }
            this.layers[l.name] = {
                opacity
            };
        });
        this.updateOpacityLayers();
    }

    public toggleBox() {
        this.toggleToEmit.emit();
    }

    public updateOpacityLayers() {
        const overlayers = this.ls.getOverlayers().map( l => `overlayers_${l.id}` );
        this.store.dispatch(removeLayers(overlayers));

        setTimeout( _ => {
            this.ls.getOverlayers().forEach( (l: BdcOverlayer) => {
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
  public trackByFn(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }
}

import { Injectable } from '@angular/core';
import { BdcLayer, BdcOverlayer } from './layer.interface';
import { BaseLayers } from './base-layers.in-memory';
import { Overlayers } from './overlayer.in-memory';
import { HttpClient } from '@angular/common/http';

/**
 * Layer Service
 * returns layers to visualization in the map
 */
@Injectable({ providedIn: 'root' })
export class LayerService {
    
    /** start http service client */
    constructor(private http: HttpClient) { }

    /** base url of STAC */
    private urlGeoserver = window['__env'].urlGeoserver;
    private workspaceGeoserver = window['__env'].workspaceGeoserver;

    /**
     * get base layers of the map
     */
    public getBaseLayers(): BdcLayer[] {
        return BaseLayers;
    }

    /**
     * get grids of the BDC project
     */
    public getOverlayers(): BdcOverlayer[] {
        return window['__env'].geoserverLayers;
    }

    /**
     * get info feature WMS
     */
    public async getInfoByWMS(layer, bbox, x, y, height, width): Promise<any> {
        const basePath = `/${this.workspaceGeoserver}/wms?REQUEST=GetFeatureInfo&SERVICE=WMS&SRS=EPSG:4326&VERSION=1.1.1`;
        let urlSuffix = `${basePath}&BBOX=${bbox}&HEIGHT=${height}&WIDTH=${width}`;
        urlSuffix += `&LAYERS=${this.workspaceGeoserver}:${layer}&QUERY_LAYERS=${this.workspaceGeoserver}:${layer}&INFO_FORMAT=application/json&X=${x}&Y=${y}`;

        const response = await this.http.get(`${this.urlGeoserver}${urlSuffix}`).toPromise();
        return response;
    }

}
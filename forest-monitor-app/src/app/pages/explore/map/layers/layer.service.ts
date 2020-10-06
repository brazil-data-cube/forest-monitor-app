import { FeatureInfoComponent } from './../feature-info/feature-info.component';
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
    constructor(private http: HttpClient, 
) { }

    /** base url of STAC */
    private urlGeoserver = window['__env'].urlGeoserver;
    private workspaceGeoserver = window['__env'].workspaceGeoserver;

    /** */
    pathShape = `${this.urlGeoserver}/wfs?request=getfeature&service=wfs&version=1.0.0`;
    public shape = `${this.pathShape}&typename=${this.workspaceGeoserver}:deter&outputformat=SHAPE-ZIP&cql_filter`;
    
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
    /**get shapefile */

    getShapefileById(url:string){
        
        return this.http.get(url, {
            responseType: 'blob'
        })
   
    }

    /**
     * Get Overlayer by id
     */
    public getOverlayerById(layerId) : BdcOverlayer {
        var layer = null;

        for (var i = 0, len = this.getOverlayers().length; i < len; i++) 
        {
            if(this.getOverlayers()[i].id==layerId)
            {
                layer = this.getOverlayers()[i];
                break;
            }
        }
        
        return layer;
    }

    
    /**
     * Get destination overlayer
     */
    public getDestinationOverlayer() : BdcOverlayer {
        var layer = null;

        for (var i = 0, len = this.getOverlayers().length; i < len; i++) 
        {
            if(this.getOverlayers()[i].destinationLayer==true)
            {
                layer = this.getOverlayers()[i];
                break;
            }
        }
        
        return layer;
    }

}
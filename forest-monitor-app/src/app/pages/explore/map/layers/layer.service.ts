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

    /** */   
    /**
     * get base layers of the map
     */
    public getBaseLayers() {
        
        return BaseLayers.getBdcLayer([]);
        
    }

 
    /**
     * get grids of the BDC project
     */
    public getOverlayers(): BdcOverlayer[] {
        return window['__env'].geoserverLayers;
    }
    /**
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
    
        
        /**get shapefile */

    public getShapefileById(url:string){
        
            return this.http.get(url, {
                responseType: 'blob'
            })
       
        }
    /**
     *  This functions returns the URL to download a shapefile from geoserver respecting a optinal filter
     * @param layerName Layer to download from
     * @param outputFilename Shapefile zip output filename (optional)
     * @param filter A filter string clause. It will be used as cql_filter. Ex. id=35 (optional)
     */
    public getFeaturesDownloadURL(layerName, outputFilename, filter)
    {

        let url = `${this.urlGeoserver}/wfs?request=getfeature&service=wfs&version=1.0.0`;
        url+= `&typename=${this.workspaceGeoserver}:${layerName}&outputformat=SHAPE-ZIP`;

        if(filter)
        {
            url+=`&cql_filter=${filter}`
        }

        if(outputFilename)
        {
            url+=`&format_options=filename:${outputFilename}`
        }
        
        return url;

    }

}
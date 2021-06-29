import {Layer} from 'leaflet';

/**
 * Language
 * interface of each layer
 */
export interface BdcLayer {
    /** id (unique) to layer identification */
    id: string;
    /** layer name shown in the component */
    name: string;
    /** layer state (visible/invisible) */
    enabled: boolean;
    /** tileLayer in leaflet */
    layer: Layer;
}

/**interface of class of geoserver */
export interface BdcClassLayer {
    enable: boolean;
    name: string;
    filter: boolean;
    layer: string;
    style: string;


}

export interface BdcOverlayer {
    /** id (unique) to layer identification */
    id: string;
    /** layer name shown in the component */
    name: string;
    /** layer state (visible/invisible) */
    enabled: boolean;
    /** tileLayer in leaflet */
    layer: Layer;
    /** apply filter to diff colors/styles */
    filter: boolean;
    /** apply filter to diff colors/styles */
    style: string;
    /** Is this the destination layer of the api (edition purpose) */
    destinationLayer: boolean;
}

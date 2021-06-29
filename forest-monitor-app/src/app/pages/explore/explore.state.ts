import {LatLngBoundsExpression, Layer} from 'leaflet';

/** State Model - used in Explore module */
export interface ExploreState {
    /** all selected features */
    readonly features: object[];
    /** selected features/items in the period */
    readonly featuresPeriod: Object[];
    /** layers visible in the map */
    readonly layers: Layer[];
    /** list of layers to remove in the map */
    readonly layersToDisabled: string[];
    /** list of group layer to remove in the map */
    readonly layerGroupToDisabled: object;
    /** bounding box of the map */
    readonly positionMap: LatLngBoundsExpression;
    /** range (start-end) with selected dates */
    readonly rangeTemporal: Date[];
    /** range (start-end) of the slider period */
    readonly actualRangeTemporal: Date[];
    /** selected bounding box */
    readonly bbox: LatLngBoundsExpression;
    /** Selected Feature to customize style (STAC Feature) */
    readonly selectedFeatureEdit: any;
    readonly selectedFeatureRemove: any;
    readonly styleFeature: any;
}

import { createAction, props } from '@ngrx/store';
import { Layer, LatLngBounds } from 'leaflet';

/**
 * set Features in store application
 */
export const setFeatures = createAction(
    '[Explore Component] Features',
    props<object[]>()
);

/**
 * set Features od the period (slider) in store application
 */
export const setFeaturesPeriod = createAction(
    '[Explore Component] Features By Period',
    props<object[]>()
);

/**
 * set Layers enabled in the map
 */
export const setLayers = createAction(
    '[Map Component] Layers',
    props<Layer[]>()
);

/**
 * remove Layers enabled in the map
 */
export const removeLayers = createAction(
    '[Map Component] name Layers',
    props<string[]>()
);

/**
 * remove Layers group enabled in the map
 */
export const removeGroupLayer = createAction(
    '[Map Component] name group layer',
    props<object>()
);

/**
 * set position of the map
 */
export const setPositionMap = createAction(
    '[Map Component] Position',
    props<LatLngBounds>()
);

/**
 * set Bounding Box selected in search form
 */
export const setBbox = createAction(
    '[Map Component] Bounding Box',
    props<LatLngBounds>()
);

/**
 * set Dates filtered in store application
 */
export const setRangeTemporal = createAction(
    '[Map Component] Range Temporal',
    props<Date[]>()
);

/**
 * set Dates actual step filtered in store application
 */
export const setActualRangeTemporal = createAction(
    '[Map Component] Range Actual Temporal',
    props<Date[]>()
);

export const setSelectedFeatureEdit = createAction(
    '[Map Component] Selected Feature Edit',
    props<{ payload: any }>()
);

export const setSelectedFeatureRemove = createAction(
    '[Map Component] Selected Feature Remove',
    props<{ payload: any }>()
);

export const setStyleForLayer = createAction(
    '[Map Component] Style For Layer',
    props<{ payload: any }>()
);

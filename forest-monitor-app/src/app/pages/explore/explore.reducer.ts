import {Action, createReducer, on} from '@ngrx/store';
import {
  removeGroupLayer,
  removeLayers,
  setActualRangeTemporal,
  setBbox,
  setFeatures,
  setFeaturesPeriod,
  setLayers,
  setPositionMap,
  setRangeTemporal,
  setSelectedFeatureEdit,
  setSelectedFeatureRemove,
  setStyleForLayer
} from './explore.action';
import {ExploreState} from './explore.state';

/** initial values to Explore State */
const initialState: ExploreState = {
  features: [],
  featuresPeriod: [],
  layers: [],
  layersToDisabled: [],
  layerGroupToDisabled: [],
  positionMap: null,
  bbox: null,
  rangeTemporal: [],
  actualRangeTemporal: [],
  selectedFeatureEdit: null,
  selectedFeatureRemove: null,
  styleFeature: null
};

/**
 * reducer to manage explore state
 * set new values in ExploreState
 */
const reducerExplore = createReducer(initialState,
  on(setFeatures, (state, payload) => {
    return { ...state, features: payload };
  }),
  on(setFeaturesPeriod, (state, payload) => {
    return { ...state, featuresPeriod: payload };
  }),
  on(setLayers, (state, payload) => {
    return { ...state, layers: payload };
  }),
  on(removeLayers, (state, payload) => {
    return { ...state, layersToDisabled: payload };
  }),
  on(removeGroupLayer, (state, payload) => {
    return { ...state, layerGroupToDisabled: payload };
  }),
  on(setPositionMap, (state, payload) => {
    return { ...state, positionMap: payload };
  }),
  on(setRangeTemporal, (state, payload) => {
    return { ...state, rangeTemporal: payload };
  }),
  on(setActualRangeTemporal, (state, payload) => {
    return { ...state, actualRangeTemporal: payload };
  }),
  on(setBbox, (state, payload) => {
    return { ...state, bbox: payload };
  }),
  on(setSelectedFeatureEdit, (state, action) => {
    return { ...state, selectedFeatureEdit: action.payload }
  }),
  on(setSelectedFeatureRemove, (state, action) => {
    return { ...state, selectedFeatureRemove: action.payload }
  }),
  on(setStyleForLayer, (state, action) => {
    return { ...state, styleFeature: action.payload }
  })
);

export function reducer(state: ExploreState | undefined, action: Action) {
  return reducerExplore(state, action);
}

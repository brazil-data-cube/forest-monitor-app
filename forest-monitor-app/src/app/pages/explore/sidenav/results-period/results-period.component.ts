import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ExploreState } from '../../explore.state';
import { setFeaturesPeriod, setLayers, removeLayers, removeGroupLayer, setSelectedFeatureEdit } from '../../explore.action';
import { getPathRow, getSensor, getSatellite, defaultRGBBands } from 'src/app/shared/helpers/CONSTS';
import 'src/assets/plugins/Leaflet.TileFilter/leaflet-tilefilter.js';
import * as moment from 'moment';
import * as L from 'leaflet';

/**
 * Display Results/Features by Period
 * simple static component
 */
@Component({
  selector: 'app-results-period',
  templateUrl: './results-period.component.html',
  styleUrls: ['./results-period.component.scss']
})
export class ResultsPeriodComponent {

  public features = [];

  private urlLambdaSentinel = window['__env'].urlLambdaSentinel;
  private urlLambdaLANDSAT = window['__env'].urlLambdaLANDSAT;
  private urlLambdaCBERS = window['__env'].urlLambdaCBERS;
  private lambdaToken = window['__env'].lambdaToken;
  private planetAPIKey = window['__env'].planetAPIKey;

  /** count of result per page */
  public perPage = 10;
  /** page selected */
  public page = 1;

  constructor(private store: Store<ExploreState>) {
    this.store.pipe(select('explore')).subscribe(res => {
      if (res.featuresPeriod) {
        const features = Object.values(res.featuresPeriod).slice(0, (Object.values(res.featuresPeriod).length - 1)) as object[];
        this.features = features.sort( (a,b) => {
          const aDate = a['properties']['datetime'] || a['properties']['acquired'];
          const bDate = a['properties']['datetime'] || a['properties']['acquired'];
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        })
      } else {
        this.features = [];
      }
    });
  }

  /**
   * format datetime to string
   */
  public formatDate(value: number): string {
    return moment.utc(value).format('YYYY-MM-DD');
  }

  public getFeatureName(feature: any) {
    const satellite = this.getSatellite(feature);

    if (satellite === 'Planet') {
      return 'Planet (Mosaic)';
    } else if(satellite === 'PlanetDaily') {
      return 'Planet (Daily)'
    } else {
      return `${satellite} - ${this.getSensor(feature)} - (${this.getPathRow(feature)})`;
    }
  }

  public isPlanetDaily(feature): boolean {
    return this.getSatellite(feature) === 'PlanetDaily';
  }

  public isPlanetMosaic(feature): boolean {
    return this.getSatellite(feature) === 'Planet';
  }

  public isPlanet(feature): boolean {
    return this.isPlanetDaily(feature) || this.isPlanetMosaic(feature);
  } 

  public getThumbnail(feature): string {
    if (this.isPlanetDaily(feature)) {
      return `${feature._links.thumbnail}?api_key=${this.planetAPIKey}`;
    } else {
      return feature.assets.thumbnail.href;
    }
  }

  public enableFeature(event, f) {
    if (event.checked) {

      if (this.isPlanetMosaic(f)) {
        const layerTile = (L.tileLayer as any).colorFilter(`${f._links.tiles}`, {
          className: `qls_planet_${f.id}`,
          filter: []
        });
        this.store.dispatch(setLayers([layerTile]));

      } else if(this.isPlanetDaily(f)) {
        const url = `https://tiles0.planet.com/data/v1/${f.properties.item_type}/${f.id}/{z}/{x}/{y}.png?api_key=${this.planetAPIKey}`
        const layerTile = (L.tileLayer as any).colorFilter(url, {
          className: `qls_planet_${f.id}`,
          filter: []
        });
        this.store.dispatch(setLayers([layerTile]));

      } else {
        const style = {}
        if (f['style']) {
          const st = f['style']
          style['bands'] = `${st['red']['band']},${st['green']['band']},${st['blue']['band']}`;

          style['percents'] = `${st['red']['min']},${st['red']['max']},${st['green']['min']},${st['green']['max']},`;
          style['percents'] += `${st['blue']['min']},${st['blue']['max']}`;

          style['formula'] = `Gamma RGB ${st['gamma']} Saturation ${st['saturation']}`;
          if (st['sigmoidal']) {
            style['formula'] += ` Sigmoidal RGB ${st['sigmoidal']}`;
          }
        } else {
          style['percents'] = '1,99,1,99,1,99';
          style['formula'] = 'Gamma RGB 1 Saturation 1';
        }

        const collection = f['properties']['collection'] || f['collection'];
        const bands = style['bands'] || Object.values(defaultRGBBands[collection]).join(',');

        if (collection === 'sentinel-2-l1c') {
          const infosFeature = f.id.split('_');
          const sceneId = `${infosFeature[0]}_tile_${infosFeature[2]}_${infosFeature[1]}_${infosFeature[3]}`;
          const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
          const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaSentinel}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
            className: `qls_sentinel_${f.id}`,
            filter: []
          });
          this.store.dispatch(setLayers([layerTile]));

        } else if (collection === 'landsat-8-l1') {
          const sceneId = f['properties']['landsat:product_id'];
          const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
          const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaLANDSAT}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
            className: `qls_landsat_${f.id}`,
            filter: []
          });
          this.store.dispatch(setLayers([layerTile]));

        } else if (collection.indexOf('CBERS') >= 0) {
          
          const sceneId = f['id'];
          if (sceneId.indexOf('MUX') >= 0) {
            const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
            const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaCBERS}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
              className: `qls_cbers_${f.id}`,
              filter: []
            });
            this.store.dispatch(setLayers([layerTile]));
          } else {
            const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
            const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaCBERS}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
              className: `qls_cbers_${f.id}`,
              filter: []
            });
            this.store.dispatch(setLayers([layerTile]));
          }

        }
      }

      const newFeatures = this.features.map( feature => {
        if (feature.id == f.id) {
          feature['enabled'] = true;
        }
        return feature;
      });
      this.store.dispatch(setFeaturesPeriod(newFeatures));

    } else {
      // DISABLED
      const newFeatures = this.features.map( feature => {
        if (feature.id == f.id) {
          feature['enabled'] = false;
        }
        return feature;
      });
      this.store.dispatch(setFeaturesPeriod(newFeatures));

      if (f['properties']['collection'] === 'sentinel-2-l1c') {
        this.store.dispatch(removeLayers([`qls_sentinel_${f.id}`]));
      } else if (f['properties']['collection'] === 'landsat-8-l1') {
        this.store.dispatch(removeLayers([`qls_landsat_${f.id}`]));
      } else if (f['collection'] && f['collection'].indexOf('CBERS') >= 0) {
        this.store.dispatch(removeLayers([`qls_cbers_${f.id}`]));
      } else if (this.isPlanet(f)) {
        this.store.dispatch(removeLayers([`qls_planet_${f.id}`]));
      }
    }
  }

  public getSatellite(feature) {
    return getSatellite(feature);
  }

  public getPathRow(feature) {
    return getPathRow(feature);
  }

  public getSensor(feature) {
    return getSensor(feature);
  }

  public changeImgEdit(event, feature) {
    this.store.dispatch(removeGroupLayer({
      key: 'attribution',
      prefix: 'polygon_scene_selected'
    }))

    const fIdSelected = event.checked ? feature['id'] : '';
    const newFeatures = this.features.map( feature => {
      if (feature.id === fIdSelected) {
        feature['editable'] = true;

        // Skip since planet does not provides geometry geojson
        if (this.isPlanet(feature))
          return;

        const newLayer = new L.GeoJSON(feature as any, {
          attribution: 'polygon_scene_selected'
        }).setStyle({
          weight: 3,
          color: '#009999',
          fillOpacity: 0
        });
        this.store.dispatch(setLayers([newLayer]));

      } else {
        feature['editable'] = false;
      }
      return feature;
    });
    this.store.dispatch(setFeaturesPeriod(newFeatures));
  }

  public openStyleBox($event, feature) {
    this.store.dispatch(setSelectedFeatureEdit({ payload: feature }))
  }
}

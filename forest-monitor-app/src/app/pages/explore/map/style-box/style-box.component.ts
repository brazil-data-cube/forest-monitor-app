import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ExploreState} from '../../explore.state';
import {removeLayers, setLayers, setSelectedFeatureEdit} from '../../explore.action';
import {bandsBySensor, defaultRGBBands, getPathRow, getSatellite, getSensor} from 'src/app/shared/helpers/CONSTS';
import * as L from 'leaflet';

@Component({
  selector: 'app-style-box',
  templateUrl: './style-box.component.html',
  styleUrls: ['./style-box.component.scss']
})
export class StyleBoxComponent implements OnInit {
  showStyleBox = false;
  style: any;
  bandsAvailable: string[];

  private selectedFeature: any;
  private urlLambdaSentinel = window['__env'].urlLambdaSentinel;
  private urlLambdaLANDSAT = window['__env'].urlLambdaLANDSAT;
  private urlLambdaCBERS = window['__env'].urlLambdaCBERS;
  private lambdaToken = window['__env'].lambdaToken;

  constructor(
    private store: Store<ExploreState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('explore')).subscribe(res => {
      if (!res.selectedFeatureEdit) {
        this.showStyleBox = false;
        return;
      }

      this.selectedFeature = res.selectedFeatureEdit;
      const collection = this.selectedFeature['properties']['collection'] || this.selectedFeature['collection'];
      if (this.selectedFeature.style && Object.keys(this.selectedFeature.style).length > 0) {
        this.style = this.selectedFeature.style;
      } else {
        this.resetValues(collection);
      }
      this.showStyleBox = true;
      this.bandsAvailable = bandsBySensor[collection];
    });
  }

  sendStyle() {
    this.selectedFeature.style = this.style;
    this.removeLayer(this.selectedFeature);

    const st = this.style;
    const style = {};
    style['bands'] = `${st['red']['band']},${st['green']['band']},${st['blue']['band']}`;

    style['percents'] = `${st['red']['min']},${st['red']['max']},${st['green']['min']},${st['green']['max']},`;
    style['percents'] += `${st['blue']['min']},${st['blue']['max']}`;

    style['formula'] = `Gamma RGB ${st['gamma']} Saturation ${st['saturation']}`;
    if (st['sigmoidal']) {
      style['formula'] += ` Sigmoidal RGB ${st['sigmoidal']}`;
    }

    const collection = this.selectedFeature['properties']['collection'] || this.selectedFeature['collection'];
    const bands = style['bands'] || Object.values(defaultRGBBands[collection]).join(',');

    if (collection === 'sentinel-s2-l2a-cogs') {
      const infosFeature = this.selectedFeature.id.split('_');
      const sceneId = `${infosFeature[0]}_tile_${infosFeature[2]}_${infosFeature[1]}_${infosFeature[3]}`;
      const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
      const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaSentinel}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
        className: `qls_sentinel_${this.selectedFeature.id}`,
        filter: []
      });
      this.store.dispatch(setLayers([layerTile]));

    } else if (collection === 'landsat-8-l1-c1') {
      const sceneId = this.selectedFeature['properties']['landsat:product_id'];
      const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
      const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaLANDSAT}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
        className: `qls_landsat_${this.selectedFeature.id}`,
        filter: []
      });
      this.store.dispatch(setLayers([layerTile]));

    } else if (collection.indexOf('CBERS') >= 0) {
      const sceneId = this.selectedFeature.id;
      if (sceneId.indexOf('MUX') >= 0) {
        const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
        const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaCBERS}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
          className: `qls_cbers_${this.selectedFeature.id}`,
          filter: []
        });
        this.store.dispatch(setLayers([layerTile]));
      } else {
        const params = `access_token=${this.lambdaToken}&bands=${bands}&color_formula=${style['formula']}&percents=${style['percents']}`;
        const layerTile = (L.tileLayer as any).colorFilter(`${this.urlLambdaCBERS}/${sceneId}/{z}/{x}/{y}.png?${params}`, {
          className: `qls_cbers_${this.selectedFeature.id}`,
          filter: []
        });
        this.store.dispatch(setLayers([layerTile]));
      }

    }
  }

  reset() {
    delete this.selectedFeature.style;
    this.resetValues(this.selectedFeature['properties']['collection'] || this.selectedFeature['collection']);
  }

  resetValues(collection) {
    this.style = {
      red: {
        band: this.getBandsByCollection('red', collection),
        min: 1,
        max: 99
      },
      green: {
        band: this.getBandsByCollection('green', collection),
        min: 1,
        max: 99
      },
      blue: {
        band: this.getBandsByCollection('blue', collection),
        min: 1,
        max: 99
      },
      gamma: 1,
      saturation: 1,
      sigmoidal: null
    };
  }

  getFeatureName() {
    return `${getSatellite(this.selectedFeature)}-${getSensor(this.selectedFeature)} (${getPathRow(this.selectedFeature)})`;
  }

  getBandsByCollection(band, collection) {
    return defaultRGBBands[collection][band];
  }

  removeLayer(f) {
    if (f['collection'] === 'sentinel-s2-l2a-cogs') {
      this.store.dispatch(removeLayers([`qls_sentinel_${f.id}`]));
    } else if (f['collection'] === 'landsat-8-l1-c1') {
      this.store.dispatch(removeLayers([`qls_landsat_${f.id}`]));
    } else if (f['collection'] && f['collection'].indexOf('CBERS') >= 0) {
      this.store.dispatch(removeLayers([`qls_cbers_${f.id}`]));
    } else if (getSatellite(f) === 'Planet') {
      this.store.dispatch(removeLayers([`qls_planet_${f.id}`]));
    }
  }

  closeBox() {
    this.store.dispatch(setSelectedFeatureEdit({ payload: null }));
  }
}

import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ExploreState} from '../../explore.state';
import {LabelType, Options} from 'ng5-slider';
import {removeGroupLayer, setFeaturesPeriod, setLayers} from '../../explore.action';
import * as L from 'leaflet';
import {Layer} from 'leaflet';
import {addDays} from 'src/app/shared/helpers/date';
import * as moment from 'moment';
import {defaultRGBBands, getSatellite} from 'src/app/shared/helpers/CONSTS';

/**
 * Map Slider component
 * component to manage slider of the map
 */
@Component({
  selector: 'app-map-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  /** all features */
  private features: object[] = [];
  /** steps - list dates to mount slider */
  public steps: Date[] = [];
  /** position selected in slider - start date */
  public value;
  public highValue;
  /** options used to mount slider */
  public options: Options = {};
  /** layers/features visibled in the map */
  public layers: Layer[];

  private urlLambdaSentinel = window['__env'].urlLambdaSentinel;
  private urlLambdaLANDSAT = window['__env'].urlLambdaLANDSAT;
  private urlLambdaCBERS = window['__env'].urlLambdaCBERS;
  private lambdaToken = window['__env'].lambdaToken;
  private planetAPIKey = window['__env'].planetAPIKey;

  /** quantity days to group in slider period */
  private sliderGroupDays = parseInt(window['__env'].sliderGroupDays);

  constructor(private store: Store<ExploreState>) {
    this.store.pipe(select('explore')).subscribe(res => {
      const lastStep = this.steps;
      const lastFeatures = this.features;

      this.steps = [];
      if (res.features) {
        this.features = Object.values(res.features).slice(0, (Object.values(res.features).length - 1)) as object[];
      }
      if (Object.values(res.rangeTemporal).length && this.features.length) {
        // mount list with dates
        let startDate = new Date(res.rangeTemporal['0']);
        const lastDate = new Date(res.rangeTemporal['1']);
        while (startDate <= lastDate) {
          this.steps.push(startDate);
          startDate = this.nextPeriod(startDate);
        }

        // insert first step/period
        this.steps.unshift(new Date(res.rangeTemporal['0']));
        // remove last period
        this.steps.pop();

        // update infos to display
        this.value = this.value ? this.value : this.steps[0];
        this.highValue = this.highValue ? this.highValue : this.steps[1];
        this.options = {
          showTicks: true,
          showSelectionBar: true,
          floor: this.steps[0].getTime(),
          ceil: this.steps[this.steps.length - 1].getTime(),
          stepsArray: this.steps.map((date: Date) => {
            return { value: date.getTime() };
          }),
          translate: (value: number, _: LabelType): string => {
            return `${this.formatDate(value)}`;
          }
        };

        setTimeout( _ => {
          if ((this.steps.length !== lastStep.length) ||
              (lastFeatures.length !== this.features.length)) {
            this.changeValue(new Date(res.rangeTemporal['0']), this.nextPeriod(new Date(res.rangeTemporal['0'])));
          }
        });
      }
    });
  }

  /** select the features by value selected in slider */
  public changeValue(startDate: Date, lastDate: Date) {
    // remove images displayed
    this.store.dispatch(removeGroupLayer({
      key: 'className',
      prefix: 'qls_'
    }));

    // filter new features
    const actualDate = this.value ? new Date(this.value) : startDate;
    const endDate = this.highValue ? new Date(this.highValue) : lastDate;
    if (actualDate && endDate) {
      // get start / end date by period
      const startPeriod = moment.utc(new Date(actualDate.setMonth(actualDate.getMonth())), 'YYYY-MM-DD').hour(0);
      const endPeriod = moment.utc(new Date(endDate.setMonth(endDate.getMonth())), 'YYYY-MM-DD').hour(0);

      // apply filter
      const featSelected = this.features.filter(feat => {
        const featureDatetime = feat['properties'].datetime ?
          moment.utc(feat['properties'].datetime) :
          moment.utc(feat['properties'].acquired);

        return feat['type'].toLowerCase() === 'feature'
          && featureDatetime.isSameOrAfter(startPeriod) // >= startPeriod
          && featureDatetime.isBefore(endPeriod);
      });

      // plot new features
      const featSelectedEdited = featSelected.map( (f: any) => {

        if (f.enabled) {
          if (getSatellite(f) === 'Planet') {
            const layerTile = (L.tileLayer as any).colorFilter(`${f._links.tiles}`, {
              className: `qls_planet_${f.id}`,
              filter: []
            });
            this.store.dispatch(setLayers([layerTile]));

          } else if (getSatellite(f) === 'PlanetDaily') {
            const url = `https://tiles0.planet.com/data/v1/${f.properties.item_type}/${f.id}/{z}/{x}/{y}.png?api_key=${this.planetAPIKey}`;
            const layerTile = (L.tileLayer as any).colorFilter(url, {
              className: `qls_planet_${f.id}`,
              filter: []
            });
            this.store.dispatch(setLayers([layerTile]));

          } else {
            const style = {};
            if (f['style']) {
              const st = f['style'];
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
          f['enabled'] = true;
          return f;

        } else {
          f['enabled'] = false;
          return f;
        }
      });

      setTimeout( _ => {
        this.store.dispatch(setFeaturesPeriod(featSelectedEdited));
      });
    }
  }

  /**
   * sum with one period
   */
  public nextPeriod(date: Date): Date {
    return addDays(date, this.sliderGroupDays);
  }

  /**
   * format datetime to string by temporal schema
   */
  public formatDate(value: number): string {
    return `${new Date(value).getFullYear()}-${new Date(value).getMonth() + 1}-${new Date(value).getDate()}`;
  }

}

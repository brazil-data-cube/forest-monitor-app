import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MatSnackBar} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {LatLngBoundsExpression, rectangle, Rectangle} from 'leaflet';

import {SearchService} from './search.service';
import {ExploreState} from '../../explore.state';
import {formatDateUSA} from 'src/app/shared/helpers/date';
import {
  removeGroupLayer,
  setBbox,
  setFeatures,
  setLayers,
  setPositionMap,
  setRangeTemporal
} from '../../explore.action';
import {closeLoading, showLoading} from 'src/app/app.action';
import {APP_DATE_FORMATS, AppDateAdapter} from 'src/app/shared/helpers/date.adapter';
import {collectionKeyByCollection} from 'src/app/shared/helpers/CONSTS';
import {Search} from './search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }]
})
export class SearchComponent implements OnInit {

  /** Existing resources */
  public productsList: object[];
  /** selected resources by user */
  public products: string[];
  /** available collections */
  public collections: string[];
  /** range with dates to search */
  public rangeTemporal: Date[];
  /** infos with parameters to search images */
  public searchObj: Search;
  /** products available */
  public satellites = {
    sentinel: true,
    landsat: true,
    cbers: true,
    planet: false
  };

  public formSearch: FormGroup;

  /**
   * get infos of store application and set group of validators
   */
  constructor(
    private ss: SearchService,
    private snackBar: MatSnackBar,
    private store: Store<ExploreState>,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef) {
      this.store.pipe(select('explore')).subscribe(res => {
        if (res.bbox) {
          const bbox = Object.values(res.bbox);
          this.searchObj['bbox'] = {
            north: bbox[1]['lat'],
            south: bbox[0]['lat'],
            west: bbox[0]['lng'],
            east: bbox[1]['lng']
          };
          this.ref.detectChanges();
        }
      });

      this.formSearch = this.fb.group({
        sentinel: [''],
        landsat: [''],
        cbers: [''],
        planet: [''],
        north: ['', [Validators.required]],
        west: ['', [Validators.required]],
        east: ['', [Validators.required]],
        south: ['', [Validators.required]],
        cloudCover: [''],
        start_date: ['', [Validators.required]],
        last_date: ['', [Validators.required]]
      });
    }

  /**
   * set basic values used to mount component
   */
  ngOnInit() {
    this.resetSearch();
    this.rangeTemporal = [
      new Date(2000, 1, 1),
      new Date()
    ];
  }

  /**
   * search feature/items
   */
  public async search() {
    if (this.formSearch.status !== 'VALID') {
      this.snackBar.open('Fill in all fields correctly!', '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-error'
      });

    } else {
      try {
        this.store.dispatch(showLoading());

        const collections = Object.keys(this.satellites)
          .filter(sat => this.satellites[sat] === true)
          .map(sat => collectionKeyByCollection[sat]);

        if (collections.length <= 0) {
          console.log('select satellite');

        } else {
          const startDate = new Date(this.searchObj['start_date']);
          const lastDate = new Date(this.searchObj['last_date']);

          const bbox: number[] = Object.values(this.searchObj['bbox']);
          const bboxStr = `${bbox[2]},${bbox[1]},${bbox[3]},${bbox[0]}`;

          let planetFeatures = { mosaics: [] };
          let planetItemsFeatures = { features: [] };

          if (this.satellites.planet) {
            collections.splice(collections.indexOf(collectionKeyByCollection.planet), 1);
            planetFeatures = await this.ss.searchPlanet(startDate, lastDate, bboxStr, this.searchObj['cloudCover']);

            // create geometry - Rectangle
            const geometry = new Rectangle([[bbox[1], bbox[2]], [bbox[0], bbox[3]]]);
            const coordinates = geometry.toGeoJSON().geometry.coordinates;
            planetItemsFeatures = await this.ss.searchPlanetItems(startDate, lastDate, coordinates);
          }

          let output = { meta: {}, features: [] };

          if (collections.length > 0) {
            let query = `bbox=${bboxStr}`;
            query += `&collections=${collections.join(',')}`;
            query += `&cloud_cover=${this.searchObj['cloudCover']}`;
            query += `&time=${formatDateUSA(startDate)}`;
            query += `/${formatDateUSA(lastDate)}`;
            query += `&limit=1000`;
            const res = await this.ss.searchSTAC(query);

            output = {...res};
          }

          output.features = [...output.features, ...planetFeatures.mosaics, ...planetItemsFeatures['features']];

          if (output.features.length > 0) {
            this.store.dispatch(setRangeTemporal([
              startDate,
              lastDate
            ]));

            this.store.dispatch(setFeatures(output.features.filter(f => f.type.toLowerCase() == 'feature')));

          } else {
            this.store.dispatch(setFeatures([]));
            this.snackBar.open('RESULTS NOT FOUND!', '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'app_snack-bar-error'
            });
          }
        }

      } catch (err) {
        this.snackBar.open('INCORRECT SEARCH!', '', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-error'
        });

      } finally {
        this.store.dispatch(closeLoading());
      }
    }
  }

  /**
   * clean fields in the search form
   */
  private resetSearch() {
    this.searchObj = {
      satellite: null,
      bbox: {
        north: null,
        south: null,
        west: null,
        east: null
      },
      cloudCover: 100,
      start_date: null,
      last_date: null
    };
  }

  /**
   * view bounding box in map
   */
  public previewBbox(bbox) {
    this.removeLayerBbox();
    const bounds: LatLngBoundsExpression = [
      [bbox.north, bbox.east],
      [bbox.south, bbox.west]
    ];
    const newLayers = rectangle(bounds, {
      color: '#FFF',
      weight: 3,
      fill: false,
      dashArray: '10',
      interactive: false,
      className: 'previewBbox'
    });

    this.store.dispatch(setLayers([newLayers]));
    this.store.dispatch(setBbox(newLayers.getBounds()));
    this.store.dispatch(setPositionMap(newLayers.getBounds()));
  }

  /**
   * remove bounding box of the map
   */
  public removeLayerBbox() {
    this.store.dispatch(removeGroupLayer({
      key: 'className',
      prefix: 'previewBbox'
    }));
  }

  /**
   * return if exists all selected coordinates
   */
  public bboxNotEmpty(): boolean {
    return this.searchObj.bbox.north != null && this.searchObj.bbox.south != null && this.searchObj.bbox.east != null && this.searchObj.bbox.west != null;
  }
}

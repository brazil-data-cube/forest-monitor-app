import {temporalInterface} from './temporal.interface';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as L from 'leaflet';
import {layerGroup} from 'leaflet';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from 'src/app/shared/helpers/date.adapter';

import {LayerService} from '../../layers/layer.service';
import {BdcOverlayer} from '../../layers/layer.interface';
import {ExploreState} from '../../../explore.state';
import {removeLayers, setLayers} from '../../../explore.action';
import {Editable} from './temporal-box.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MonitorService} from '../../monitor.service';
import {AuthService} from 'src/app/pages/auth/auth.service';


@Component({
  selector: 'app-temporal-box',
  templateUrl: './temporal-box.component.html',
  styleUrls: ['./temporal-box.component.scss'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }]
})
export class TemporalBoxComponent implements OnInit {

  @Input('show') public showBox: boolean;

  @Output() toggleToEmit = new EventEmitter();

  public formEdit: FormGroup;
  public obj: Editable;
  public classes = [];
  public rangeTemporal: Date[];
  public searchObj: temporalInterface;

  public layersTitle = [];
  public layers = {};
  public dateForm: FormGroup

  public id = '1';
  public token = null;
  private featureId = null;
  private feature = null;



  /** base url of geoserver */
  private urlGeoserver = window['__env'].urlGeoserver;
  private workspaceGeoserver = window['__env'].workspaceGeoserver;
  resposta: string;
  static lastDateTemporalRange: any;

  constructor(private ls: LayerService,
    private store: Store<ExploreState>,
    private monitorService: MonitorService,
    private as: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mountListLayers();
  }

  public mountListLayers() {
    this.ls.getOverlayers().forEach((l: BdcOverlayer) => {
      this.layersTitle.push(l.name);
      this.layers[l.name] = {
        opacity: 10
      };
    });
    this.updateOpacityLayers();
  }

  public toggleBox() {
    this.toggleToEmit.emit();
  }

  events: string[] = [];


  startDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    var startDate = event.value.toString()
    // console.log("START Event: ", startDateTemporalRange)
    // startDate = startDate.substr(4, 11)
    // startDate = startDate.substr(7, 4) + '-' + startDate.substr(0, 3) + '-' + startDate.substr(4, 2)
    // console.log("START Event: ", startDateTemporalRange.substr(0, 11))

    // switch (startDate.substr(5, 3)) {
    //   case ('Jan'): {
    //     startDate = startDate.substr(0, 5) + '01' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Feb'): {
    //     startDate = startDate.substr(0, 5) + '02' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Mar'): {
    //     startDate = startDate.substr(0, 5) + '03' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Apr'): {
    //     startDate = startDate.substr(0, 5) + '04' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('May'): {
    //     startDate = startDate.substr(0, 5) + '05' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Jun'): {
    //     startDate = startDate.substr(0, 5) + '06' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Jul'): {
    //     startDate = startDate.substr(0, 5) + '07' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Aug'): {
    //     startDate = startDate.substr(0, 5) + '08' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Sep'): {
    //     startDate = startDate.substr(0, 5) + '09' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Oct'): {
    //     startDate = startDate.substr(0, 5) + '10' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Nov'): {
    //     startDate = startDate.substr(0, 5) + '11' + startDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Dec'): {
    //     startDate = startDate.substr(0, 5) + '12' + startDate.substr(8, 3)
    //     break;
    //   }
    //   default: {
    //     //statements;
    //     break;
    //   }
    // }
    // console.log('Pos Mudança: ', startDate)


  }

  lastDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log('Teste',event.value)
    // TemporalBoxComponent.lastDateTemporalRange = event.value
    // return this.lastDateTemporalRange
    // var lastDate = event.value.toString()
    // // console.log("START Event: ", lastDateTemporalRange)
    // lastDate = lastDate.substr(4, 11)
    // lastDate = lastDate.substr(7, 4) + '-' + lastDate.substr(0, 3) + '-' + lastDate.substr(4, 2)
    // // console.log("START Event: ", lastDateTemporalRange.substr(0, 11))

    // switch (lastDate.substr(5, 3)) {
    //   case ('Jan'): {
    //     lastDate = lastDate.substr(0, 5) + '01' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Feb'): {
    //     lastDate = lastDate.substr(0, 5) + '02' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Mar'): {
    //     lastDate = lastDate.substr(0, 5) + '03' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Apr'): {
    //     lastDate = lastDate.substr(0, 5) + '04' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('May'): {
    //     lastDate = lastDate.substr(0, 5) + '05' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Jun'): {
    //     lastDate = lastDate.substr(0, 5) + '06' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Jul'): {
    //     lastDate = lastDate.substr(0, 5) + '07' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Aug'): {
    //     lastDate = lastDate.substr(0, 5) + '08' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Sep'): {
    //     lastDate = lastDate.substr(0, 5) + '09' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Oct'): {
    //     lastDate = lastDate.substr(0, 5) + '10' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Nov'): {
    //     lastDate = lastDate.substr(0, 5) + '11' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   case ('Dec'): {
    //     lastDate = lastDate.substr(0, 5) + '12' + lastDate.substr(8, 3)
    //     break;
    //   }
    //   default: {
    //     //statements;
    //     break;
    //   }
    // }
    // const lastDateTemporalRange = new Date(lastDate)
    // console.log('Pos Mudança: ', lastDateTemporalRange)
    // return lastDateTemporalRange
  }

  public async teste()
    {
        // this.monitorService.readByDate(this.token);
    }

  public updateOpacityLayers() {
    const overlayers = this.ls.getOverlayers().map(l => `overlayers_${l.id}`);
    this.store.dispatch(removeLayers(overlayers));
    // console.log('TemporalBoxComponent.lastDateTemporalRange: ',TemporalBoxComponent.lastDateTemporalRange)
    //pegar o valor do mat-datepicker
    // console.log('FeatureInfoComponent.getDateRange: ',FeatureInfoComponent.getDateRange)


    this.teste()

    //apertar update pra testar
    // if (FeatureInfoComponent.getDateRange() <= TemporalBoxComponent.lastDateTemporalRange) {
      // console.log('FeatureInfoComponent.getDateRange: ',FeatureInfoComponent.getDateRange)


      setTimeout(_ => {
        this.ls.getOverlayers().forEach((l: BdcOverlayer) => {
          const layer = L.tileLayer.wms(`${this.urlGeoserver}/${this.workspaceGeoserver}/wms`, {
            layers: `${this.workspaceGeoserver}:${l.id}`,
            format: 'image/png',
            styles: `${this.workspaceGeoserver}:${l.style}`,
            transparent: true,
            className: `overlayers_${l.id}`,
            env: `opacity:${(this.layers[l.name]['opacity'] / 10).toString()}`
          } as any).setZIndex(9999);
          this.store.dispatch(setLayers([layerGroup([layer])]));
        });
      });
    // }
  }
}

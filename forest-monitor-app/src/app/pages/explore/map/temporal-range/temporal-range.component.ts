import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Rectangle } from 'leaflet';
import { showLoading, closeLoading } from 'src/app/app.action';
import { collectionKeyByCollection } from 'src/app/shared/helpers/CONSTS';
import { formatDateUSA } from 'src/app/shared/helpers/date';
import { setRangeTemporal, setFeatures } from '../../explore.action';
import { ExploreState } from '../../explore.state';
import { Search } from '../../sidenav/search/search.interface';
import { SearchService } from '../../sidenav/search/search.service';

@Component({
  selector: 'app-temporal-range',
  templateUrl: './temporal-range.component.html',
  styleUrls: ['./temporal-range.component.scss']
})

export class TemporalRangeComponent implements OnInit {
  static showDeterTemporalRange() {
    throw new Error('Method not implemented.');
  }

  showBox: boolean;

  public toggleBox() {
      this.showBox = !this.showBox;
  }

  ngOnInit() {

  }
}

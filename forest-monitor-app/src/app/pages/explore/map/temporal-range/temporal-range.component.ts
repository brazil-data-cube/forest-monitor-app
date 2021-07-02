import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-temporal-range',
  templateUrl: './temporal-range.component.html',
  styleUrls: ['./temporal-range.component.scss']
})

export class TemporalRangeComponent implements OnInit {

  showBox: boolean;
  static showDeterTemporalRange() {
    throw new Error('Method not implemented.');
  }

  public toggleBox() {
      this.showBox = !this.showBox;
  }

  ngOnInit() {

  }
}

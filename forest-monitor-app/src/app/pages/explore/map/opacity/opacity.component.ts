import {Component} from '@angular/core';

@Component({
  selector: 'app-map-opacity',
  templateUrl: './opacity.component.html',
  styleUrls: ['./opacity.component.scss']
})
export class OpacityComponent {

  public showBox = false;

  public toggleBox() {
    this.showBox = !this.showBox;
  }
}

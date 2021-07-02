import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-opacity-class',
  templateUrl: './opacity-class.component.html',
  styleUrls: ['./opacity-class.component.scss']
})
export class OpacityClassComponent implements OnInit {

  constructor() { }

  public showBox = false;

  ngOnInit() {
  }
  public toggleBoxC() {
      this.showBox = !this.showBox;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opacity-class',
  templateUrl: './opacity-class.component.html',
  styleUrls: ['./opacity-class.component.scss']
})
export class OpacityClassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public showBox = false;
  public toggleBoxC() {
      this.showBox = !this.showBox;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map as MapLeaflet } from 'leaflet';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
    selector: 'app-map-editable',
    templateUrl: './editable.component.html',
    styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit {

    @Input('map') private map: MapLeaflet;
    @Input('drawnItems') public drawnItems: L.FeatureGroup;
    @Input('drawControl') private drawControl: any;

    public showActions = false;
    public addPolygon = null;
    public showBoxForm = false;
    public authorized = false;

    constructor(private as: AuthService) {}

    ngOnInit() {
        this.checkAuth();
    }

    public toggleBoxActions() {
        this.showActions = !this.showActions;
    }

    public closeBoxEdit() {
        this.showBoxForm = false;
    }

    public add() {
        this.addPolygon.enable();
    }

    public enableEditing() {
        if (!this.addPolygon) {
            this.addPolygon = new L.Draw.Polygon(this.map, this.drawControl.options.polygon);
            this.addPolygon.enable();
            this.toggleBoxActions();
        } else {
            if (this.showActions) {
                this.addPolygon.disable();
            } else {
                this.addPolygon.enable();
            }
            this.toggleBoxActions();
        }
    }

    public finish() {
        if (this.addPolygon) {
            this.addPolygon.disable();
        }
        this.toggleBoxActions();
        this.showBoxForm = true;
    }

    public async checkAuth() {
        try {
          const response = await this.as.token(`${window['__env'].appName}:manage:POST`);
          this.authorized = true;
    
        } catch(err) {
          this.authorized = false;
        }
      }
}   
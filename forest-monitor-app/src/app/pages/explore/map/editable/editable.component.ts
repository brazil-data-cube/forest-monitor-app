import { ActivatedRoute } from '@angular/router';
import { MonitorService } from './../monitor.service';
import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map as MapLeaflet } from 'leaflet';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';


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
    public updPolygon = null;
    public showBoxForm = false;
    public authorized = false;
    private token = '';
   

    constructor(private as: AuthService, 
        private monitorService: MonitorService,
        private route: ActivatedRoute) {
       
    }

    ngOnInit() {
        this.checkAuth();
        const id = this.route.snapshot.paramMap.get('id');
        this.monitorService.readById(id, this.token);
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

    public update(){
        let id = Object;
       // this.monitorService.showMessage('Operação executada com sucesso')
       this.monitorService.update(id,this.token)
    }
    

    
    public read(){
        let id  = Object;           
                             
        ///const res = this.monitorService.readById(id,this.token);
       /// return res;
        
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

          if (response) {
            this.token = response.access_token;
          }
    
        } catch(err) {
          this.authorized = false;
          console.log('entrrou aquiiiii');
        }
      }
      
     
}   
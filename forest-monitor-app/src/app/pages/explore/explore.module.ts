import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatSidenavModule,
  MatExpansionModule,
  MatRadioModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatBottomSheetModule,
  MatCheckboxModule,
  MatMenuModule,
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { ExploreComponent } from './explore.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MapComponent } from './map/map.component';
import { SliderComponent } from './map/slider/slider.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from './sidenav/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ResultsPeriodComponent } from './sidenav/results-period/results-period.component';
import { OpacityComponent } from './map/opacity/opacity.component';
import { OpacityBoxComponent } from './map/opacity/box/box.component';
import { EditableComponent } from './map/editable/editable.component';
import { EditBoxFormComponent } from './map/editable/box/box.component';
import { DelFeatureComponent } from './map/del-feature/del-feature.component';
import { StyleBoxComponent } from './map/style-box/style-box.component';


/**
 * Explore Module
 * Module for managing components and service of map pages
 */
@NgModule({
  declarations: [
    ExploreComponent,
    ToolbarComponent,
    MapComponent,
    SidenavComponent,
    SearchComponent,
    OpacityComponent,
    OpacityBoxComponent,
    EditableComponent,
    ResultsPeriodComponent,
    EditBoxFormComponent,
    DelFeatureComponent,
    StyleBoxComponent,
    SliderComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    HttpClientModule,
    MatExpansionModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    Ng5SliderModule,
    MatCheckboxModule,
    NgxPaginationModule,
    ChartsModule,
    DragDropModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ]
})
export class ExploreModule { }

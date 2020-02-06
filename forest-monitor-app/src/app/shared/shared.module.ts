import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

import { LoadingComponent } from './components/loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormFieldErrorComponent } from './components/form-field-input/form-field-error.component';
import { AlertComponent } from './components/alert/alert.component';

/**
 * Shared Module
 * used to export components, services and models common in this application
 */
@NgModule({
  declarations: [
    LoadingComponent,
    FormFieldErrorComponent,
    AlertComponent,
  ],
  exports: [
    AlertComponent,
    FormFieldErrorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }

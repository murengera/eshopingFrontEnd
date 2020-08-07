import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
 MatButtonModule
} from '@angular/material/button';
import{MatMenuModule}from '@angular/material/menu';
import{MatToolbarModule}from '@angular/material/toolbar';
import{MatListModule}from '@angular/material/list';
import{ MatFormFieldModule}from '@angular/material/form-field';
import {MatInputModule}from '@angular/material/input';
import{MatIconModule}from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import{MatDialogModule}from '@angular/material/dialog';
import{MatSidenavModule}from '@angular/material/sidenav';
import{MatProgressBarModule} from '@angular/material/progress-bar';
import{MatBadgeModule}from '@angular/material/badge';
import {MatGridListModule}from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import{MatSelectModule}from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





const Material=[
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatDialogModule,
  MatProgressBarModule,
  MatBadgeModule,
  MatGridListModule,
  MatDialogModule

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material
  ],
  exports:[Material]
})

export class MaterialModule { }

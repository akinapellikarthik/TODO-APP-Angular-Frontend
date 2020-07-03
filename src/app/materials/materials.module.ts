import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



const materials = [
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatSortModule,
  MatPaginatorModule
];



@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialsModule { }

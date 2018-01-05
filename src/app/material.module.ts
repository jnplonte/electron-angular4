import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            MatTabsModule,
            MatSelectModule,
            MatDatepickerModule, MatNativeDateModule],
  exports: [MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            MatTabsModule,
            MatSelectModule,
            MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule { }

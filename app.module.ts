import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; 


import { MatPseudoCheckboxModule } from '@angular/material/core';


import { AppComponent } from './app.component';
import { IndianNumberFormatPipe } from './indian-number-format.pipe';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    IndianNumberFormatPipe,
    EmployeeDetailsComponent,
    EditDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatTooltipModule,
  
    MatPseudoCheckboxModule,
       AppRoutingModule,
       RouterModule,
       MatButtonModule,
       MatIconModule,
       BrowserAnimationsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

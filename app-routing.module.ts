import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: AppComponent },
  { path: 'details/:employeeid', component: EmployeeDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forRoot(routes),
  ]
  
})
export class AppRoutingModule { }

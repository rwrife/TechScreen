import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmployeeList } from './employee.component';
import { EmployeeService } from 'src/services/employee.service';

@NgModule({
  declarations: [
    EmployeeList
  ],
  imports: [
    BrowserModule
  ],
  providers: [EmployeeService],
  bootstrap: [EmployeeList]
})
export class AppModule { }

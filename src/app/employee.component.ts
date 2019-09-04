import { Component } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Employee } from 'src/models/employee';
import { BetterEmployee } from 'src/models/betterEmployee';

@Component({
  selector: 'employee-list',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeList {
  title = 'Employee List';
  employees: BetterEmployee[];

  constructor(
    private employeeService: EmployeeService
  ){
    
  }

  async ngOnInit() {
    this.employees = await this.fetchEmployees();
  }

  public async deleteEmployee(emp: Employee) {
    await this.employeeService.DeleteEmployee(emp.employeeNo);
    this.employees = await this.fetchEmployees();
  }

  private async fetchEmployees(): Promise<BetterEmployee[]> {
    let serverEmployees = [...await this.employeeService.GetEmployees()];
    let betterEmployees = serverEmployees.map(e => {
      let be = {...e} as BetterEmployee;
      let nameParts: string[] = [];
      if(be.fullName.indexOf(',') > 0) {
        nameParts = be.fullName.split(',');
      } else {
        nameParts = be.fullName.split(' ');
      }
      be.firstName = nameParts[0].trim();
      be.lastName = nameParts[0].trim();

      if(be.hireYear < 20) {
        be.hireYear += 2000;
      } else if(be.hireYear < 100) {
        be.hireYear += 1900;
      }
      be.yearsOfService = (new Date()).getFullYear() - be.hireYear;

      return be;
    });
    return betterEmployees.sort((a,b) => {
      return (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0);
    });
  }

  public VacationEligible(emp: BetterEmployee) {
    return emp.yearsOfService >= 20;
  }
}

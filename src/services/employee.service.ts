import { Injectable } from "@angular/core";
import { Employee } from 'src/models/employee';

@Injectable()
export class EmployeeService {
    private employees: Employee[] = [
        { 
            employeeNo: 234,
            hireYear: 2010,
            fullName: 'Rife, Ryan'
        },
        {
            employeeNo: 28829,
            hireYear: 5,
            fullName: 'Linnea Nelson'
        },
        {
            employeeNo: 18,
            hireYear: 95,
            fullName: 'Whatley, Joshua'
        },
        {
            employeeNo: 999,
            hireYear: 1999,
            fullName: 'Jorge Lara-Garduno'
        }
    ];

    public async GetEmployees(): Promise<Employee[]>  {
        return this.employees;
    }

    public async DeleteEmployee(employeeNo: number): Promise<boolean> {
        this.employees = this.employees.filter(e => e.employeeNo !== employeeNo);
        return true;
    }
}
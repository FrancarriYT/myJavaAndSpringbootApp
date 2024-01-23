import { search } from "ionicons/icons";
import Employee from "./Employee";

export function searchEmployees() {
    if (!localStorage['employees']) {
      localStorage['employees'] = '[]';
    }
  
    let employees = localStorage['employees'];
    return JSON.parse(employees);
  }


export function removeEmployee(id:string){
    let employees = searchEmployees();
    let index = employees.findIndex((employee:Employee) => employee.id == id);
    employees.splice(index, 1);
    localStorage['employees'] = JSON.stringify(employees);    
}

export function saveEmployee(employee: Employee) {
    let employees = searchEmployees();
    if (employee.id) {
      // Editar cliente existente
      let index = employees.findIndex((c: Employee) => c.id === employee.id);
      if (index !== -1) {
        employees[index] = employee;
      } else {
        console.error("Cliente no encontrado para editar.");
      }
    } else {
      // Nuevo cliente
      employee.id = String(Math.round(Math.random() * 1000)); // Otra opción: employee.id = (Math.round(Math.random() * 1000)).toString();
      employees.push(employee);
    }
  
    localStorage['employees'] = JSON.stringify(employees);
  }
  
export function searchEmployeeById(id : string){

    let employees = searchEmployees();
    return employees.find((employee:Employee) => employee.id == id)
}
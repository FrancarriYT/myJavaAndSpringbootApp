import { search } from "ionicons/icons";
import Customer from "./Customer";

export function searchCustomers() {
    if (!localStorage['customers']) {
      localStorage['customers'] = '[]';
    }
  
    let customers = localStorage['customers'];
    return JSON.parse(customers);
  }


export function removeCustomer(id:string){
    let customers = searchCustomers();
    let index = customers.findIndex((customer:Customer) => customer.id == id);
    customers.splice(index, 1);
    localStorage['customers'] = JSON.stringify(customers);    
}

export function saveCustomer(customer: Customer) {
    let customers = searchCustomers();
    if (customer.id) {
      // Editar cliente existente
      let index = customers.findIndex((c: Customer) => c.id === customer.id);
      if (index !== -1) {
        customers[index] = customer;
      } else {
        console.error("Cliente no encontrado para editar.");
      }
    } else {
      // Nuevo cliente
      customer.id = String(Math.round(Math.random() * 1000)); // Otra opción: customer.id = (Math.round(Math.random() * 1000)).toString();
      customers.push(customer);
    }
  
    localStorage['customers'] = JSON.stringify(customers);
  }
  
export function searchCustomerById(id : string){

    let customers = searchCustomers();
    return customers.find((customer:Customer) => customer.id == id)
}
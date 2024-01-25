import { search } from "ionicons/icons";
import Customer from "./Customer";

export async function searchCustomers() {
  let url = process.env.REACT_APP_API || 'http://localhost:8080/api/customer/get/all';
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}



export async function removeCustomer(id:string){
    let customers = await searchCustomers();
    let index = customers.findIndex((customer:Customer) => customer.id == id);
    customers.splice(index, 1);
    localStorage['customers'] = JSON.stringify(customers);    
}

export async function saveCustomer(customer: Customer) {
    let customers = await searchCustomers();
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
  
export async function searchCustomerById(id : string){

    let customers = await searchCustomers();
    return customers.find((customer:Customer) => customer.id == id)
}
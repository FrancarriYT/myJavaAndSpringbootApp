import { search } from "ionicons/icons";

export function searchCustomers() {
    if (!localStorage['customers']) {
      localStorage['customers'] = '[]';
    }
  
    let customers = localStorage['customers'];
    return JSON.parse(customers);
  }
  
    // const datosDeEjemplo = [
    //     {
    //         id: '1',
    //         firstname: 'Francisco',
    //         lastname: 'Carrizo',
    //         email: 'francarri1pro@Gmail.com',
    //         phone: '+54 261 3376001',
    //         address: 'Avenida Boulogne Sur Mer 2117'
    //     },
    //     {
    //         id: '2',
    //         firstname: 'Pepito',
    //         lastname: 'Marcianito',
    //         email: 'pepitomail@Gmail.com',
    //         phone: '5254124',
    //         address: 'Debajo del puente'
    //     }
    // ];

export function removeCustomer(id:string){
    let customers = searchCustomers();
    let index = customers.findIndex((customer:any) => customer.id == id);
    customers.splice(index, 1);
    localStorage['customers'] = JSON.stringify(customers);    
}

export function saveCustomer(customer: any) {
    let customers = searchCustomers();
    if (customer.id) {
      // Editar cliente existente
      let index = customers.findIndex((c: any) => c.id === customer.id);
      if (index !== -1) {
        customers[index] = customer;
      } else {
        console.error("Cliente no encontrado para editar.");
      }
    } else {
      // Nuevo cliente
      customer.id = Math.round(Math.random() * 1000);
      customers.push(customer);
    }
  
    localStorage['customers'] = JSON.stringify(customers);
  }
  
export function searchCustomerById(id : string){

    let customers = searchCustomers();
    return customers.find((customer:any) => customer.id == id)
}
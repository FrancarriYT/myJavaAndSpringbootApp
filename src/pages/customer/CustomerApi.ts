import Customer from "./Customer";

const API_BASE_URL = process.env.REACT_APP_API || 'http://localhost:8080/api/';

export async function searchCustomers() {
  let url = `${API_BASE_URL}customer/get/all`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export async function removeCustomer(id: string) {
  let url = `${API_BASE_URL}customer/delete/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function saveCustomer(customer: Customer) {
  let url = `${API_BASE_URL}customer/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function searchCustomerById(id: string) {
  let url = `${API_BASE_URL}customer/getById/${id}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

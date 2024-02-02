import Supplier from "./Supplier";

const API_BASE_URL = process.env.REACT_APP_API || 'http://35.199.79.183/api/';

export async function searchSuppliers() {
  let url = `${API_BASE_URL}supplier/get/all`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export async function removeSupplier(id: string) {
  let url = `${API_BASE_URL}supplier/delete/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function saveSupplier(supplier: Supplier) {
  let url = `${API_BASE_URL}supplier/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(supplier),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function searchSupplierById(id: string) {
  let url = `${API_BASE_URL}supplier/getById/${id}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

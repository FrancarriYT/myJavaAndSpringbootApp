import Employee from "./Employee";

const API_BASE_URL = process.env.REACT_APP_API || 'http://localhost:8080/api/';

export async function searchEmployees() {
  let url = `${API_BASE_URL}employee/get/all`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export async function removeEmployee(id: string) {
  let url = `${API_BASE_URL}employee/delete/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function saveEmployee(employee: Employee) {
  let url = `${API_BASE_URL}employee/create`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(employee),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function searchEmployeeById(id: string) {
  let url = `${API_BASE_URL}employee/getById/${id}`;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

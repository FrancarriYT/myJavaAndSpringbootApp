import { search } from "ionicons/icons";
import Supplier from "./Supplier";

export function searchSuppliers() {
  if (!localStorage['suppliers']) {
    localStorage['suppliers'] = '[]';
  }

  let suppliers = localStorage['suppliers'];
  return JSON.parse(suppliers);
}

export function removeSupplier(id: string) {
  let suppliers = searchSuppliers();
  let index = suppliers.findIndex((supplier: Supplier) => supplier.id === id);
  suppliers.splice(index, 1);
  localStorage['suppliers'] = JSON.stringify(suppliers);
}

export function saveSupplier(supplier: Supplier) {
  let suppliers = searchSuppliers();
  if (supplier.id) {
    // Editar proveedor existente
    let index = suppliers.findIndex((s: Supplier) => s.id === supplier.id);
    if (index !== -1) {
      suppliers[index] = supplier;
    } else {
      console.error("Proveedor no encontrado para editar.");
    }
  } else {
    // Nuevo proveedor
    supplier.id = String(Math.round(Math.random() * 1000));
    suppliers.push(supplier);
  }

  localStorage['suppliers'] = JSON.stringify(suppliers);
}

export function searchSupplierById(id: string) {
  let suppliers = searchSuppliers();
  return suppliers.find((supplier: Supplier) => supplier.id === id);
}

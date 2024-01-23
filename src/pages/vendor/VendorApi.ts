import { search } from "ionicons/icons";
import Vendor from "./Vendor";

export function searchVendors() {
    if (!localStorage['Vendors']) {
      localStorage['Vendors'] = '[]';
    }
  
    let Vendors = localStorage['Vendors'];
    return JSON.parse(Vendors);
  }


export function removeVendor(id:string){
    let Vendors = searchVendors();
    let index = Vendors.findIndex((Vendor:Vendor) => Vendor.id == id);
    Vendors.splice(index, 1);
    localStorage['Vendors'] = JSON.stringify(Vendors);    
}

export function saveVendor(Vendor: Vendor) {
    let Vendors = searchVendors();
    if (Vendor.id) {
      // Editar cliente existente
      let index = Vendors.findIndex((c: Vendor) => c.id === Vendor.id);
      if (index !== -1) {
        Vendors[index] = Vendor;
      } else {
        console.error("Cliente no encontrado para editar.");
      }
    } else {
      // Nuevo cliente
      Vendor.id = String(Math.round(Math.random() * 1000)); // Otra opción: Vendor.id = (Math.round(Math.random() * 1000)).toString();
      Vendors.push(Vendor);
    }
  
    localStorage['Vendors'] = JSON.stringify(Vendors);
  }
  
export function searchVendorById(id : string){

    let Vendors = searchVendors();
    return Vendors.find((Vendor:Vendor) => Vendor.id == id)
}
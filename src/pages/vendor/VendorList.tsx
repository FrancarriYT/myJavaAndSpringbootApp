import React, { useEffect, useState } from 'react';
import {
    IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil } from 'ionicons/icons';
import { removeVendor, searchVendors } from './VendorApi';
import Vendor from './Vendor';

const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [ vendors, setVendors] = useState<Vendor[]> ([]);
  const history = useHistory();
  useEffect(() => {
    search();
    }, [history.location.pathname]);

  const remove = (id:string) => {
      removeVendor(id);
      search();
  }
  const search = () =>{
      let result = searchVendors();
      setVendors(result);
  }

  const addVendor = () => {
    history.push('/page/vendor/new')
  }
  const editVendor = (id:string) => {
    history.push('/page/vendor/' + id)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Elementos de título de la tabla */}
        <IonGrid className='table'>
        <IonCard className='table-card'>
            <IonTitle>Gestión de proveedores</IonTitle>
            <IonItem>
                <IonButton onClick = {addVendor}color = "primary" fill='solid' slot='end' size='default'>
                <IonIcon icon={add}/>
                    Agregar proveedor
                </IonButton>
            </IonItem>


        <IonRow className='table-header'>
            <IonCol>Nombre</IonCol>
            <IonCol>Email</IonCol>
            <IonCol>Teléfono</IonCol>
            <IonCol>Dirección</IonCol>
            <IonCol>Acciones</IonCol>
        </IonRow>

        {vendors.map((vendor: Vendor) =>
            <IonRow>
                <IonCol>{vendor.firstname} {vendor.lastname}</IonCol>
                <IonCol>{vendor.email}</IonCol>
                <IonCol>{vendor.phone}</IonCol>
                <IonCol>{vendor.address}</IonCol>
                <IonCol>
                    <IonButton color= 'primary' fill='clear' onClick={() => editVendor(String(vendor.id))}>
                        <IonIcon icon={pencil} slot='icon-only'/>
                    </IonButton>

                    <IonButton color= 'danger' fill='clear' onClick={() => remove(String(vendor.id))}>
                        <IonIcon icon={close} slot='icon-only'/>
                    </IonButton>
                </IonCol>
            </IonRow>
            )}

        </IonCard>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default VendorList;

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
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, checkmark, close, pencil } from 'ionicons/icons';
import { removeVendor, saveVendor, searchVendorById, searchVendors } from './VendorApi';
import Vendor from './Vendor';

const VendorEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id : string }>();


  const [ vendor, setVendor] = useState<Vendor> ({});
  const history = useHistory();
  useEffect(() => {
    search();
    }, []);


    const search = () => {
        if (id !== 'new') {
          let result = searchVendorById(id);
          if (result) {
            setVendor(result);
          }
        }
      };
      

  const save = ()  => {

    saveVendor(vendor);
    history.push('/page/vendors');
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
            <IonTitle>{id === 'new' ? 'Agregar proveedor' : 'Editar proveedor'}</IonTitle>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Nombre" labelPlacement="stacked" placeholder="Insertar nombre. ej: Joe" 
                        value={vendor.firstname} onIonChange={e => vendor.firstname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Apellido" labelPlacement="stacked" placeholder="Insertar apellido. ej: Doe" 
                        value = {vendor.lastname} onIonChange={e => vendor.lastname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Correo Electrónico" labelPlacement="stacked" placeholder="Insertar correo electrónico. ej: pep12@gmail.com" 
                        value={vendor.email} onIonChange={e => vendor.email = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Teléfono" labelPlacement="stacked" placeholder="Insertar teléfono. ej: 07700900461 "
                        value={vendor.phone} onIonChange={e => vendor.phone = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Dirección" labelPlacement="stacked" placeholder="Insertar dirección. ej: Avenida Puentes 2341" 
                        value={vendor.address} onIonChange={e => vendor.address = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>


            

            <IonItem>
                <IonButton onClick= {save} color = "success" fill='solid' slot='end' size='default'>
                <IonIcon icon={checkmark}/>
                    Guardar
                </IonButton>
            </IonItem>


        </IonCard>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default VendorEdit;

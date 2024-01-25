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
import { removeCustomer, saveCustomer, searchCustomerById, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id : string }>();


  const [ customer, setCustomer] = useState<Customer> ({});
  const history = useHistory();
  useEffect(() => {
    search();
    }, []);


    const search = async () => {
        if (id !== 'new') {
          let result = await searchCustomerById(id);
          if (result) {
            setCustomer( result);
          }
        }
      };
      

  const save = ()  => {

    saveCustomer(customer);
    history.push('/page/customers');
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
            <IonTitle>{id === 'new' ? 'Agregar cliente' : 'Editar cliente'}</IonTitle>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Nombre" labelPlacement="stacked" placeholder="Insertar nombre. ej: Joe" 
                        value={customer.firstname} onIonChange={e => customer.firstname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Apellido" labelPlacement="stacked" placeholder="Insertar apellido. ej: Doe" 
                        value = {customer.lastname} onIonChange={e => customer.lastname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Correo Electrónico" labelPlacement="stacked" placeholder="Insertar correo electrónico. ej: pep12@gmail.com" 
                        value={customer.email} onIonChange={e => customer.email = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Teléfono" labelPlacement="stacked" placeholder="Insertar teléfono. ej: 07700900461 "
                        value={customer.phone} onIonChange={e => customer.phone = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Dirección" labelPlacement="stacked" placeholder="Insertar dirección. ej: Avenida Puentes 2341" 
                        value={customer.address} onIonChange={e => customer.address = String(e.detail.value)}></IonInput>
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

export default CustomerEdit;

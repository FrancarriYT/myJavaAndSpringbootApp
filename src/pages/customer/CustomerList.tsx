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
import { removeCustomer, searchCustomers } from './CustomerApi';
import Customer from './Customer';
import { truncateText } from '../../components/functions';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [ customers, setCustomers] = useState<Customer[]> ([]);
  const history = useHistory();
  useEffect(() => {
    search();
    }, [history.location.pathname]);

  const remove = async (id:string) => {
      await removeCustomer(id);
      search();
  }
  const search = async () =>{
      let result = await searchCustomers();
      setCustomers( result);
  }

  const addCustomer = () => {
    history.push('/page/customer/new')
  }
  const editCustomer = (id: string) => {
    history.push('/page/customer/' + id);
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
            <IonTitle>Gestión de clientes</IonTitle>
            <IonItem>
                <IonButton onClick = {addCustomer}color = "primary" fill='solid' slot='end' size='default'>
                <IonIcon icon={add}/>
                    Agregar Cliente
                </IonButton>
            </IonItem>


        <IonRow className='table-header'>
            <IonCol>Nombre</IonCol>
            <IonCol>Email</IonCol>
            <IonCol>Teléfono</IonCol>
            <IonCol>Dirección</IonCol>
            <IonCol>Acciones</IonCol>
        </IonRow>

        {customers.map((customer: Customer) =>
            <IonRow>
              <IonCol>{truncateText(customer.firstname)} {truncateText(customer.lastname)}</IonCol>
              <IonCol>{truncateText(customer.email)}</IonCol>
              <IonCol>{truncateText(customer.phone)}</IonCol>
              <IonCol>{truncateText(customer.address)}</IonCol>
                <IonCol>
                    <IonButton color= 'primary' fill='clear' onClick={() => editCustomer(String(customer.id))}>
                        <IonIcon icon={pencil} slot='icon-only'/>
                    </IonButton>

                    <IonButton color= 'danger' fill='clear' onClick={() => remove(String(customer.id))}>
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

export default CustomerList;

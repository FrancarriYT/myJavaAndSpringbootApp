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
import { removeSupplier, searchSuppliers } from './SupplierApi';
import Supplier from './Supplier';
import { truncateText } from '../../components/functions';

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [ suppliers, setSuppliers] = useState<Supplier[]> ([]);
  const history = useHistory();
  useEffect(() => {
    search();
    }, [history.location.pathname]);

  const remove = async (id:string) => {
      await removeSupplier(id);
      search();
  }
  const search = async () =>{
      let result = await searchSuppliers();
      setSuppliers(result);
  }

  const addSupplier = () => {
    history.push('/page/supplier/new')
  }
  const editSupplier = (id:string) => {
    history.push('/page/supplier/' + id)
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
                <IonButton onClick = {addSupplier}color = "primary" fill='solid' slot='end' size='default'>
                <IonIcon icon={add}/>
                    Agregar proveedor
                </IonButton>
            </IonItem>


        <IonRow className='table-header'>
            <IonCol>Nombre</IonCol>
            <IonCol>Email</IonCol>
            <IonCol>Teléfono</IonCol>
            <IonCol>Web</IonCol>
            <IonCol>Acciones</IonCol>
        </IonRow>

        {suppliers.map((supplier: Supplier) =>
            <IonRow>
              <IonCol>{truncateText(supplier.name)}</IonCol>
              <IonCol>{truncateText(supplier.email)}</IonCol>
              <IonCol>{truncateText(supplier.phone)}</IonCol>
              <IonCol>{truncateText(supplier.web)}</IonCol>
                <IonCol>
                    <IonButton color= 'primary' fill='clear' onClick={() => editSupplier(String(supplier.id))}>
                        <IonIcon icon={pencil} slot='icon-only'/>
                    </IonButton>

                    <IonButton color= 'danger' fill='clear' onClick={() => remove(String(supplier.id))}>
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

export default SupplierList;

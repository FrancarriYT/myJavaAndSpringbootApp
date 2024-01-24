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
import { removeSupplier, saveSupplier, searchSupplierById, searchSuppliers } from './SupplierApi';
import Supplier from './Supplier';

const SupplierEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id : string }>();


  const [ supplier, setSupplier] = useState<Supplier> ({});
  const history = useHistory();
  useEffect(() => {
    search();
    }, []);


    const search = () => {
        if (id !== 'new') {
          let result = searchSupplierById(id);
          if (result) {
            setSupplier(result);
          }
        }
      };
      

  const save = ()  => {

    saveSupplier(supplier);
    history.push('/page/suppliers');
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
                        <IonInput label="Nombre" labelPlacement="stacked" placeholder="Insertar nombre. ej: Amazon" 
                        value={supplier.name} onIonChange={e => supplier.name = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Contacto" labelPlacement="stacked" placeholder="Insertar contacto. ej: Manuél Sanchez" 
                        value = {supplier.contact} onIonChange={e => supplier.contact = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Correo Electrónico" labelPlacement="stacked" placeholder="Insertar correo electrónico. ej: pep12@gmail.com" 
                        value={supplier.email} onIonChange={e => supplier.email = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Teléfono" labelPlacement="stacked" placeholder="Insertar teléfono. ej: 07700900461 "
                        value={supplier.phone} onIonChange={e => supplier.phone = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Dirección" labelPlacement="stacked" placeholder="Insertar dirección. ej: Avenida Puentes 2341" 
                        value={supplier.address} onIonChange={e => supplier.address = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
          
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Website" labelPlacement="stacked" placeholder="Insertar sitio web. ej: Amazon.com" 
                        value={supplier.web} onIonChange={e => supplier.web = String(e.detail.value)}></IonInput>
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

export default SupplierEdit;

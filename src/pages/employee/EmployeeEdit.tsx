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
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { add, checkmark, close, pencil } from 'ionicons/icons';
import { removeEmployee, saveEmployee, searchEmployeeById, searchEmployees } from './EmployeeApi';
import Employee from './Employee';
import { Toaster, toast } from 'sonner';

const EmployeeEdit: React.FC = () => {
  const { name} = useParams<{ name: string;}>();
  const routeMatch : any = useRouteMatch("/page/employee/:id")
  const [ employee, setEmployee] = useState<Employee> ({});
  const history = useHistory();
  const id = routeMatch?.params?.id;
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== 'new') {
      let result = await searchEmployeeById(id);
      if (result) {
        setEmployee(result);
      }
    }
  };


  const save = async () => {
    try {
      // Simula la operación de guardado
      await saveEmployee(employee);

      toast.success('Empleado guardado correctamente', { className: 'sonner-toast-success' });
      history.push('/page/employees');
    } catch (error) {
      toast.error(`No se pudo crear al empleado: ${error}`, { className: 'sonner-toast-error' });
    }
  };
  
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
            <IonTitle>{id === 'new' ? 'Agregar empleado' : 'Editar empleado'}</IonTitle>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Nombre" labelPlacement="stacked" placeholder="Insertar nombre. ej: Joe" 
                        value={employee.firstname} onIonChange={e => employee.firstname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Apellido" labelPlacement="stacked" placeholder="Insertar apellido. ej: Doe" 
                        value = {employee.lastname} onIonChange={e => employee.lastname = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Correo Electrónico" labelPlacement="stacked" placeholder="Insertar correo electrónico. ej: pep12@gmail.com" 
                        value={employee.email} onIonChange={e => employee.email = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>

                <IonCol>
                    <IonItem>
                        <IonInput label="Teléfono" labelPlacement="stacked" placeholder="Insertar teléfono. ej: 07700900461 "
                        value={employee.phone} onIonChange={e => employee.phone = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Dirección" labelPlacement="stacked" placeholder="Insertar dirección. ej: Avenida Puentes 2341" 
                        value={employee.address} onIonChange={e => employee.address = String(e.detail.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonInput label="Salario" labelPlacement="stacked" placeholder="Insertar un salario. ej: 55.000" 
                        value={employee.salary} onIonChange={e => employee.salary = Number(e.detail.value)}></IonInput>
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
      <Toaster richColors expand={true}/> {/* Agregar Toaster al final del componente */}
    </IonPage>
  );
};

export default EmployeeEdit;

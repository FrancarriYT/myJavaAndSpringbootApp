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
import { removeEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [ employees, setEmployees] = useState<Employee[]> ([]);
  const history = useHistory();
  useEffect(() => {
    search();
    }, [history.location.pathname]);

  const remove = (id:string) => {
      removeEmployee(id);
      search();
  }
  const search = () =>{
      let result = searchEmployees();
      setEmployees(result);
  }

  const addEmployee = () => {
    history.push('/page/employee/new')
  }
  const editEmployee = (id:string) => {
    history.push('/page/employee/' + id)
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
            <IonTitle>Gestión de empleados</IonTitle>
            <IonItem>
                <IonButton onClick = {addEmployee}color = "primary" fill='solid' slot='end' size='default'>
                <IonIcon icon={add}/>
                    Agregar Empleado
                </IonButton>
            </IonItem>


        <IonRow className='table-header'>
            <IonCol>Nombre</IonCol>
            <IonCol>Email</IonCol>
            <IonCol>Teléfono</IonCol>
            <IonCol>Dirección</IonCol>
            <IonCol>Acciones</IonCol>
        </IonRow>

        {employees.map((employee: Employee) =>
            <IonRow>
                <IonCol>{employee.firstname} {employee.lastname}</IonCol>
                <IonCol>{employee.email}</IonCol>
                <IonCol>{employee.phone}</IonCol>
                <IonCol>{employee.address}</IonCol>
                <IonCol>
                    <IonButton color= 'primary' fill='clear' onClick={() => editEmployee(String(employee.id))}>
                        <IonIcon icon={pencil} slot='icon-only'/>
                    </IonButton>

                    <IonButton color= 'danger' fill='clear' onClick={() => remove(String(employee.id))}>
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

export default EmployeeList;

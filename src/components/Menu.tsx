import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonToggle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, people, peopleOutline, briefcaseOutline, briefcase, bagHandleOutline, bagHandle, moonOutline, sunnyOutline } from 'ionicons/icons';
import './Menu.css';
import imgLogo from '../images/CoreFlexLogo.png';
interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
}

const appPages: AppPage[] = [
  {
    title: 'Clientes',
    url: '/page/customers',
    iosIcon: peopleOutline,
    mdIcon: people
  },
  {
    title: 'Empleados',
    url: '/page/employees',
    iosIcon: briefcaseOutline,
    mdIcon: briefcase
  },
  {
    title: 'Proveedores',
    url: '/page/suppliers',
    iosIcon: bagHandleOutline,
    mdIcon: bagHandle
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg src={imgLogo}/>
          </IonListHeader>

          <IonItem lines="none" className="dark-mode-toggle" onClick={toggleDarkMode}>
            <IonLabel>Modo oscuro</IonLabel>
            <IonToggle
              slot="end"
              checked={darkMode}
              onIonChange={toggleDarkMode}
            />
            <IonIcon
              slot="end"
              icon={darkMode ? sunnyOutline : moonOutline}
              className={`mode-icon ${darkMode ? 'dark' : 'light'}`}
            />
          </IonItem>

          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={`${location.pathname === appPage.url ? 'selected' : ''} menu-item`}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
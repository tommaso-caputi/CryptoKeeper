import { IonApp, IonRouterOutlet, setupIonicReact, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';


setupIonicReact();

const Menu: React.FC = props => {
    const location = useLocation<{ address: string }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{location.state.address}</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
};

export default Menu;

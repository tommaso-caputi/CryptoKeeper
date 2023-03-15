import {
  setupIonicReact,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

setupIonicReact();

const Menu: React.FC = (props) => {
  const location = useLocation<{ email: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Email: {location.state.email}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Menu;
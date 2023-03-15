import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

setupIonicReact();

const Menu: React.FC = (props) => {
  const location = useLocation<{ email: string }>();
  const [balance, setBalance] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("");

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
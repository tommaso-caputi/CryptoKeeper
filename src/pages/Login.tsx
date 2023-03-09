import { IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonContent, } from '@ionic/react';
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

const Login: React.FC = () => {

  const connect = () => {
    history.push('/menu', { mnemonic: "travel upgrade inside soda birth essence junk merit never twenty system opinion" });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
      {/* <IonButton onClick={connect}>Import wallet with mnemonic</IonButton> */}
    </IonPage>
  );
};

export default Login;

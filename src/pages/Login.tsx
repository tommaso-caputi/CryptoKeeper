import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import { createBrowserHistory } from "history";
import MetaMaskSDK from '@metamask/sdk';
import { useState } from 'react';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();
const history = createBrowserHistory({ forceRefresh: true });

const Login: React.FC = () => {

  const connect = async () => {
    const result = await ethereum.request({ method: "eth_requestAccounts" });
    history.push('/menu', { address: result[0] });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonButton onClick={connect}>Connect to metamask</IonButton>
    </IonPage>
  );
};

export default Login;

import {
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useState } from "react";
import { loginEmailPassword } from "../data/registerloginFunctions";

const history = createBrowserHistory({ forceRefresh: true });

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [presentAlert] = useIonAlert();

  const login = () => {
    loginEmailPassword(email, password)
      .then((val) => {
        let message = new String(val).split('.');
        presentAlert({
          header: message[0],
          message: message[1],
          buttons: ["OK"],
        })
        if (message[0] === "Success") {
          history.push("/mainMenu", { email: email });
        }
      });
  }

  return (
    <IonPage>
      <div
        style={{
          padding: "20px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <div style={{ height: "8%" }}></div>
        <div>
          <h1 style={{ fontSize: 40 }}>
            Accedere<br></br>per continuare
          </h1>
        </div>
        <div style={{ paddingTop: "40px" }}>
          <IonLabel position="stacked">Indirizzo Email</IonLabel>
          <IonInput
            onIonInput={(e: any) => setEmail(e.target.value)}
            placeholder="Inserire email"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            onIonInput={(e: any) => setPassword(e.target.value)}
            placeholder="Inserire password"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <IonButton onClick={login} size="large" expand="block">
            Accesso
          </IonButton>
        </div>
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <IonLabel>o</IonLabel>
        </div>
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <IonButton
            size="default"
            expand="block"
            onClick={() => {
              history.push("/register");
            }}
          >
            Registrazione
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;

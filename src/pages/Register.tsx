import {
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useCallback, useState } from "react";
import { checks, registration } from "../data/registerloginFunctions";

const history = createBrowserHistory({ forceRefresh: true });

const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [presentAlert] = useIonAlert();

  function fullRegistration(email: string, password: string, confirmpassword: string) {
    checks(email, password, confirmpassword)
      .then((val) => {
        let message = new String(val).split('.');
        if (message[0] === "Success") {
          registration(email, password)
            .then((val2) => {
              let message2 = new String(val2).split('.');
              presentAlert({
                header: message2[0],
                message: message2[1],
                buttons: ["OK"],
              })
              if (message2[0] === "Success") {
                history.push("/remember", {
                  private_key: message2[2],
                  public_key: message2[3],
                  address: message2[4],
                  wif: message2[5],
                  email: email,
                });
              }
            })
        } else {
          presentAlert({
            header: message[0],
            message: message[1],
            buttons: ["OK"],
          })
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
            Inscriversi<br></br>per continuare
          </h1>
        </div>
        <div style={{ paddingTop: "40px" }}>
          <IonLabel position="stacked">Indirizzo Email</IonLabel>
          <IonInput
            onIonInput={(e: any) => setEmail(e.target.value)}
            placeholder="Inserire email"
            type="email"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            onIonInput={(e: any) => setPassword(e.target.value)}
            placeholder="Inserire password"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <IonLabel position="stacked">Conferma Password</IonLabel>
          <IonInput
            onIonInput={(e: any) => setConfirmPassword(e.target.value)}
            placeholder="Inserire password"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <IonButton onClick={() => { fullRegistration(email, password, confirmpassword) }} size="large" expand="block">
            Registrazione
          </IonButton>
        </div>
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <IonLabel>o</IonLabel>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <IonButton onClick={() => { history.push('/import') }} expand="block">
            Importare portafoglio
          </IonButton>
        </div>
        <div style={{ paddingTop: "0px", textAlign: "center" }}>
          <IonButton
            size="default"
            expand="block"
            onClick={() => {
              history.push("/login");
            }}
          >
            Accesso
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Register;

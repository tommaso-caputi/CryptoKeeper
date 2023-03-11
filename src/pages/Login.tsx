import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useState } from "react";

const history = createBrowserHistory({ forceRefresh: true });

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [presentAlert] = useIonAlert();

  const login = () => {
    //history.push('/menu', { mnemonic: "travel upgrade inside soda birth essence junk merit never twenty system opinion" });

    fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        email: email,
        password: password,
      }),
    }).then((response) => {
      response.text().then((response) => {
        let a = response.split(".");
        if (a[1] === "True") {
          presentAlert({
            header: "Success",
            message: "Logged successfully",
            buttons: ["OK"],
          });
          history.push("/Menu", { email: email, mnemonic: a[0] });
        } else {
          presentAlert({
            header: "Failed",
            message: "Email or password are incorrect",
            buttons: ["OK"],
          });
        }
      });
    });
  };

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
            Log in<br></br>to continue
          </h1>
        </div>
        <div style={{ paddingTop: "40px" }}>
          <IonLabel position="stacked">Email Address</IonLabel>
          <IonInput
            onIonInput={(e: any) => setEmail(e.target.value)}
            clearOnEdit={true}
            placeholder="Enter email"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            onIonInput={(e: any) => setPassword(e.target.value)}
            clearOnEdit={true}
            placeholder="Enter password"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <IonButton onClick={login} size="large" expand="block">
            Log In
          </IonButton>
        </div>
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <IonLabel>or</IonLabel>
        </div>
        <div style={{ paddingTop: "20px", textAlign: "center" }}>
          <IonButton
            size="default"
            expand="block"
            onClick={() => {
              history.push("/register");
            }}
          >
            Sign Up
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;

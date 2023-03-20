import {
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useState } from "react";
import sha256 from "fast-sha256";

const history = createBrowserHistory({ forceRefresh: true });

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [presentAlert] = useIonAlert();

  const login = () => {
    const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        email: email,
        password: passwordHash,
      }),
    }).then((response) => {
      response.text().then((response) => {
        let data = response.split(".");
        console.log(data)
        if (data[2] === "True") {
          if (data[1] === "1") {
            presentAlert({
              header: "Success",
              message: "Logged successfully"
            });
            history.push("/Menu", { email: email });
          } else {
            presentAlert({
              header: "Failed",
              message: "Email is not confirmed",
              buttons: ["OK"],
            });
          }
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

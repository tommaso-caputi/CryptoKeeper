import {
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useState } from "react";

const history = createBrowserHistory({ forceRefresh: true });

const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [presentAlert] = useIonAlert();

  const registration = async () => {
    if (checkPassword() && checkEmail()) {
      fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
        method: "POST",
        body: JSON.stringify({
          action: "checkUserEmail",
          email: email,
        }),
      }).then((response) => {
        response.text().then((response) => {
          if (response !== "True") {
            register();
          } else {
            presentAlert({
              header: "Failed",
              message: "This email has already an account",
              buttons: ["OK"],
            });
          }
        });
      });
    }
  };

  const register = () => {
    let mnemonic = createMnemonic();
    fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
      method: "POST",
      body: JSON.stringify({
        action: "registration",
        email: email,
        password: password,
        mnemonic: mnemonic,
      }),
    }).then((response) => {
      response.text().then((response) => {
        if (response === "Success") {
          presentAlert({
            header: "Success",
            message: "Mnemonic of new wallet: " + mnemonic,
            buttons: ["OK"],
            subHeader: "Account successfully created",
          });
          history.push("/login");
        }
      });
    });
  };

  const createMnemonic = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const lengthOptions = [4, 5, 6];
    let words = [];

    for (let i = 0; i < 12; i++) {
      let wordLength =
        lengthOptions[Math.floor(Math.random() * lengthOptions.length)];
      let word = "";

      for (let j = 0; j < wordLength; j++) {
        let randomChar = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        word += randomChar;
      }

      words.push(word);
    }

    return words.join(" ");
    return "esempio mnemonic";
  };

  const checkPassword = () => {
    if (password.length > 0) {
      if (password !== confirmpassword) {
        presentAlert({
          header: "Alert",
          message: "Passwords are differents",
          buttons: ["OK"],
        });
      } else {
        return true;
      }
    } else {
      presentAlert({
        header: "Alert",
        message: "Password too short",
        buttons: ["OK"],
      });
    }
  };

  const checkEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      presentAlert({
        header: "Alert",
        message: "Email is not valid",
        buttons: ["OK"],
      });
    } else {
      return true;
    }
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
            Sign up<br></br>to continue
          </h1>
        </div>
        <div style={{ paddingTop: "40px" }}>
          <IonLabel position="stacked">Email Address</IonLabel>
          <IonInput
            onIonInput={(e: any) => setEmail(e.target.value)}
            clearOnEdit={true}
            placeholder="Enter email"
            type="email"
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
        <div style={{ paddingTop: "20px" }}>
          <IonLabel position="stacked">Confirm Password</IonLabel>
          <IonInput
            onIonInput={(e: any) => setConfirmPassword(e.target.value)}
            clearOnEdit={true}
            placeholder="Enter password"
          ></IonInput>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <IonButton onClick={registration} size="large" expand="block">
            Sign Up
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
              history.push("/login");
            }}
          >
            Log In
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Register;

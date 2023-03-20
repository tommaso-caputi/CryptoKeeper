import {
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useCallback, useState } from "react";
import sha256 from "fast-sha256";
import { addJsonToJson } from '../data/IonicStorage';

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
            reg(email, password);
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

  const reg = useCallback(async (email: string, password: string) => {
    const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const resultDataAddress = await (await fetch("https://api.blockcypher.com/v1/btc/test3/addrs", { method: 'POST', redirect: 'follow' })).json()
    const resultRegistration = await (await fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
      method: "POST",
      body: JSON.stringify({
        action: "registration",
        email: email,
        password: passwordHash,
        address: resultDataAddress.address,
      }),
    })).text()
    if (resultRegistration === "Success") {
      fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
        method: "POST",
        body: JSON.stringify({
          action: "sendConfirmEmail",
          email: email
        }),
      })
      let json = { 'address': resultDataAddress.address, 'public_key': resultDataAddress.public, 'private_key': resultDataAddress.private, 'wif': resultDataAddress.wif };
      await addJsonToJson('wallets', email, json);
      presentAlert({
        header: "Success",
        message: "Address created: " + resultDataAddress.address,
        subHeader: "Account successfully created, check email for confirm",
        buttons: [{
          text: 'OK',
          handler: () => {
            history.push("/login");
          },
        },]
      });
    }
  }, [presentAlert])

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

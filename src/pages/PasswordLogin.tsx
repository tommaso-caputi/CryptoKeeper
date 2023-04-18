import {
    IonPage,
    IonButton,
    IonInput,
    IonLabel,
    useIonAlert,
    setupIonicReact,
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useCallback, useEffect, useState } from "react";
import { loginPassword } from "../data/registerloginFunctions";
import { setFalseLoggedStorage } from "../data/storage";

const history = createBrowserHistory({ forceRefresh: true });
setupIonicReact();

const PasswordLogin: React.FC = () => {
    const [password, setPassword] = useState("");
    const [presentAlert] = useIonAlert();
    const [email, setEmail] = useState('email');

    const fetchEmail = useCallback(async () => {
        let data = JSON.parse(localStorage.getItem('wallets')!)
        setEmail(data.logged.email);
    }, [])
    useEffect(() => {
        fetchEmail()
    }, [fetchEmail]);

    const login = () => {
        loginPassword(email, password)
            .then((val) => {
                let message = new String(val).split('.');
                console.log(message);
                presentAlert({
                    header: message[0],
                    message: message[1],
                    buttons: ["OK"],
                })
                if (message[0] === "Success") {
                    history.push("/mainMenu", { email: email, fullname: message[2] });
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
                    <IonLabel>or</IonLabel>
                </div>
                <div style={{ paddingTop: "20px", textAlign: "center" }}>
                    <IonButton
                        size="default"
                        expand="block"
                        onClick={async () => {
                            setFalseLoggedStorage()
                            history.push("/login");
                        }}
                    >
                        Log out
                    </IonButton>
                </div>
            </div>
        </IonPage>
    );
};

export default PasswordLogin;

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
import sha256 from "fast-sha256";

const history = createBrowserHistory({ forceRefresh: true });
setupIonicReact();

const PasswordLogin: React.FC = () => {
    const [password, setPassword] = useState("");
    const [presentAlert] = useIonAlert();
    const [email, setEmail] = useState({ email: 'email' });

    const fetchEmail = useCallback(async () => {
        let data = JSON.parse(localStorage.getItem('wallets')!)
        setEmail(data.logged.email);
    }, [])
    useEffect(() => {
        fetchEmail()
    }, [fetchEmail]);

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
                if (data[2] === "True") {
                    if (data[1] === "1") {
                        presentAlert({
                            header: "Success",
                            message: "Logged successfully"
                        });
                        history.push("/mainMenu", { email: email });
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
                        message: "Password is incorrect",
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
                <div style={{ paddingTop: "20px" }}>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput
                        onIonInput={(e: any) => setPassword(e.target.value)}
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
                        onClick={async () => {
                            let d = JSON.parse(localStorage.getItem('wallets')!)
                            d['logged'] = { bool: false, email: "" }
                            localStorage.setItem('wallets', JSON.stringify(d))
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

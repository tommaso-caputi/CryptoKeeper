import {
    IonPage,
    IonButton,
    IonContent,
    IonLabel,
    IonInput,
    useIonAlert
} from "@ionic/react";
import sha256 from "fast-sha256";
import { createBrowserHistory } from "history";
import { useCallback, useState } from "react";
import { useLocation } from "react-router";

const history = createBrowserHistory({ forceRefresh: true });

const Import: React.FC = () => {
    const [presentAlert] = useIonAlert();
    const [wif, setWif] = useState("");
    const [address, setAddress] = useState("");
    const [public_key, setPublicKey] = useState("");
    const [private_key, setPrivateKey] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

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
                        reg(email, password, address, public_key, private_key, wif);
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

    const reg = useCallback(async (email: string, password: string, address: string, public_key: string, private_key: string, wif: string) => {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        const resultRegistration = await (await fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: "POST",
            body: JSON.stringify({
                action: "registration",
                email: email,
                password: passwordHash,
                address: address,
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
            let json = { 'address': address, 'public_key': public_key, 'private_key': private_key, 'wif': wif };
            let d = JSON.parse(localStorage.getItem('wallets')!)
            d[email] = json
            localStorage.setItem('wallets', d)
            presentAlert({
                header: "Success",
                message: "Account successfully created",
                buttons: ["OK"],
            });
            history.push("/remember", {
                private_key: private_key,
                public_key: public_key,
                address: address,
                wif: wif,
                email: email,
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
            <IonContent>
                <div
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        color: "black",
                    }}
                >
                    <div>
                        <h1 style={{ fontSize: 40 }}>
                            Import existing address data
                        </h1>
                    </div>

                    <div style={{ paddingTop: "40px" }}>
                        <IonLabel position="stacked">Email Address</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            type="email"
                        ></IonInput>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        ></IonInput>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Confirm Password</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setConfirmPassword(e.target.value)}
                            placeholder="Enter password"
                        ></IonInput>
                    </div>
                    <br />
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setAddress(e.target.value)}
                            placeholder="Enter address"
                            type="email"
                        ></IonInput>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Public Key</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setPublicKey(e.target.value)}
                            placeholder="Enter public key"
                        ></IonInput>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Private Key</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setPrivateKey(e.target.value)}
                            placeholder="Enter private key"
                        ></IonInput>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <IonLabel position="stacked">Wif</IonLabel>
                        <IonInput
                            onIonInput={(e: any) => setWif(e.target.value)}
                            placeholder="Enter wif"
                        ></IonInput>
                    </div>


                    <div style={{ paddingTop: "50px" }}>
                        <IonButton onClick={registration} size="large" expand="block">
                            Import
                        </IonButton>
                    </div>
                    <div style={{ paddingTop: "20px", textAlign: "center" }}>
                        <IonLabel>or</IonLabel>
                    </div>
                    <div style={{ paddingTop: "0px", textAlign: "center" }}>
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
            </IonContent>
        </IonPage>
    );
};

export default Import;
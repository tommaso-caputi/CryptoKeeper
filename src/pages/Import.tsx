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
import { checks, importRegistration } from "../data/registerloginFunctions";

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

    function fullRegistration(email: string, password: string, confirmpassword: string, address: string, public_key: string, private_key: string, wif: string) {
        checks(email, password, confirmpassword)
            .then((val) => {
                let message = new String(val).split('.');
                if (message[0] === "Success") {
                    importRegistration(email, password, address, public_key, private_key, wif)
                        .then((val2) => {
                            let message2 = new String(val2).split('.');
                            presentAlert({
                                header: message2[0],
                                message: message2[1],
                                buttons: ["OK"],
                            })
                            if (message2[0] === "Success") {
                                history.push("/remember", {
                                    private_key: private_key,
                                    public_key: public_key,
                                    address: address,
                                    wif: wif,
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
                        <IonButton onClick={() => fullRegistration(email, password, confirmpassword, address, public_key, private_key, wif)} size="large" expand="block">
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
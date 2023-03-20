import {
    IonPage,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { addJsonToJson } from '../data/IonicStorage';

const history = createBrowserHistory({ forceRefresh: true });

const Import: React.FC = () => {
    const location = useLocation<{ private_key: string, public_key: string, address: string, wif: string }>();
    const [wif, setWif] = useState("");
    const [address, setAddress] = useState("");
    const [public_key, setPublicKey] = useState("");
    const [private_key, setPrivateKey] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const add = useCallback(async () => {

    }, [])

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
                        <IonButton onClick={add} size="large" expand="block">
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

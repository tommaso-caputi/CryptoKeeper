import {
    IonPage,
    IonButton,
    IonContent
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router";
import { setJsonOfJson } from "../data/IonicStorage";

const history = createBrowserHistory({ forceRefresh: true });

const Remember: React.FC = () => {
    const location = useLocation<{ private_key: string, public_key: string, address: string, wif: string, email: string }>();
    return (
        <IonPage>
            <IonContent>
                <div style={{
                    padding: "20px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    color: "black",
                }}>
                    <div>
                        <h1 style={{ fontSize: 40 }}>
                            Save this data
                        </h1>
                        <br />
                        <div style={{ fontSize: 25 }}>
                            Address: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.address}</h1><br />
                            Public key: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.public_key}</h1><br />
                            Private key: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.private_key}</h1><br />
                            Wif: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.wif}</h1>
                        </div>
                    </div>
                    <br /><br />
                    <div>
                        You should save this data, because CryptoKeeper do not save them(privacy terms)
                        <br />
                        No do not share them to other people except for the address and public key
                        <br />
                        <h1 style={{ fontSize: 23 }}>Check email for confirm</h1>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "15px", paddingBottom: "20px" }}>
                        <IonButton
                            size="default"
                            expand="block"
                            onClick={() => {
                                setJsonOfJson('wallets', 'logged', { bool: true, email: location.state.email })
                                history.push("/passwordlogin");
                            }}
                        >
                            Log In
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Remember;

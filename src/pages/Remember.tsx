import {
    IonPage,
    IonButton,
    IonContent
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router";

const history = createBrowserHistory({ forceRefresh: true });

const Remember: React.FC = () => {
    const location = useLocation<{ private_key: string, public_key: string, address: string, wif: string }>();
    return (
        <IonPage>
            <IonContent>
                <div>
                    <h1 style={{ fontSize: 40 }}>
                        Save this data<br />
                    </h1>
                    <p style={{ fontSize: 25 }}>
                        Address: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.address}</h1><br />
                        Public key: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.public_key}</h1><br />
                        Private key: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.private_key}</h1><br />
                        Wif: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.wif}</h1><br />
                    </p>
                </div>
                <div>
                    <br /><br />
                    You should save this data, because CryptoKeeper do not save them(privacy terms)
                    <br />
                    No do not share them to other people except for the address
                    <br />
                    <h1 style={{ fontSize: 23 }}>Check email for confirm</h1>
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

            </IonContent>
        </IonPage>
    );
};

export default Remember;

import {
    IonPage,
    IonButton,
    IonContent
} from "@ionic/react";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router";

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
                            Salva questi dati
                        </h1>
                        <br />
                        <div style={{ fontSize: 25 }}>
                            Address: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.address}</h1><br />
                            Chiave pubblica: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.public_key}</h1><br />
                            Chiave privata: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.private_key}</h1><br />
                            Wif: <h1 style={{ fontSize: 25, color: '#32a852' }}>{location.state.wif}</h1>
                        </div>
                    </div>
                    <br /><br />
                    <div>
                        É necessario salvare questi dati del portafoglio bitcoin, Crypto Keeper non li salva per motivi di sicurezza e privacy
                        <br />
                        Non condividere con altri questi dati ad eccezione dell' address e della chiave pubblica
                        <br />
                        <h1 style={{ fontSize: 23 }}>Controlla l' email per la conferma</h1>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "15px", paddingBottom: "20px" }}>
                        <IonButton
                            size="default"
                            expand="block"
                            onClick={() => {
                                let d = JSON.parse(localStorage.getItem('wallets')!)
                                d['logged'] = { bool: true, email: location.state.email }
                                localStorage.setItem('wallets', JSON.stringify(d))
                                history.push("/passwordlogin");
                            }}
                        >
                            Accesso
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Remember;

import {
    IonBackButton,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    useIonToast,
    useIonActionSheet
} from '@ionic/react';
import sha256 from 'fast-sha256';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

function Profile() {
    const [present2] = useIonActionSheet();
    const [result, setResult] = useState<string>();
    const [present] = useIonToast();

    const location = useLocation<{ email: string }>();
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(location.state.email);

    const fetchFullname = useCallback(async () => {
        const data = await (await
            fetch('https://cryptokeeper.altervista.org/APP/webhook.php', {
                method: "POST",
                body: JSON.stringify({
                    action: "getFullname",
                    email: location.state.email
                }),
            })).text()
        setFullname(data)
    }, [location.state.email])
    useEffect(() => {
        fetchFullname()
    }, [fetchFullname]);

    const save = () => {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        fetch("https://cryptokeeper.altervista.org/APP/webhook.php", {
            method: 'POST',
            body: JSON.stringify({
                "action": "update",
                "email": location.state.email,
                "password": passwordHash,
                "fullname": fullname
            })
        })
            .then(response => response.text())
            .then(result => {
                if (result === "Success") {
                    present({
                        message: 'Nome e Cognome cambiati con successo',
                        duration: 1500,
                        position: 'bottom'
                    });
                    setFullname(fullname);
                } else {
                    present({
                        message: 'Qualcosa é andato storto, prova di nuovo',
                        duration: 1500,
                        position: 'bottom'
                    });
                }
            })
            .catch(error => present({
                message: 'Qualcosa é andato storto, prova di nuovo: ' + error.message,
                duration: 1500,
                position: 'bottom'
            }));
    };
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profilo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50%',
                    justifyContent: 'space-evenly',
                }}>
                    <IonItem>
                        <IonLabel position="stacked">Nome Cognome</IonLabel>
                        <IonInput onIonInput={(e: any) => setFullname(e.target.value)} placeholder={fullname}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput disabled={true} onIonInput={(e: any) => setEmail(e.target.value)} placeholder={location.state.email}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput disabled={true} onIonInput={(e: any) => setPassword(e.target.value)} placeholder="change password"></IonInput>
                    </IonItem>
                </div>
                <IonButton
                    size="large"
                    expand='block'
                    onClick={() =>
                        present2({
                            header: 'Modifica',
                            buttons: [
                                {
                                    text: 'Conferma',
                                    role: "update"
                                },
                                {
                                    text: 'Cancella',
                                    role: 'cancel'
                                },
                            ],
                            onDidDismiss: ({ detail }) => {
                                if (detail.role === "update") {
                                    save()
                                }
                            },
                        })
                    }
                >
                    Salva
                </IonButton>
            </IonContent>
        </>
    );
}

export default Profile;
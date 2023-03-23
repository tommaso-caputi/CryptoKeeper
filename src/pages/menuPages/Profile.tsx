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
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import sha256 from 'fast-sha256';
import { useState } from 'react';
import { useLocation } from "react-router-dom";


function Profile() {
    const [present2] = useIonActionSheet();
    const [result, setResult] = useState<string>();
    const [present] = useIonToast();

    const location = useLocation<{ email: string, fullname: string }>();
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(location.state.email);

    const save = () => {
        const passwordHash = Array.from(sha256(new TextEncoder().encode(password)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        console.log(password, email, fullname);
        fetch("http://cryptokeeper.altervista.org/APP/webhook.php", {
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
                        message: 'Full name and password changed successfully',
                        duration: 1500,
                        position: 'bottom'
                    });
                    location.state.fullname = fullname;
                } else {
                    present({
                        message: 'Something went wrong, try again',
                        duration: 1500,
                        position: 'bottom'
                    });
                }
            })
            .catch(error => console.log('error', error));
    };
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
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
                        <IonLabel position="stacked">Full name</IonLabel>
                        <IonInput onIonInput={(e: any) => setFullname(e.target.value)} placeholder={location.state.fullname}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput disabled={true} onIonInput={(e: any) => setEmail(e.target.value)} placeholder={location.state.email}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput onIonInput={(e: any) => setPassword(e.target.value)} placeholder="change password"></IonInput>
                    </IonItem>
                </div>
                <IonButton
                    size="large"
                    expand='block'
                    onClick={() =>
                        present2({
                            header: 'Confirm',
                            buttons: [
                                {
                                    text: 'Update',
                                    role: "update"
                                },
                                {
                                    text: 'Cancel',
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
                    Save
                </IonButton>
            </IonContent>
        </>
    );
}

export default Profile;
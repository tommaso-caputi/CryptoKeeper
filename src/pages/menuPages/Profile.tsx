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
} from '@ionic/react';
import { useState } from 'react';
import { useLocation } from "react-router-dom";


function Profile() {
    const location = useLocation<{ email: string }>();
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(location.state.email);

    const save = () => {
        console.log(password, email, fullname);
    }

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
                        <IonInput onIonInput={(e: any) => setFullname(e.target.value)} placeholder="Fistname Surname"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput onIonInput={(e: any) => setEmail(e.target.value)} placeholder={location.state.email}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput onIonInput={(e: any) => setPassword(e.target.value)} placeholder="change password"></IonInput>
                    </IonItem>
                </div>
                <IonButton size="large" expand='block' onClick={save}>Save</IonButton>
            </IonContent>
        </>
    );
}

export default Profile;
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonContent, IonInput, IonItem, IonLabel, } from '@ionic/react';
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

const Register: React.FC = () => {

    return (
        <IonPage>
            <div style={{padding: '20px', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', color: 'black' }}>
                <div style={{height: '8%'}}></div>
                <div>
                    <h1 style={{ fontSize: 40 }}>Sign up<br></br>to continue</h1>
                </div>
                <div style={{ paddingTop: '40px', }}>
                    <IonLabel position="stacked">Email Address</IonLabel>
                    <IonInput clearOnEdit={true} placeholder="Enter email"></IonInput>
                </div>
                <div style={{ paddingTop: '20px', }}>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput clearOnEdit={true} placeholder="Enter password"></IonInput>
                </div>
                <div style={{ paddingTop: '20px', }}>
                    <IonLabel position="stacked">Confirm Password</IonLabel>
                    <IonInput clearOnEdit={true} placeholder="Enter password"></IonInput>
                </div>
                <div style={{ paddingTop: '50px', }}>
                    <IonButton size="large" expand='block'>Sign Up</IonButton>
                </div>
                <div style={{ paddingTop: '20px', textAlign: 'center' }}>
                    <IonLabel>or</IonLabel>
                </div>
                <div style={{ paddingTop: '20px', textAlign: 'center' }}>
                    <IonButton size="default" expand='block' onClick={() => { history.push('/login') }}>Log In</IonButton>
                </div>
            </div>
        </IonPage >
    );
};

export default Register;

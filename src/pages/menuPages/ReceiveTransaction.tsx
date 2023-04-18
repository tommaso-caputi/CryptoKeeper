import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { phonePortraitOutline, qrCodeOutline } from 'ionicons/icons';
import { getWalletsStorage } from '../../data/storage';

function ReceiveTransaction() {

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Receive transaction</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{
                    display: 'flex',
                    height: '70%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <IonButton size="large" shape="round" >
                            <IonIcon slot="icon-only" icon={phonePortraitOutline}></IonIcon>
                        </IonButton>
                        <IonButton size="large" shape="round">
                            <IonIcon slot="icon-only" icon={qrCodeOutline}></IonIcon>
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </>
    );
}

export default ReceiveTransaction;
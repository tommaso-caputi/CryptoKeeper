import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonIcon,
    useIonAlert,
} from '@ionic/react';
import { phonePortraitOutline, qrCodeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { sendTransaction } from '../../data/transactions';
import { createBrowserHistory } from 'history';
import { getWalletsStorage } from '../../data/storage';

const history = createBrowserHistory({ forceRefresh: true });

function SendTransaction() {
    const [presentAlert] = useIonAlert();
    const [value, setValue] = useState()
    const [to, setTo] = useState('C36fr59PPnzyjDZmxRYwyEbPSo95KtxtqB')

    const check = () => {
        if (to) {
            if (value) {
                sendTransaction(to, Number(value)).then((val) => {
                    let message = new String(val).split('.')
                    presentAlert({
                        header: message[0],
                        message: message[1],
                        buttons: [
                            {
                                text: 'OK',
                                handler: () => {
                                    history.push('/mainmenu', { email: getWalletsStorage()['logged']['email'] })
                                }
                            }
                        ],

                    })
                })
            } else {
                presentAlert({
                    header: "Failed",
                    message: "No value",
                    buttons: ["OK"],
                })
            }
        } else {
            presentAlert({
                header: "Failed",
                message: "No address to send",
                buttons: ["OK"],
            })
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Send transaction</IonTitle>
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
                        <IonButton size="large" shape="round">
                            <IonIcon slot="icon-only" icon={phonePortraitOutline}></IonIcon>
                        </IonButton>
                        <IonButton size="large" shape="round">
                            <IonIcon slot="icon-only" icon={qrCodeOutline}></IonIcon>
                        </IonButton>
                    </div>
                    <IonItem>
                        <IonLabel position="stacked">Value (BTC)</IonLabel>
                        <IonInput type="number" onIonInput={(e: any) => setValue(e.target.value)}></IonInput>
                    </IonItem>
                    <IonButton size="large" expand='block' onClick={check}>Send</IonButton>
                </div>
            </IonContent>
        </>
    );
}

export default SendTransaction;
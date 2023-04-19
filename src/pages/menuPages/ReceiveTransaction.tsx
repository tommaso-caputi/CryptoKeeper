import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { phonePortraitOutline, qrCodeOutline } from 'ionicons/icons';
import { QRCodeCanvas } from "qrcode.react";
import { getWalletsStorage } from '../../data/storage';
import { useEffect, useState } from 'react';

function ReceiveTransaction() {
    const [address, setAddress] = useState('')
    const [showQr, setShowQr] = useState(false)

    useEffect(() => {
        let temp = getWalletsStorage()
        setAddress(temp[temp['logged']['email']]['address'])
    }, []);

    const qrcode = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }}>
            <div>
                <QRCodeCanvas
                    id="qrCode"
                    value={address}
                    size={300}
                />
            </div>
            <br />
            <div>
                <IonLabel>
                    {address}
                </IonLabel>
            </div>
        </div>
    );

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Ricezione transazione</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                }}>
                    <div style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <IonButton size="large" shape="round" >
                            <IonIcon slot="icon-only" icon={phonePortraitOutline}></IonIcon>
                        </IonButton>
                        <IonButton size="large" shape="round" onClick={() => {
                            setShowQr(!showQr)
                        }}>
                            <IonIcon slot="icon-only" icon={qrCodeOutline}></IonIcon>
                        </IonButton>
                    </div>
                    <div style={{
                        marginTop: 50,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        {showQr && qrcode}
                    </div>
                </div>
            </IonContent>
        </>
    );
}

export default ReceiveTransaction;
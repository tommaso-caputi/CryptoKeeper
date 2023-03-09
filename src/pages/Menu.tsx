import { Computer } from '@bitcoin-computer/lib';
import { IonApp, IonRouterOutlet, setupIonicReact, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


setupIonicReact();

const Menu: React.FC = props => {
    const location = useLocation<{ mnemonic: string }>();
    const [computer] = useState(new Computer({
        mnemonic: location.state.mnemonic,
        chain: "LTC",
        network: "testnet",
        url: "https://node.bitcoincomputer.io",
    }))
    const [balance, setBalance] = useState(0)
    const [amount, setAmount] = useState(0)
    const [to, setTo] = useState("")


    useEffect(() => {
        async function refresh() {
            if (computer) setBalance(await computer.getBalance())
        }
        refresh()
    }, [computer])
    const Balance = () => {
        if (balance === null) return <code>Loading...</code>
        return <code>{balance / 1e8} {computer.getChain()} ({computer.getNetwork()})</code>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle><Balance /></IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
};

export default Menu;

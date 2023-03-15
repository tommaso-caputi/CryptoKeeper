import {
  setupIonicReact,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

setupIonicReact();

const Menu: React.FC = () => {
  const location = useLocation<{ email: string, public_key: string, private_key: string, address: string, wif: string }>();
  const [balance, setBalance] = useState(-1);

  const fetchBalance = useCallback(async () => {
    const data = await (await fetch('https://api.blockcypher.com/v1/btc/test3/addrs/' + location.state.address + '/balance')).json()
    setBalance(data.balance / 100000000)
    console.log('a')
  }, [])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Email: {location.state.email}</IonTitle>
        </IonToolbar>
        <IonText >Address: {location.state.address}</IonText><br />
        <IonText>Balance: {balance} BTC</IonText>
      </IonHeader>
    </IonPage>
  );
};

export default Menu;
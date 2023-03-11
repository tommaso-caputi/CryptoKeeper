import { Computer } from "@bitcoin-computer/lib";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

setupIonicReact();

const Menu: React.FC = (props) => {
  const location = useLocation<{ mnemonic: string; email: string }>();
  const [computer] = useState(
    new Computer({
      //mnemonic: location.state.mnemonic,
      mnemonic:
        "travel upgrade inside soda birth essence junk merit never twenty system opinion",
      chain: "LTC",
      network: "testnet",
      url: "https://node.bitcoincomputer.io",
    })
  );
  const [balance, setBalance] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("");

  useEffect(() => {
    async function refresh() {
      if (computer) setBalance(await computer.getBalance());
    }
    refresh();
  }, [computer]);
  const Balance = () => {
    if (balance === -1) return <code>Loading...</code>;
    return (
      <code>
        {balance / 1e8} {computer.getChain()} ({computer.getNetwork()})
      </code>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Balance />
          </IonTitle>
          <IonTitle>Email: {location.state.email}</IonTitle>
          <IonLabel>Mnemonic: {location.state.mnemonic}</IonLabel>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Menu;

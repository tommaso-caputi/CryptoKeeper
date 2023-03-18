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

import '../css/Menu.css';
setupIonicReact();

const Menu: React.FC = () => {
  const location = useLocation<{ email: string, public_key: string, private_key: string, address: string, wif: string }>();
  const [balance, setBalance] = useState([-1, 0]); // 0(BTC), 1(EUR)
  const [EURChange, setEURChange] = useState(1);

  const fetchBalance = useCallback(async () => {
    //const data = await (await fetch('https://api.blockcypher.com/v1/btc/test3/addrs/' + location.state.address + '/balance')).json()
    const data = { balance: 3694203 }
    setBalance([data.balance / 100000000, balance[1]])
  }, [])
  const fetchEURChange = useCallback(async () => {
    //const data = await (await fetch('https://api.blockcypher.com/v1/btc/test3/addrs/' + location.state.address + '/balance')).json()
    const data = { bitcoin: { eur: 25452.131871208 } }
    setEURChange(data.bitcoin.eur)
  }, [])

  useEffect(() => {
    fetchEURChange();
    fetchBalance()
  }, [fetchBalance, fetchEURChange]);

  const a = () => {
    if (balance[1] === 0) {
      setBalance([balance[0], 1])
    } else {
      setBalance([balance[0], 0])
    }
  }


  return (
    <IonPage>
      <div style={{ flex: 1 }}>
        <div style={{ height: '20%' }}>

        </div>
        <div style={{ height: '20%' }}>
          <p className="text-balance1">Balance</p>
          <h1 className="text-balance2" onClick={a}>
            {balance[1] === 0 &&
              balance[0].toFixed(6) + ' BTC'
            }
            {balance[1] === 1 &&
              '$' + (balance[0] * EURChange).toFixed(2)
            }
          </h1>
        </div>
      </div>
    </IonPage >
  );
};

export default Menu;
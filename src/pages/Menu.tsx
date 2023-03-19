import {
  setupIonicReact,
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { arrowForwardOutline, arrowBackOutline } from 'ionicons/icons';

import '../css/Menu.css';
setupIonicReact();

const Menu: React.FC = () => {
  const location = useLocation<{ email: string, public_key: string, private_key: string, address: string, wif: string }>();
  const [balance, setBalance] = useState([-1, 0]); // 0(BTC), 1(EUR)
  const [EURChange, setEURChange] = useState(1);
  const [transactions, setTransactions] = useState<string[] | []>([]);

  const fetchBalance = useCallback(async () => {
    //const data = await (await fetch('https://api.blockcypher.com/v1/btc/test3/addrs/' + location.state.address + '/balance')).json()
    const data = { balance: 3694203 }
    setBalance([data.balance / 100000000, balance[1]])
  }, [])
  const fetchEURChange = useCallback(async () => {
    //const data = await (await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')).json()
    const data = { bitcoin: { eur: 25452.131871208 } }
    setEURChange(data.bitcoin.eur)
  }, [])
  const fetchTransactions = useCallback(async () => {
    const data = await (await
      fetch('http://cryptokeeper.altervista.org/APP/webhook.php', {
        method: "POST",
        body: JSON.stringify({
          action: "getTransactions",
          email: location.state.email
        }),
      })).text()
    let splittedData = data.split(',');
    if (splittedData[0] === "True") {
      for (let i = 1; i < splittedData.length - 1; i++) {
        setTransactions(prevArray => [...prevArray, splittedData[i]])
      }
    }
    //const data = ['3', '4', '5', '6', '7'];
    //data.map(transaction => setTransactions(prevArray => [...prevArray, transaction]))
  }, [])

  useEffect(() => {
    fetchEURChange();
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchEURChange, fetchTransactions]);

  const changeBalanceType = () => {
    if (balance[1] === 0) {
      setBalance([balance[0], 1])
    } else {
      setBalance([balance[0], 0])
    }
  }

  return (
    <IonPage>
      <IonContent className="prova" >
        <div style={{ height: '12%' }}>
        </div>
        <div style={{ height: '10%' }}>
          <p className="text-balance1">Balance</p>
          <h1 className="text-balance2" onClick={changeBalanceType}>
            {balance[1] === 0 &&
              balance[0].toFixed(6) + ' BTC'
            }
            {balance[1] === 1 &&
              '$' + (balance[0] * EURChange).toFixed(2)
            }
          </h1>
        </div>
        <div style={{
          height: '30%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
          <IonButton size="large">
            <IonIcon slot="icon-only" icon={arrowForwardOutline}></IonIcon>
          </IonButton>
          <IonButton size="large">
            <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
          </IonButton>
        </div>
        <div style={{ height: '44.5%' }}>
          <p className="text-balance3">Transactions</p>
          <IonContent>
            {transactions.map(transaction => {
              let splittedTransaction = transaction.split(';')
              return (
                <IonCard key={splittedTransaction[0]}>
                  <IonCardContent>
                    {splittedTransaction[1]}
                    <IonText>              value= </IonText>
                    {splittedTransaction[2]}
                    <IonText>  BTC</IonText>
                  </IonCardContent>
                </IonCard>
              )
            })}
          </IonContent>
        </div>
      </IonContent>

    </IonPage >
  );
};

export default Menu;
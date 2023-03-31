import {
  setupIonicReact,
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonText,
  IonMenu,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonMenuToggle,
  IonNavLink,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { arrowUpOutline, arrowDownOutline, personOutline, gridOutline } from 'ionicons/icons';
import { createBrowserHistory } from "history";

import Profile from './menuPages/Profile';
import '../css/Menu.css';
import { getWalletsStorage, setFalseLoggedStorage } from "../data/storage";
import SendTransaction from "./menuPages/SendTransaction";
const history = createBrowserHistory({ forceRefresh: true });
setupIonicReact();


const Menu: React.FC = () => {
  const location = useLocation<{ email: string, fullname: string }>();
  const [dataEmail, setDataEmail] = useState({ address: 'address', public_key: 'public_key', private_key: 'private_key', wif: 'wif' });
  const [balance, setBalance] = useState([-1, 0]); // 0(BTC), 1(EUR)
  const [EURChange, setEURChange] = useState(1);
  const [transactions, setTransactions] = useState<string[] | []>([]);

  const fetchBalance = useCallback(async () => {
    let d = getWalletsStorage()
    //const data = await (await fetch('https://api.blockcypher.com/v1/bcy/test/addrs/' + d[d.logged.email].address + '/balance')).json()
    const data = { balance: 3694203 }
    setBalance([data.balance / 100000000, balance[1]])
  }, [])
  const fetchEURChange = useCallback(async () => {
    const data = await (await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')).json()
    //const data = { bitcoin: { eur: 25452.131871208 } }
    setEURChange(data.bitcoin.eur)
  }, [])
  const fetchTransactions = useCallback(async () => {
    const data = await (await
      fetch('https://cryptokeeper.altervista.org/APP/webhook.php', {
        method: "POST",
        body: JSON.stringify({
          action: "getTransactions",
          email: location.state.email
        }),
      })).text()
    let splittedData = data.split('?');
    if (splittedData[0] === "True") {
      setTransactions([])
      for (let i = 1; i < splittedData.length - 1; i++) {
        setTransactions(prevArray => [...prevArray, splittedData[i]])
      }
    }
  }, [location.state.email])
  const fetchDataEmail = useCallback(async () => {
    let d = getWalletsStorage()
    setDataEmail(d[location.state.email]);
  }, [location.state.email])

  useEffect(() => {
    fetchDataEmail();
    fetchEURChange();
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchDataEmail, fetchEURChange, fetchTransactions]);

  const changeBalanceType = () => {
    if (balance[1] === 0) {
      setBalance([balance[0], 1])
    } else {
      setBalance([balance[0], 0])
    }
  }

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem button onClick={() => {
              setFalseLoggedStorage()
              history.push('/login')
            }
            }>
              <IonLabel>Log out</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonContent className="prova" >
          <div style={{ height: '12%', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <IonMenuToggle>
              <IonButton size="large" shape="round">
                <IonIcon slot="icon-only" icon={gridOutline}></IonIcon>
              </IonButton>
            </IonMenuToggle>
            <IonNavLink routerDirection="forward" component={() => <Profile />}>
              <IonButton size="large" shape="round">
                <IonIcon slot="icon-only" icon={personOutline}></IonIcon>
              </IonButton>
            </IonNavLink>
          </div>

          <div style={{ height: '10%', paddingTop: '10px' }}>
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
            <IonNavLink routerDirection="forward" component={() => <SendTransaction />}>
              <IonButton size="large">
                <IonIcon slot="icon-only" icon={arrowUpOutline}></IonIcon>
              </IonButton>
            </IonNavLink>
            <IonButton size="large">
              <IonIcon slot="icon-only" icon={arrowDownOutline}></IonIcon>
            </IonButton>
          </div>
          <div style={{ height: '44.5%' }}>
            <p className="text-balance3">Transactions</p>
            <IonContent>
              {transactions.map(transaction => {
                let splittedTransaction = transaction.split(';')
                let tx = JSON.parse(splittedTransaction[0].replace(/`/g, "\"").replace(/&quot;/ig, '"'))
                return (
                  <IonCard key={tx['received']}>
                    <IonCardContent>
                      <IonText>{splittedTransaction[1]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tx['outputs'][0]['value']} BTC</IonText>
                    </IonCardContent>
                  </IonCard>
                )
              })}
            </IonContent>
          </div>
        </IonContent>

      </IonPage >
    </>
  );
};

export default Menu;
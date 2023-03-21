import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonContent, IonImg, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Register from './pages/Register';
import Remember from './pages/Remember';
import Import from './pages/Import';
import PasswordLogin from './pages/PasswordLogin';

import { createBrowserHistory } from "history";

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

import './css/App.css'

import { createStore, set, get } from './data/IonicStorage';
import { useEffect } from 'react';

setupIonicReact();
const history = createBrowserHistory({ forceRefresh: true });

const FirstPage = () => {
  useEffect(() => {
    const check = async () => {
      const exists = await get("wallets");
      if (exists) {
        if (exists.logged.bool === true && history.location.pathname === "/") {
          history.push('/passwordlogin');
        }
      }
    }
    check()
  });

  return (
    <IonPage>
      <IonContent>
        <div style={{ height: '100%', width: '100%', backgroundColor: 'white', paddingTop: '50px' }}>
          <IonImg src="https://cryptokeeper.altervista.org/APP/LogoCryptoKeeper.png"></IonImg>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'black' }}>Crypto Keeper</h1>
          </div>
          <div style={{ paddingTop: '50px', textAlign: 'center', height: '30%' }}>
            <IonButton size="large" onClick={() => history.push('/login')}>Start Now</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

const App: React.FC = () => {
  useEffect(() => {
    const setupStore = async () => {
      await createStore();
      const exists = await get("wallets");
      if (!exists) {
        await set("wallets", { logged: { 'bool': false, 'email': '' } });
        /* await set("wallets", {
          't@t.com': {
            'address': 'mtWyWxCmVjay1jkZedHfM9SPqA2SaGXgnc',
            'wif': 'cMvWu5rZjbiCdfHE7U6RszhV8rvyVZk1YUu64AZ5efpxoWow1KsW',
            'public_key': '03c4286e83e9da89a9491864718d58f967e84c0f74f4836aeae084642e15c0a7a4',
            'private_key': '0a318361d63ba7eec141bc62552f5678f4a3b43e4cac4628a7bb10f49e6e5a68'
          },
          'logged': {
            'bool': true,
            'email': 't@t.com'
          }
        }); */
      }
    }
    setupStore();
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/menu">
            <Menu />
          </Route>
          <Route exact path="/firstpage">
            <FirstPage />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/remember">
            <Remember />
          </Route>
          <Route exact path="/passwordlogin">
            <PasswordLogin />
          </Route>
          <Route exact path="/import">
            <Import />
          </Route>
          <Route exact path="/">
            <Redirect to="/firstpage" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
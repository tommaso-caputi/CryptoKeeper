import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonContent, IonImg, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Register from './pages/Register';
import Remember from './pages/Remember';
import Import from './pages/Import';
import PasswordLogin from './pages/PasswordLogin';
import MainMenu from './pages/mainMenu';


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

import { useEffect } from 'react';
import { getWalletsStorage, initWalletsStorage } from './data/storage';

setupIonicReact();
const history = createBrowserHistory({ forceRefresh: true });

const FirstPage = () => {
  useEffect(() => {
    const check = async () => {
      let wallets = getWalletsStorage()
      if (wallets.logged.bool === true && history.location.pathname === "/") {
        history.push('/passwordlogin');
      }
    }
    check()
  }, []);

  return (
    <IonPage>
      <div style={{ height: '100%', width: '100%', backgroundColor: 'white', paddingTop: '50px' }}>
        <IonImg src="https://cryptokeeper.altervista.org/APP/LogoCryptoKeeper.png"></IonImg>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'black' }}>Crypto Keeper</h1>
        </div>
        <div style={{ paddingTop: '50px', textAlign: 'center', height: '30%' }}>
          <IonButton size="large" onClick={() => history.push('/login')}>Inizia</IonButton>
        </div>
      </div>
    </IonPage>
  );
}

const App: React.FC = () => {
  useEffect(() => {
    const setupLocalStore = async () => {
      initWalletsStorage()
    }
    setupLocalStore();
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
          <Route exact path="/mainMenu">
            <MainMenu />
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
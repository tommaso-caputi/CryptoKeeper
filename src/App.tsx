import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonImg, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Register from './pages/Register';
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

setupIonicReact();
const history = createBrowserHistory({ forceRefresh: true });

const FirstPage = () => {
  return (
    <IonPage>
      <div style={{ height: '100%', width: '100%', backgroundColor: 'white', paddingTop: '50px' }}>
        <IonImg src="https://scontent.fbri2-1.fna.fbcdn.net/v/t39.30808-6/327306278_868028794311544_6276392210937262156_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZsRHGTikDwYAX-aOM8H&_nc_ht=scontent.fbri2-1.fna&oh=00_AfDURguPCXslAgYI4YFgqjwbhLdXxSTThbcEnEDuTxlflw&oe=640E8363"></IonImg>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'black' }}>Crypto Keeper</h1>
        </div>
        <div style={{ paddingTop: '50px', textAlign: 'center', height: '30%' }}>
          <IonButton size="large" onClick={() => history.push('/login')}>Start Now</IonButton>
        </div>
      </div>
    </IonPage>
  );
}



const App: React.FC = () => (
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
        <Route exact path="/">
          <Redirect to="/firstpage" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
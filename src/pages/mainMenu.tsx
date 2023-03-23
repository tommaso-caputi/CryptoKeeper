import React from 'react';
import { IonNav } from '@ionic/react';

import Menu from './Menu';

function MainMenu() {
    return <IonNav root={() => <Menu />}></IonNav>;
}

export default MainMenu;
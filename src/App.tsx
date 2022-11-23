import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { chatbubblesOutline, settingsOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import Settings from "./pages/Settings";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";

const App: React.FC = () => (
  <IonApp>
    <IonReactHashRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/chats" />
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/:tab(chats)">
            <Chats />
          </Route>
          <Route
            path="/:tab(chats)/:topic"
            render={(e) => (<Chat topic={e.match.params.topic} />)}
          ></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="chats" href="/chats">
            <IonIcon icon={chatbubblesOutline} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactHashRouter>
  </IonApp>
);

export default App;

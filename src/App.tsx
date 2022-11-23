import React from "react";
import { IonApp, IonBadge } from "@ionic/react";
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
import { useStore } from "./store";

const App: React.FC = () => {
  const unreadCount = useStore((state) => state.unreadCount);

  return (
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
              render={(e) => <Chat topicId={e.match.params.topic} />}
            ></Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="chats" href="/chats">
              <IonIcon icon={chatbubblesOutline} />
              <IonLabel>Chats</IonLabel>
              {unreadCount > 0 && <IonBadge>{unreadCount}</IonBadge>}
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
};

export default App;

import {
  IonBadge,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { sendMessage, useStore } from "../store";

export default function Chats() {
  const state = useStore();

  const [presentAlert] = useIonAlert();

  const onAddTopic = () => {
    presentAlert({
      header: "Please enter the name of your topic",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Create",
          role: "confirm",
          handler: ({ ["0"]: name }) => {
            if (name.length >= 1) {
              sendMessage(name, `I created ${name}`);
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: "Topic name",
          attributes: {
            maxlength: 24,
            minlength: 3,
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {state.topics.map(({ id, name }) => (
            <IonItem
              routerLink={"/chats/" + id}
              key={id}
            >
              <IonLabel>{name}</IonLabel>
              {(state.readCounts[id] || 0) <
                state.messages[id]?.length && (
                  <IonBadge>
                    {(state.messages[id]?.length || 0) -
                      (state.readCounts[id] || 0)}
                  </IonBadge>
                )}
            </IonItem>
          ))}
        </IonList>
        {Object.keys(state.messages).length === 0 && (
          <div>
            Nothing here yet, create a topic with the add button in the corner
            below.
          </div>
        )}
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={onAddTopic}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
}

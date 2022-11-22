import {
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
        Topics:
        <IonList>
          {Object.keys(state.messages).map((topic) => (
            <IonItem
              routerLink={"/chats/" + encodeURIComponent(topic)}
              key={topic}
            >
              <IonLabel>{topic}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={onAddTopic}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
}

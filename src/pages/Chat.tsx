import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import { useRef } from "react";
import { sendMessage, useStore } from "../store";

export default function Chat({ topic }: { topic: string }) {
  const state = useStore();
  const inputField = useRef<HTMLIonTextareaElement>();

  const decodedTopic = decodeURIComponent(topic)

  const onSendMessage = () => {
    if (inputField.current) {
      const textInput = inputField.current;
      const value = textInput.value;
      if (value && value.length > 0) {
        sendMessage(topic, value);
        textInput.value = "";
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Chat about {decodedTopic}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonList lines="none">
          {(state.messages[topic] || []).map(({ author, text }, index) => {
            return (
              <IonItem key={index}>
                <b>{author}:</b>
                {text}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonCol size="11">
                <IonTextarea
                  ref={inputField as any}
                  placeholder="Enter message here"
                ></IonTextarea>
              </IonCol>
              <IonCol size="auto">
                <IonButton onClick={onSendMessage}>
                  <IonIcon icon={sendOutline}></IonIcon>
                </IonButton>
              </IonCol>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonFooter>
    </IonPage>
  );
}

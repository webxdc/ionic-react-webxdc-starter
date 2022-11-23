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
import { useEffect, useRef } from "react";
import { sendMessage, useStore } from "../store";

export default function Chat({ topicId }: { topicId: string }) {
  const state = useStore();
  const inputField = useRef<HTMLIonTextareaElement>();

  const topic = state.getTopicById(topicId)

  if (!topic) {
    return <IonPage>Topic not found</IonPage>
  }

  const onSendMessage = () => {
    if (inputField.current) {
      const textInput = inputField.current;
      const value = textInput.value;
      if (value && value.length > 0) {
        sendMessage(topic.name, value);
        textInput.value = "";
      }
    }
  };

  useEffect(() => {
    state.setNoticedTopic(topic.id);
  }, [state.messages[topic.id].length]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Chat about {topic.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonList lines="none">
          {(state.messages[topic.id] || []).map(({ author, text }, index) => {
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
            <div style={{display: "flex"}}>
              <IonTextarea
                  ref={inputField as any}
                  placeholder="Enter message here"
                  rows={1}
                ></IonTextarea>
                <IonButton onClick={onSendMessage}>
                  <IonIcon icon={sendOutline}></IonIcon>
                </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonFooter>
    </IonPage>
  );
}

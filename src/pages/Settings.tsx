import {
  IonPage,
  IonHeader,
  IonContent,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonRange,
} from "@ionic/react";

export default function Settings() {
  const mode = localStorage.getItem("mode") || "auto";

  const onChangeMode = (newMode: string) => {
    if (mode == newMode) {
      return;
    }
    switch (newMode) {
      case "md":
      case "ios":
        localStorage.setItem("mode", newMode);
        break;
      default:
        localStorage.removeItem("mode");
        break;
    }
    location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Welcome to the Settings</p>
        <IonList>
          <IonRadioGroup
            value={mode}
            onIonChange={(ev) => onChangeMode(ev.detail.value)}
          >
            <IonListHeader>
              <IonLabel>Theme Mode</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Auto</IonLabel>
              <IonRadio slot="end" value="auto"></IonRadio>
            </IonItem>

            <IonItem>
              <IonLabel>Android</IonLabel>
              <IonRadio slot="end" value="md"></IonRadio>
            </IonItem>

            <IonItem>
              <IonLabel>iOS</IonLabel>
              <IonRadio slot="end" value="ios"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>
        <IonList>
          <IonListHeader>Dummy Settings</IonListHeader>
          <IonItem>
            <IonLabel>Pointless Toggle Switch</IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Some Range</IonLabel>
            <IonRange></IonRange>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

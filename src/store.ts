import create from "zustand";

type Message = { author: string; text: string };

interface State {
  messages: { [key: string]: Message[] };
  readCounts: { [key: string]: number };
  applyWebxdcUpdate: (update: Payload) => void;
  setNoticedTopic: (topic: string) => void
}

export const useStore = create<State>((set) => ({
  messages: {},
  readCounts: {},
  applyWebxdcUpdate: (update: Payload) =>
    set((state) => {
      const { topic, author, text } = update;
      const newState = { messages: { ...state.messages } };
      if (typeof state.messages[topic] === "undefined") {
        newState.messages[topic] = [{ author, text }];
      } else {
        newState.messages[topic] = [...state.messages[topic], { author, text }];
      }
      return newState;
    }),
  setNoticedTopic: (topic: string) => set((state) => { 
    const newReadCounts = { ...state.readCounts, [topic]: state.messages[topic]?.length }
    localStorage.setItem(window.webxdc.selfAddr + "-ReadCounts", JSON.stringify(newReadCounts))
    
    return { ...state, readCounts: newReadCounts } })
}));

export async function init() {
  await window.webxdc.setUpdateListener((message) => {
    useStore.getState().applyWebxdcUpdate(message.payload);
  }, 0);

  const state = useStore.getState()
  const newReadCounts = JSON.parse(localStorage.getItem(window.webxdc.selfAddr + "-ReadCounts")||"{}")
  useStore.setState({ ...state, readCounts: newReadCounts })
}

export async function sendMessage(topic: string, text: string) {
  window.webxdc.sendUpdate(
    { payload: { author: window.webxdc.selfName, topic, text } },
    `${window.webxdc.selfName} sent a message in ${topic}: ${text}`
  );
  useStore.getState().setNoticedTopic(topic)
}

import { WebXdc } from "webxdc-types";

type Payload = Message & { topic: string };

declare global {
  interface Window {
    webxdc: WebXdc<Payload>;
  }
}

import create from "zustand";

type Message = { author: string; text: string };

interface State {
  messages: { [key: string]: Message[] };
  applyWebxdcUpdate: (update: Payload) => void;
}

export const useStore = create<State>((set) => ({
  messages: {},
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
}));

export async function init() {
  return window.webxdc.setUpdateListener((message) => {
    useStore.getState().applyWebxdcUpdate(message.payload);
  }, 0);
}

export async function sendMessage(topic: string, text: string) {
  window.webxdc.sendUpdate(
    { payload: { author: window.webxdc.selfName, topic, text } },
    `${window.webxdc.selfName} sent a message in ${topic}: ${text}`
  );
}

import { WebXdc } from "webxdc-types";

type Payload = Message & { topic: string };

declare global {
  interface Window {
    webxdc: WebXdc<Payload>;
  }
}

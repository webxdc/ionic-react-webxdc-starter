import create from "zustand";

type Message = { author: string; text: string, msgId: string };

type TopicId = string

export function topicNameToId(topic: string): TopicId {
  // btoa does not like unicode, so we convert it to uri component first
  // we convert to base64, so the thing won't produce funny bugs with the router
  return btoa(encodeURIComponent(topic))
}

type Topic = { id: TopicId, name: string }

interface State {
  messages: { [topicId: TopicId]: Message[] };
  readCounts: { [topicId: TopicId]: number };
  topics: Topic[];
  applyWebxdcUpdate: (update: Payload) => void;
  setNoticedTopic: (topic: TopicId) => void;
  getTopicById: (id: TopicId) => Topic | undefined;
}

// Keeps track of message IDs to mark them as read immediately
let ownMessageIds: string[] = []

export const useStore = create<State>((set, get) => ({
  messages: {},
  readCounts: {},
  topics: [],
  applyWebxdcUpdate: (update: Payload) =>
    set((state) => {
      const { topic, author, text, msgId } = update;
      const id = topicNameToId(topic)
      const newState = { ...state, messages: { ...state.messages } }
      // add topic if it does not exist
      if (state.topics.findIndex((topic) => topic.id === id) === -1) {
        newState.topics = [...newState.topics, { id, name: topic }]
      }
      // add messages
      if (typeof state.messages[id] === "undefined") {
        newState.messages[id] = [{ author, text, msgId }];
      } else {
        newState.messages[id] = [...state.messages[id], { author, text, msgId }];
      }
      // mark the message as read if we just sent it our
      console.log({ownMessageIds});
      
      if (ownMessageIds.indexOf(msgId) !== -1) {
        newState.readCounts[id] = 1
        localStorage.setItem(
          window.webxdc.selfAddr + "-ReadCounts",
          JSON.stringify(newState.readCounts)
        );
        ownMessageIds = ownMessageIds.filter(m => m !== msgId)
      }
      return newState;
    }),
  setNoticedTopic: (topic) =>
    set((state) => {
      const newReadCounts = {
        ...state.readCounts,
        [topic]: state.messages[topic]?.length,
      };
      localStorage.setItem(
        window.webxdc.selfAddr + "-ReadCounts",
        JSON.stringify(newReadCounts)
      );

      return { ...state, readCounts: newReadCounts };
    }),
  getTopicById: (id) => {
    return get().topics.find((topic) => topic.id === id)
  }
}));

export async function init() {
  await window.webxdc.setUpdateListener((message) => {
    useStore.getState().applyWebxdcUpdate(message.payload);
  }, 0);

  const state = useStore.getState();
  const newReadCounts = JSON.parse(
    localStorage.getItem(window.webxdc.selfAddr + "-ReadCounts") || "{}"
  );
  useStore.setState({ ...state, readCounts: newReadCounts });
}

export async function sendMessage(topic: string, text: string) {
  let msgId = `${Date.now()}.${Math.random()}`
  ownMessageIds.push(msgId)
  window.webxdc.sendUpdate(
    { payload: { author: window.webxdc.selfName, topic, text, msgId } },
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

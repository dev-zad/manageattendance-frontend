import { createApp } from 'vue';

export const eventBus = createApp({});
export const EventBus = eventBus;

const bus = eventBus.config.globalProperties;

export default bus;

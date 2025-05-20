export const EventType = {
  LOGIN: 'login',
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

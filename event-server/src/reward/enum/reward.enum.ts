export const RewardType = {
  POINT: 'point',
} as const;

export type RewardType = (typeof RewardType)[keyof typeof RewardType];

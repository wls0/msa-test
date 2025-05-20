export const RewardRequestStatus = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CLAIMED: 'claimed',
} as const;

export type RewardRequestStatus = (typeof RewardRequestStatus)[keyof typeof RewardRequestStatus];

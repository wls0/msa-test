export const RoleType = {
  USER: 'user',
  OPERATOR: 'operator',
  AUDITOR: 'auditor',
  ADMIN: 'admin',
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

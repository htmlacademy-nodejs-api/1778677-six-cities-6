export const UserType = {
  Pro: 'Pro',
  Regular: 'Regular'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

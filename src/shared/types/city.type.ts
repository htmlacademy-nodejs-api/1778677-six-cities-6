const City = {
  Hamburg: 'Hamburg',
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Dusseldorf: 'Dusseldorf'
} as const;

export type City = typeof City[keyof typeof City];

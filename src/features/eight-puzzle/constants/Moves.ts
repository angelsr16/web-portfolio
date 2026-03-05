export const Moves = { U: -3, D: 3, L: -1, R: 1 } as const;
export type Move = keyof typeof Moves;

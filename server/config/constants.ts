import { Direction, PlateauSize } from "../types/types";

export const directions: Direction[] = ['N', 'E', 'S', 'W'];

export const moves: Record<Direction, PlateauSize> = {
    'N': { x: 0, y: 1 },
    'E': { x: 1, y: 0 },
    'S': { x: 0, y: -1 },
    'W': { x: -1, y: 0 },
};
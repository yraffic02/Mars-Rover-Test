export type Direction = 'N' | 'E' | 'S' | 'W';

export type Position = {
  x: number;
  y: number;
  direction: Direction;
};

export type PlateauSize = {
  x: number;
  y: number;
};
import { Point } from 'types/mineScheme';

export const projectCoords = ({ x, y, z }: Point): Point => ({
  x: x / 100,
  y: z / 10,
  z: y / 100,
});

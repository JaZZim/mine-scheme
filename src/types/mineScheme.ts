export type Point = {
  x: number;
  y: number;
  z: number;
};

export type Node = {
  id: string;
  point: Point;
  linkedNodes: string[];
  lifetime: number;
  type: number;
};

export type MineScheme = {
  id: string;
  title: string;
  created: string;
  updated: string;
  nodes: Node[];
};

export type MineSchemeInfo = Omit<MineScheme, 'nodes'>;

export type MineSchemeBoundingInfo = {
  center: Point,
  maximum: Point,
  minimum: Point
};

export interface ExcavationType {
  name: string;
  startPoint: Point;
  endPoint: Point;
}

import { MineSchemeBoundingInfo, Node, Point } from 'types/mineScheme';
import { projectCoords } from 'utils/coordinateSystem';

const getLimitsOfAxis = (nodes: Node[], axis: keyof Point) => {
  const axisRange = nodes.map(({ point }) => point[axis]);
  return { min: Math.min(...axisRange), max: Math.max(...axisRange) };
};

export const getBoundingInfoOfMine = (nodes: Node[]): MineSchemeBoundingInfo => {
  const { min: minX, max: maxX } = getLimitsOfAxis(nodes, 'x');
  const { min: minY, max: maxY } = getLimitsOfAxis(nodes, 'y');
  const { min: minZ, max: maxZ } = getLimitsOfAxis(nodes, 'z');

  return {
    center: projectCoords({
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      z: (minZ + maxZ) / 2,
    }),
    minimum: projectCoords({
      x: minX,
      y: minY,
      z: minZ,
    }),
    maximum: projectCoords({
      x: maxX,
      y: maxY,
      z: maxZ,
    }),
  };
};

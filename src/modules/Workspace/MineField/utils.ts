import { ExcavationType, Node, Point } from 'types/mineScheme';
import { projectCoords } from 'utils/coordinateSystem';
import { ExcavationsDeeps, PairOfTwoId } from './types';

const convertNodesToPointsDict = (nodes: Node[] | undefined = []) => (
  nodes.reduce<Record<string, Point>>((acc, node) => ({ ...acc, [node.id]: projectCoords(node.point) }), {})
);

const getDeeps = (nodes: Node[] | undefined = []) => (
  nodes.reduce<ExcavationsDeeps>((acc, node) => [...acc, [node.id, node.linkedNodes]], [])
);

const isEqualArraysOfId = (first: string[], second: string[]) => (
  first.every((node) => second.includes(node))
);

const isIncludesArrayOfId = (pairs: string[][], pair: string[]) => (
  pairs.some((item) => isEqualArraysOfId(item, pair))
);

export const convertNodesToExcavations = (nodes?: Node[]): ExcavationType[] => {
  const deeps = getDeeps(nodes);
  const points = convertNodesToPointsDict(nodes);
  return deeps
    .flatMap(([nodeId, deepsOfNode]): PairOfTwoId[] => deepsOfNode.map((deepId) => [nodeId, deepId]))
    .reduce<PairOfTwoId[]>((acc, pairIds) => (!isIncludesArrayOfId(acc, pairIds) ? [...acc, pairIds] : acc), [])
    .map(([startNodeId, endNodeId]) => ({
      name: `${startNodeId}:${endNodeId}`,
      startPoint: points[startNodeId],
      endPoint: points[endNodeId],
    }));
};

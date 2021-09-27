import React, { FC, useMemo } from 'react';
import { useAppSelector } from 'store';
import { schemeSelector } from 'store/reducers/scheme';
import { Excavation } from '../Excavation';
import { convertNodesToExcavations } from './utils';

export const MineField: FC = () => {
  const { nodes } = useAppSelector(schemeSelector);

  return useMemo(() => {
    const excavationsPoints = convertNodesToExcavations(nodes);
    return (
      <>
        {excavationsPoints.map((excavation) => (
          <Excavation key={excavation.name} {...excavation} />
        ))}
      </>
    );
  }, [nodes]);
};

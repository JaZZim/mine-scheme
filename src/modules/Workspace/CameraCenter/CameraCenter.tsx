import { FC, useEffect } from 'react';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core';
import { useAppSelector } from 'store';
import { schemeSelector } from 'store/reducers/scheme';
import { useScene } from '../MineScene';
import { axisColors } from './consts';

export const CameraCenter: FC = () => {
  const scene = useScene();
  const { boundingInfo } = useAppSelector(schemeSelector);

  useEffect(() => {
    if (!scene) return;

    const centerVector = new Vector3(boundingInfo?.center.x, boundingInfo?.center.y, boundingInfo?.center.z);

    const lines = [
      [
        centerVector,
        centerVector.add(Vector3.Forward()),
      ],
      [
        centerVector,
        centerVector.add(Vector3.Up()),
      ],
      [
        centerVector,
        centerVector.add(Vector3.Right()),
      ],
    ];

    const lineSystem = MeshBuilder.CreateLineSystem('CameraCenter', { lines, colors: axisColors }, scene);

    return () => {
      lineSystem.dispose();
    };
  }, [scene, boundingInfo]);

  return null;
};

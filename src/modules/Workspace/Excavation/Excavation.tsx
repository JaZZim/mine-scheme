import { FC, useEffect } from 'react';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core';
import { ExcavationType } from 'types/mineScheme';
import { getRandomGradientMaterial } from './utils';
import { useScene } from '../MineScene';

export const Excavation: FC<ExcavationType> = ({ name, startPoint, endPoint }) => {
  const scene = useScene();

  useEffect(() => {
    if (!scene) return;

    const startVector = new Vector3(startPoint.x, startPoint.y, startPoint.z);
    const endVector = new Vector3(endPoint.x, endPoint.y, endPoint.z);
    const distance = Vector3.Distance(startVector, endVector);

    const box = MeshBuilder.CreateBox(name, {
      width: 0.1,
      height: 0.1,
      depth: distance,
    }, scene);

    box.position = Vector3.Center(startVector, endVector);
    box.lookAt(endVector);
    box.material = getRandomGradientMaterial(scene, name);

    return () => {
      box.dispose();
    };
  }, [scene, name, startPoint, endPoint]);

  return null;
};

import { FC, useEffect, useState } from 'react';
import { ArcRotateCamera, Mesh, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { useAppSelector } from 'store';
import { schemeSelector } from 'store/reducers/scheme';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { useCanvas, useScene } from '../MineScene';

export const MainCamera: FC = () => {
  const scene = useScene();
  const canvas = useCanvas();
  const { boundingInfo, isShowBoundingBox } = useAppSelector(schemeSelector);
  const [currentBoundingBox, setCurrentBoundingBox] = useState<Mesh>();

  useEffect(() => {
    if (!scene) {
      // eslint-disable-next-line no-console
      console.warn('Cannot create camera. Scene not ready');
      return;
    }

    const widthBoundingBox = boundingInfo ? boundingInfo?.maximum.x - boundingInfo?.minimum.x : 5;
    const heightBoundingBox = boundingInfo ? boundingInfo?.maximum.y - boundingInfo?.minimum.y : 5;
    const depthBoundingBox = boundingInfo ? boundingInfo?.maximum.z - boundingInfo?.minimum.z : 5;

    const centerVector = new Vector3(boundingInfo?.center.x, boundingInfo?.center.y, boundingInfo?.center.z);

    const boundingBox = MeshBuilder.CreateBox('boundingBox', { width: widthBoundingBox, height: heightBoundingBox, depth: depthBoundingBox }, scene);
    boundingBox.setEnabled(false);
    boundingBox.position = centerVector;
    boundingBox.enableEdgesRendering();
    boundingBox.edgesColor = Color4.FromColor3(Color3.Black());
    setCurrentBoundingBox(boundingBox);

    const materialBox = new StandardMaterial('transparent', scene);
    boundingBox.material = materialBox;
    materialBox.alpha = 0.2;

    const camera = new ArcRotateCamera('mainCamera', Math.PI / -5, Math.PI / 3, 5, centerVector, scene);
    camera.attachControl(canvas, true);
    camera.parent = boundingBox;
    camera.zoomOn([boundingBox]);

    return () => {
      camera.dispose();
      boundingBox.dispose();
    };
  }, [scene, canvas, boundingInfo]);

  useEffect(() => {
    if (currentBoundingBox) {
      currentBoundingBox.setEnabled(isShowBoundingBox);
    }
  }, [currentBoundingBox, isShowBoundingBox]);

  return null;
};

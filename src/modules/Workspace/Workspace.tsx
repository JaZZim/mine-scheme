import React, { FC } from 'react';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { MineScene } from 'modules/Workspace/MineScene';
import { HemisphericLight, Scene } from '@babylonjs/core';
import { CameraCenter } from 'modules/Workspace/CameraCenter';
import { MainCamera } from 'modules/Workspace/MainCamera/MainCamera';
import { MineField } from './MineField';

const onSceneReady = (scene: Scene) => {
  scene.clearColor = Color4.FromColor3(Color3.White());

  const light = new HemisphericLight('mainLight', Vector3.Backward(), scene);
  light.groundColor = Color3.White();
  light.intensity = 0.8;
};

export const Workspace: FC = () => (
  <MineScene canvasId="babylon-js'" adaptToDeviceRatio onSceneReady={onSceneReady}>
    <CameraCenter />
    <MainCamera />
    <MineField />
  </MineScene>
);

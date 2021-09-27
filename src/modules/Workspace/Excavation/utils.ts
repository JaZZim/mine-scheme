import { GradientMaterial } from '@babylonjs/materials';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Scene } from '@babylonjs/core';

export const getRandomGradientMaterial = (scene: Scene, name: string): GradientMaterial => {
  const material = new GradientMaterial(`gradient-${name}`, scene);
  material.topColor = Color3.Random();
  material.bottomColor = Color3.Random();
  material.scale = 5;
  return material;
};

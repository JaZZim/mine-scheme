import React, { FC, useEffect, useRef, useState } from 'react';
import { Engine, EngineOptions, Nullable, Scene, SceneOptions } from '@babylonjs/core';
import { SceneContext, SceneContextType } from './SceneCtx';
import { EngineCanvasContext, EngineCanvasContextType } from './EngineCtx';

export interface MineSceneProps {
  canvasId: string;
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  children?: React.ReactNode;
}

export const MineScene: FC<MineSceneProps> = (props: MineSceneProps) => {
  const reactCanvas = useRef<Nullable<HTMLCanvasElement>>(null);
  const {
    canvasId,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    renderChildrenWhenReady,
    children,
    ...rest
  } = props;

  const [sceneContext, setSceneContext] = useState<SceneContextType>({
    scene: null,
    sceneReady: false,
  });

  const [engineContext, setEngineContext] = useState<EngineCanvasContextType>({
    engine: null,
    canvas: null,
  });

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      setEngineContext(() => ({
        engine,
        canvas: reactCanvas.current,
      }));

      const scene = new Scene(engine, sceneOptions);
      const sceneIsReady = scene.isReady();
      if (sceneIsReady) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((mineScene) => {
          onSceneReady(mineScene);
          setSceneContext(() => ({
            scene,
            sceneReady: true,
          }));
        });
      }

      engine.runRenderLoop(() => {
        if (scene.activeCamera) {
          if (typeof onRender === 'function') {
            onRender(scene);
          }
          scene.render();
        } else {
          // eslint-disable-next-line no-console
          console.warn('no active camera..');
        }
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }

      setSceneContext(() => ({
        scene,
        sceneReady: sceneIsReady,
      }));

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, reactCanvas]);

  return (
    <>
      <canvas ref={reactCanvas} style={{ width: '100%', height: '100%', outline: 'none' }} id={canvasId} {...rest} />
      <EngineCanvasContext.Provider value={engineContext}>
        <SceneContext.Provider value={sceneContext}>
          {(!renderChildrenWhenReady || (renderChildrenWhenReady && sceneContext.sceneReady)) && children}
        </SceneContext.Provider>
      </EngineCanvasContext.Provider>
    </>
  );
};

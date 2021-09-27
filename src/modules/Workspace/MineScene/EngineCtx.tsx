import { createContext, useContext } from 'react';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Nullable } from '@babylonjs/core/types';

export type EngineCanvasContextType = {
  engine: Nullable<Engine>;
  canvas: Nullable<HTMLCanvasElement | WebGLRenderingContext>;
};

export const EngineCanvasContext = createContext<EngineCanvasContextType>({
  engine: null,
  canvas: null,
});

export const useEngine = (): Nullable<Engine> => useContext(EngineCanvasContext).engine;

export const useCanvas = (): Nullable<HTMLCanvasElement | WebGLRenderingContext> => (
  useContext(EngineCanvasContext).canvas
);

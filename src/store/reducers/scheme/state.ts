import { MineSchemeBoundingInfo, MineSchemeInfo, Node } from 'types/mineScheme';

export enum SchemeStatus {
  NOT_LOADED = 'NOT_LOADED',
  LOADING = 'LOADING',
  UPLOADED = 'UPLOADED',
  ERROR = 'ERROR'
}

export interface SchemeState {
  status: SchemeStatus;
  errorMessage?: string;
  nodes?: Node[];
  info?: MineSchemeInfo;
  boundingInfo?: MineSchemeBoundingInfo;
  isShowBoundingBox: boolean;
}

export const initialState: SchemeState = {
  status: SchemeStatus.NOT_LOADED,
  isShowBoundingBox: false,
};

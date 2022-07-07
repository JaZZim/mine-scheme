import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MineScheme,
  MineSchemeBoundingInfo,
  Node,
  MineSchemeInfo,
} from 'types/mineScheme';
import { RootState } from 'store/index';
import { readFile } from 'utils/readFile';
import { getBoundingInfoOfMine } from './utils';
import { initialState, SchemeState, SchemeStatus } from './state';

export const uploadMineScheme = createAsyncThunk(
  'scheme/uploadMineScheme',
  async (file: File) => {
    const fileContent = await readFile(file);
    if (typeof fileContent === 'string') {
      // In the current implementation, we believe that json is always valid
      return JSON.parse(fileContent) as MineScheme;
    }
    throw new Error(
      'File content is not in the correct format or the file is empty',
    );
  },
);

export const schemeSlice = createSlice({
  name: 'scheme',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[] | undefined>) => {
      state.nodes = action.payload;
    },
    setInfo: (state, action: PayloadAction<MineSchemeInfo | undefined>) => {
      state.info = action.payload;
    },
    setBoundingInfo: (
      state,
      action: PayloadAction<MineSchemeBoundingInfo | undefined>,
    ) => {
      state.boundingInfo = action.payload;
    },
    setShowBoundingBox: (state, action: PayloadAction<boolean>) => {
      state.isShowBoundingBox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMineScheme.pending, (state) => {
        state.status = SchemeStatus.LOADING;
      })
      .addCase(uploadMineScheme.fulfilled, (state, { payload }) => {
        const { nodes, ...info } = payload as MineScheme;
        const boundingInfo = getBoundingInfoOfMine(nodes);
        state.status = SchemeStatus.UPLOADED;
        state.info = info;
        state.nodes = nodes;
        state.boundingInfo = boundingInfo;
      })
      .addCase(uploadMineScheme.rejected, (state, action) => {
        state.status = SchemeStatus.ERROR;
        // eslint-disable-next-line no-console
        console.error(action.error.message);
        state.errorMessage = action.error.message;
      });
  },
});

export const { setShowBoundingBox } = schemeSlice.actions;

export const schemeSelector = (state: RootState): SchemeState => state.scheme;

export default schemeSlice.reducer;

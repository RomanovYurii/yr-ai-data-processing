import { createSlice } from '@reduxjs/toolkit';
import { Vertice, VerticesSliceState } from './types';

const initialState: VerticesSliceState = {
  vertices: [],
  showIndexes: false,
};

export const verticesSlice = createSlice({
  name: 'vertices',
  initialState,
  reducers: {
    updateVertices: (state, action: { payload: Vertice[] }) => {
      state.vertices = action.payload;
    },
    toggleShowIndexes: (state) => {
      state.showIndexes = !state.showIndexes;
    },
  },
});

export const { updateVertices, toggleShowIndexes } = verticesSlice.actions;
export default verticesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Iteration } from '@store/data/types';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    proximityMatrix: [] as number[][],
    pheromonesMatrix: [] as number[][],
    currentIteration: [] as Iteration,
    currentIterationNumber: 0,
    bestPath: 0,
  },
  reducers: {
    updateProximityMatrix: (state, action) => {
      state.proximityMatrix = [...action.payload];
    },
    updateValueInProximityMatrix: (state, action) => {
      state.proximityMatrix[action.payload.i][action.payload.j] =
        action.payload.value;
      state.proximityMatrix[action.payload.j][action.payload.i] =
        action.payload.value;
    },
    updatePheromonesMatrix: (state, action) => {
      state.pheromonesMatrix = [...action.payload];
    },
    updateValueInPheromonesMatrix: (state, action) => {
      state.pheromonesMatrix[action.payload.i][action.payload.j] =
        action.payload.value;
      state.pheromonesMatrix[action.payload.j][action.payload.i] =
        action.payload.value;
    },
    setCurrentIterationNumber: (state, action) => {
      state.currentIterationNumber = action.payload;
    },
    setBestPath: (state, action) => {
      state.bestPath = action.payload;
    },
    updateCurrentIteration: (state, action) => {
      state.currentIteration = [...action.payload];
    },
  },
});

export const {
  setCurrentIterationNumber,
  setBestPath,
  updateProximityMatrix,
  updateValueInProximityMatrix,
  updatePheromonesMatrix,
  updateValueInPheromonesMatrix,
  updateCurrentIteration,
} = dataSlice.actions;
export default dataSlice.reducer;

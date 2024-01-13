import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config',
  initialState: {
    alpha: 4,
    attractivenessScore: 10,
    basePheromone: 0.3,
    beta: 6,
    numOfAnts: 5,
    pheromoneCoefficient: 500,
    evaporationRate: 36,
  },
  reducers: {
    setAlpha: (state, action) => {
      state.alpha = action.payload;
    },
    setAttractivenessScore: (state, action) => {
      state.attractivenessScore = action.payload;
    },
    setBasePheromone: (state, action) => {
      state.basePheromone = action.payload;
    },
    setBeta: (state, action) => {
      state.beta = action.payload;
    },
    setNumOfAnts: (state, action) => {
      state.numOfAnts = action.payload;
    },
    setPheromoneCoefficient: (state, action) => {
      state.pheromoneCoefficient = action.payload;
    },
    setEvaporationRate: (state, action) => {
      state.evaporationRate = action.payload;
    },
  },
});

export const {
  setAlpha,
  setAttractivenessScore,
  setBasePheromone,
  setBeta,
  setNumOfAnts,
  setPheromoneCoefficient,
  setEvaporationRate,
} = configSlice.actions;
export default configSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { configSlice } from '@store/config/configSlice';
import { dataSlice } from '@store/data/dataSlice';
import { verticesSlice } from '@store/vertices/verticesSlice';

export const store = configureStore({
  reducer: {
    config: configSlice.reducer,
    data: dataSlice.reducer,
    vertices: verticesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

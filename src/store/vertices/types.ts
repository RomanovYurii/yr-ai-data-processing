export type Vertice = { x: number; y: number };

export type IndexedVertice = { index: number } & Vertice;

export type VerticesSliceState = {
  vertices: Vertice[];
  showIndexes: boolean;
};

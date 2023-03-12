import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { getPuzzle, getSolution } from './Actions';
import { ReduxActionType } from './types';

export type Sudoku = {
  puzzle: number[][];
  solution: number[][];
};

const initialState: Sudoku = {
  puzzle: [],
  solution: [],
};

export default createReducer<Sudoku, ReduxActionType>(initialState)
  .handleAction(getPuzzle, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.puzzle = payload.matrix9x9;
    });
  })
  .handleAction(getSolution, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.solution = payload.matrix9x9;
    });
  });

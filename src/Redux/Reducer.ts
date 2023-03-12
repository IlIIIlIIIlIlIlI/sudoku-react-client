import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { getElementAtFocusedInput, getPuzzle, getSolution } from './Actions';
import { ReduxActionType } from './types';

export type Sudoku = {
  puzzle: number[][];
  solution: number[][];
  focusedValue: number | string | null;
};

const initialState: Sudoku = {
  puzzle: [],
  solution: [],
  focusedValue: null,
};

export default createReducer<Sudoku, ReduxActionType>(initialState)
  .handleAction(getPuzzle, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.puzzle = payload.matrix9x9;
    });
  })
  .handleAction(getElementAtFocusedInput, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.focusedValue = payload.focused;
    });
  })
  .handleAction(getSolution, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.solution = payload.matrix9x9;
    });
  });

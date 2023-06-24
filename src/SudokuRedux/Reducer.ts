import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { ReduxActionType, Sudoku } from './types';
import { setMatrix, setPuzzleMatrix, toggleLoadingSpinner } from './actions';
import { createBlankMatrix } from '../Utility/SudokuUtils';

const initialState: Sudoku = {
  puzzleMatrix: createBlankMatrix(),
  matrix9x9: createBlankMatrix(),
  isSudokuBeingCalculated: false,
};

export default createReducer<Sudoku, ReduxActionType>(initialState)
  .handleAction(setMatrix, (state, { payload: { matrix9x9 } }) => {
    return produce(state, (draft) => {
      draft.matrix9x9 = matrix9x9;
    });
  })
  .handleAction(setPuzzleMatrix, (state, { payload: { matrix9x9 } }) => {
    return produce(state, (draft) => {
      draft.puzzleMatrix = matrix9x9;
    });
  })
  .handleAction(toggleLoadingSpinner, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.isSudokuBeingCalculated = payload;
    });
  });

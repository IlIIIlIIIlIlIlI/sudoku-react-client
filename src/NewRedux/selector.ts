import { SudokuSuperState } from '../store';

export const selectSudokuState = (state: SudokuSuperState) =>
  state.inbuiltSolver;

export const selectMatrix9x9 = (state: SudokuSuperState) =>
  selectSudokuState(state).matrix9x9;

export const selectIsSudokuBeingCalculated = (state: SudokuSuperState) =>
  selectSudokuState(state).isSudokuBeingCalculated;

export const selectPuzzleMatrix = (state: SudokuSuperState) =>
  selectSudokuState(state).puzzleMatrix;

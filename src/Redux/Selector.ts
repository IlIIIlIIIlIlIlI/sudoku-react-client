import { SudokuSuperState } from '../store';

export const selectSudokuState = (state: SudokuSuperState) => state.sudoku;

export const selectPuzzle = (state: SudokuSuperState) =>
  selectSudokuState(state).puzzle;

export const selectSolution = (state: SudokuSuperState) =>
  selectSudokuState(state).solution;

export const selectElementAtFocusedElement = (state: SudokuSuperState) =>
  selectSudokuState(state).focusedValue;

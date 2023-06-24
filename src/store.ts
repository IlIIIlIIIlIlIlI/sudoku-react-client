import { combineReducers, createStore } from 'redux';
import SudokuReducer from './Redux';
import { Sudoku } from './Redux/Reducer';
import sudokuReducer from './NewRedux';
import { Sudoku as NewSudokuTYpe } from './NewRedux';

export type SudokuSuperState = {
  sudoku: Sudoku;
  inbuiltSolver: NewSudokuTYpe;
};

export const rootReducer = combineReducers<SudokuSuperState>({
  sudoku: SudokuReducer,
  inbuiltSolver: sudokuReducer,
});

export const store = createStore(rootReducer);

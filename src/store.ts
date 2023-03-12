import { combineReducers, createStore } from 'redux';
import SudokuReducer from './Redux';
import { Sudoku } from './Redux/Reducer';

export type SudokuSuperState = {
  sudoku: Sudoku;
};

export const rootReducer = combineReducers<SudokuSuperState>({
  sudoku: SudokuReducer,
});

export const store = createStore(rootReducer);

import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import SudokuReducer from './Redux';
import { Sudoku } from './Redux/Reducer';
import { Sudoku as NewSudokuTYpe } from './NewRedux';
import sudokuReducer from './NewRedux/reducer';

import rootSaga from './rootSaga';

export type SudokuSuperState = {
  sudoku: Sudoku;
  inbuiltSolver: NewSudokuTYpe;
};

const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers<SudokuSuperState>({
  sudoku: SudokuReducer,
  inbuiltSolver: sudokuReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

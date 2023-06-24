import { all, fork } from 'redux-saga/effects';
import { sudokuSaga } from './SudokuRedux/saga';

function* rootSaga() {
  yield all([fork(sudokuSaga)]);
}

export default rootSaga;

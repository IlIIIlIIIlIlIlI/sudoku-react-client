import { all, fork } from 'redux-saga/effects';
import { sudokuSaga } from './NewRedux/saga';

function* rootSaga() {
  yield all([fork(sudokuSaga)]);
}

export default rootSaga;

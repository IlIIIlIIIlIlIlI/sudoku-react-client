import { SagaIterator } from 'redux-saga';
import {
  SagaReturnType,
  call,
  delay,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  setMatrix,
  setPuzzleMatrix,
  solveBottomCenterMatrix,
  solveBottomLeftMatrix,
  solveMiddleLeftMatrix,
  solveMiddleRightMatrix,
  solveTopCentreMatrix,
  solveTopRightMatrix,
  startSolvingDiagonalMatrices,
  startSolvingMatrixFromScrach,
  toggleLoadingSpinner,
} from './Actions';
import {
  calculateNonDiagonalMatrix,
  createOnlyDiagonalMatrices,
  sudokuHider,
} from '../Utility/SudokuUtils';
import { selectMatrix9x9 } from './selector';

function* watchStartSolvingDiagonalMatrices(
  action: ReturnType<typeof startSolvingDiagonalMatrices>
): SagaIterator<void> {
  yield put(toggleLoadingSpinner(true));
  yield delay(1000);
  yield put(startSolvingMatrixFromScrach(action.payload));
}

function* watchStartSolvingMatrixFromScrach(
  action: ReturnType<typeof startSolvingMatrixFromScrach>
): SagaIterator<void> {
  yield put(setMatrix({ matrix9x9: createOnlyDiagonalMatrices() }));
  yield put(solveTopCentreMatrix(action.payload));
}

function* watchSolveTopCenterMatrix(
  action: ReturnType<typeof solveTopCentreMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const topCenterMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      0,
      3
    );

    yield put(setMatrix({ matrix9x9: topCenterMatrix }));

    yield put(solveTopRightMatrix(action.payload));
  } catch (e) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

function* watchSolveTopRightMatrix(
  action: ReturnType<typeof solveTopRightMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const topRightMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      0,
      6
    );

    yield put(setMatrix({ matrix9x9: topRightMatrix }));
    yield put(solveMiddleLeftMatrix(action.payload));
  } catch (e) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

function* watchSolveMiddleLeftMatrix(
  action: ReturnType<typeof solveMiddleLeftMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const middleLeftMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      3,
      0
    );

    yield put(setMatrix({ matrix9x9: middleLeftMatrix }));

    yield put(solveMiddleRightMatrix(action.payload));
  } catch (e) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

function* watchSolveMiddleRightMatrix(
  action: ReturnType<typeof solveMiddleRightMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const middleRightMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      3,
      6
    );

    yield put(setMatrix({ matrix9x9: middleRightMatrix }));
    yield put(solveBottomLeftMatrix(action.payload));
  } catch (error) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

function* watchSolveBottomLeftMatrix(
  action: ReturnType<typeof solveBottomLeftMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const bottomLeftMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      6,
      0
    );

    yield put(setMatrix({ matrix9x9: bottomLeftMatrix }));
    yield put(solveBottomCenterMatrix(action.payload));
  } catch (error) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

function* watchSolveBottomCenterMatrix(
  action: ReturnType<typeof solveBottomCenterMatrix>
): SagaIterator<void> {
  try {
    const matrixSolvedSoFar: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const bottomCenterMatrix = yield call(
      calculateNonDiagonalMatrix,
      matrixSolvedSoFar,
      6,
      3
    );
    yield put(setMatrix({ matrix9x9: bottomCenterMatrix }));
    yield put(toggleLoadingSpinner(false));

    const sudokuCompletelySolved: SagaReturnType<typeof selectMatrix9x9> =
      yield select(selectMatrix9x9);

    const sudokuPuzzle: SagaReturnType<typeof sudokuHider> = yield call(
      sudokuHider,
      sudokuCompletelySolved,
      action.payload
    );

    yield put(setPuzzleMatrix({ matrix9x9: sudokuPuzzle }));
  } catch (error) {
    yield put(startSolvingMatrixFromScrach(action.payload));
  }
}

export function* sudokuSaga(): SagaIterator<void> {
  yield takeLatest(
    startSolvingDiagonalMatrices,
    watchStartSolvingDiagonalMatrices
  );

  yield takeLatest(
    startSolvingMatrixFromScrach,
    watchStartSolvingMatrixFromScrach
  );

  yield takeLatest(solveTopCentreMatrix, watchSolveTopCenterMatrix);

  yield takeLatest(solveTopRightMatrix, watchSolveTopRightMatrix);

  yield takeLatest(solveMiddleLeftMatrix, watchSolveMiddleLeftMatrix);

  yield takeLatest(solveMiddleRightMatrix, watchSolveMiddleRightMatrix);

  yield takeLatest(solveBottomLeftMatrix, watchSolveBottomLeftMatrix);

  yield takeLatest(solveBottomCenterMatrix, watchSolveBottomCenterMatrix);
}

import { createAction } from 'typesafe-actions';
import { HardnessLevel } from '../Utility/SudokuUtils';

export const startSolvingMatrixFromScrach = createAction(
  'START_SOLVING_MATRIX_FROM_SCRACH',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const setMatrix = createAction(
  'SET_MATRIX_9X9',
  (action) => (payload: { matrix9x9: number[][] }) => action(payload)
);

export const setPuzzleMatrix = createAction(
  'SET_PUZZLE_MATRIX_9X9',
  (action) => (payload: { matrix9x9: number[][] }) => action(payload)
);

export const startSolvingDiagonalMatrices = createAction(
  'START_SOLVING_DIAGONAL_MATRICES',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveTopCentreMatrix = createAction(
  'SOLVE_TOP_CENTER_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveTopRightMatrix = createAction(
  'SOLVE_TOP_RIGHT_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveMiddleLeftMatrix = createAction(
  'SOLVE_MIDDLE_LEFT_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveMiddleRightMatrix = createAction(
  'SOLVE_MIDDLE_RIGHT_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveBottomLeftMatrix = createAction(
  'SOLVE_BOTTOM_LEFT_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const solveBottomCenterMatrix = createAction(
  'SOLVE_BOTTOM_CENTER_MATRIX',
  (action) => (payload: HardnessLevel) => action(payload)
);

export const toggleLoadingSpinner = createAction(
  'TOGGLE_LOADING_SPINNER',
  (action) => (payload: boolean) => action(payload)
);

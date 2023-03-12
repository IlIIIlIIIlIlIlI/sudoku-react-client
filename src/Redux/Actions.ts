import { createAction } from 'typesafe-actions';

export const getPuzzle = createAction(
  'GET_PUZZLE',
  (action) => (payload: { matrix9x9: number[][] }) => action(payload)
);

export const getSolution = createAction(
  'GET_SOLUTION',
  (action) => (payload: { matrix9x9: number[][] }) => action(payload)
);

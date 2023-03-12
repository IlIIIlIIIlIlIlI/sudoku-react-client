import { ActionType } from 'typesafe-actions';
import { getPuzzle, getSolution } from './Actions';

export type ReduxActionType =
  | ActionType<typeof getPuzzle>
  | ActionType<typeof getSolution>;

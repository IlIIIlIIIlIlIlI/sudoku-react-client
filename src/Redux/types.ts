import { ActionType } from 'typesafe-actions';
import { getElementAtFocusedInput, getPuzzle, getSolution } from './Actions';

export type ReduxActionType =
  | ActionType<typeof getPuzzle>
  | ActionType<typeof getElementAtFocusedInput>
  | ActionType<typeof getSolution>;

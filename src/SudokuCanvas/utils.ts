import { element } from 'prop-types';

export const checkIfAllNumbersFilled = (matrix: number[][]) => {
  for (let i = 0; i < 9; i++) {
    const rowContent = new Set<number>(
      Array.from(matrix[i].filter((element) => Number(element) > 0))
    );
    if (rowContent.size < 9) return false;
  }
  return true;
};

export const checkIfAllErrorsAreResolved = (
  matrix?: boolean[][] | string | string[] | (string | undefined)[][] | any
) => {
  if (matrix === undefined) return true;
  for (let i = 0; i < 9; i++) {
    if (matrix[i].includes(true)) {
      return false;
    }
  }
  return true;
};

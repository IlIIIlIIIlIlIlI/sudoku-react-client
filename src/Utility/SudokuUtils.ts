export const createBlankArray = () => {
  return new Array(9).fill(0);
};

/**
 *  Create 9x9 blank matrix
 */
export const createBlankMatrix = () => {
  const matrix: number[][] = [];

  for (let i = 0; i < 9; i++) {
    matrix.push(createBlankArray());
  }

  return matrix;
};

export const randomNumberGenerator = (lenght: number) => {
  return Math.floor(Math.random() * lenght);
};

export const selectRandomNumberFromSet = (numberSet: Set<number>) => {
  const numberArray = Array.from(numberSet);
  const randomIndex = randomNumberGenerator(numberArray.length);

  return numberArray[randomIndex];
};

/**
 * Set of number from 1 to 9
 */
export const setOfAllNumbers = Array.from({ length: 9 }, (_, i) => i + 1);

/**
 * Set of number from 0 to 8
 */
export const setOfAllIndices = Array.from({ length: 9 }, (_, i) => i);

/**
 * Create 3x3 random diagonal matrix
 */
export const create3by3RandomMatrix = () => {
  const numbersToBeAdded = new Set<number>(setOfAllNumbers);

  const matrix3x3: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const numberArray: number[] = [];

    for (let j = 0; j < 3; j++) {
      const randomNumberSelected = selectRandomNumberFromSet(numbersToBeAdded);
      numberArray.push(randomNumberSelected);

      numbersToBeAdded.delete(randomNumberSelected);
    }

    matrix3x3.push(numberArray);
  }

  return matrix3x3;
};

export const matrixMapper = (
  parentMatric: number[][],
  childMatrix: number[][],
  horizontalIndex: number,
  verticalIndex: number
) => {
  const blankMatrix = createBlankMatrix();

  /**
   * Parent Mapper
   */
  for (let i = 0; i < blankMatrix.length; i++) {
    for (let j = 0; j < blankMatrix.length; j++) {
      blankMatrix[i][j] = parentMatric[i][j];
    }
  }

  /**
   * Child mapper
   */
  for (let i = horizontalIndex; i < horizontalIndex + 3; i++) {
    for (let j = verticalIndex; j < verticalIndex + 3; j++) {
      blankMatrix[i][j] = childMatrix[i % 3][j % 3];
    }
  }

  return blankMatrix;
};

export const createOnlyDiagonalMatrices = () => {
  const topLeftDiagonalMatrix = create3by3RandomMatrix();
  const middleCentreDiagonalMatrix = create3by3RandomMatrix();
  const bottomRightDiagonalMatrix = create3by3RandomMatrix();

  let resultMatrix = matrixMapper(
    createBlankMatrix(),
    topLeftDiagonalMatrix,
    0,
    0
  );

  resultMatrix = matrixMapper(resultMatrix, middleCentreDiagonalMatrix, 3, 3);

  return matrixMapper(resultMatrix, bottomRightDiagonalMatrix, 6, 6);
};

export const getHorizontalRowElements = (
  parentMatrix: number[][],
  horizontalIndex: number
) => {
  return parentMatrix[horizontalIndex].filter((value) => !!value);
};

export const getVertcalColumnElements = (
  parentMatrix: number[][],
  verticalIndex: number
) => {
  return parentMatrix
    .map((row) => row[verticalIndex])
    .filter((element) => !!element);
};

export const calculateNonDiagonalMatrix = (
  parentMatrix: number[][],
  horizontalIndex: number,
  verticalIndex: number
) => {
  try {
    const numbersToBeAdded = new Set<number>(setOfAllNumbers);

    const childMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    for (let i = horizontalIndex; i < horizontalIndex + 3; i++) {
      for (let j = verticalIndex; j < verticalIndex + 3; j++) {
        const rowElements = getHorizontalRowElements(parentMatrix, i);
        const columnELements = getVertcalColumnElements(parentMatrix, j);

        const outSideCrossHairElements = Array.from(
          new Set<number>([...rowElements, ...columnELements])
        );

        const elementsPlaceble = Array.from(numbersToBeAdded).filter(
          (elements) => !outSideCrossHairElements.includes(elements)
        );

        const randomlySelectedNumber = selectRandomNumberFromSet(
          new Set<number>(elementsPlaceble)
        );

        if (randomlySelectedNumber) {
          numbersToBeAdded.delete(randomlySelectedNumber);

          childMatrix[i % 3][j % 3] = randomlySelectedNumber;
        } else {
          throw Error;
        }
      }
    }

    return matrixMapper(
      parentMatrix,
      childMatrix,
      horizontalIndex,
      verticalIndex
    );
  } catch (e) {
    throw e;
  }
};

export enum HardnessLevel {
  CHILD = 'CHILD',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
  EVIL = 'EVIL',
  SOLUTION = 'SOLUTION',
}

export const hardnessMap = new Map<HardnessLevel, number[]>([
  [HardnessLevel.CHILD, [1]],
  [HardnessLevel.EASY, [1, 2]],
  [HardnessLevel.MEDIUM, [2, 3, 4]],
  [HardnessLevel.HARD, [4, 5]],
  [HardnessLevel.EXPERT, [5, 6]],
  [HardnessLevel.EVIL, [6, 7]],
  [HardnessLevel.SOLUTION, []],
]);

/**
 * Get n random from x lengthed array,
 * If 1 is passed to 5 element arrty then it would give 1 random from that array
 */
export const getNRandomNumbersFromArray = (randomNumbers: number) => {
  const indicesList = new Set<number>(setOfAllIndices);

  const randomIndicesList: number[] = [];
  for (let i = 0; i < randomNumbers; i++) {
    const randomIndexInRow = selectRandomNumberFromSet(indicesList);

    indicesList.delete(randomIndexInRow);
    randomIndicesList.push(randomIndexInRow);
  }

  return randomIndicesList;
};

export const sudokuHider = (parentMatrix: number[][], level: HardnessLevel) => {
  if (level === HardnessLevel.SOLUTION) {
    return parentMatrix;
  }

  const numberOfPlacesToBeHidden = hardnessMap.get(level)!;
  const blankMatrix = createBlankMatrix();

  /**
   * Parent Mapper
   */
  for (let i = 0; i < blankMatrix.length; i++) {
    for (let j = 0; j < blankMatrix.length; j++) {
      blankMatrix[i][j] = parentMatrix[i][j];
    }
  }

  for (let i = 0; i < blankMatrix.length; i++) {
    const randomNumberOfHiddenPlacesIndex = randomNumberGenerator(
      numberOfPlacesToBeHidden.length
    );

    const randomNumberOfHiddenPlaces =
      numberOfPlacesToBeHidden[randomNumberOfHiddenPlacesIndex];

    const indicesOfPlacesToBeHidden = getNRandomNumbersFromArray(
      randomNumberOfHiddenPlaces
    );

    indicesOfPlacesToBeHidden.forEach((index) => {
      blankMatrix[i][index] = 0;
    });
  }

  return blankMatrix;
};

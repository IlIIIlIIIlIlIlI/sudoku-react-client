import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import SudokuCanvas from '../SudokuCanvas';
import scssObj from './_Sudoku.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { FaGithub } from 'react-icons/fa';
import {
  selectIsSudokuBeingCalculated,
  selectPuzzleMatrix,
  startSolvingDiagonalMatrices,
} from '../NewRedux';
import { HardnessLevel } from '../Utility/SudokuUtils';

const arrowButtonsEventKey = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

function Sudoku() {
  const dispatch = useDispatch();
  const selectedPuzzle = useSelector(selectPuzzleMatrix);
  const isPuzzleLoading = useSelector(selectIsSudokuBeingCalculated);

  const [isCalledInitially, setIsCalledInitially] = useState(true);
  const [horizontalIndex, setHorizontalIndex] = useState<number>(0);
  const [verticalIndex, setVerticalIndex] = useState<number>(0);
  const [focus, setFocus] = useState(
    `matrix[${horizontalIndex}][${verticalIndex}]`
  );

  if (isCalledInitially) {
    dispatch(startSolvingDiagonalMatrices(HardnessLevel.CHILD));
    setIsCalledInitially(false);
  }

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (arrowButtonsEventKey.includes(event.key as string)) {
        const eventKey: string = event.key;

        if (eventKey === 'ArrowLeft') {
          setVerticalIndex((verticalIndex) => {
            if (verticalIndex === 0) return verticalIndex;
            setFocus(`matrix[${horizontalIndex}][${verticalIndex - 1}]`);
            return verticalIndex - 1;
          });
        } else if (eventKey === 'ArrowRight') {
          setVerticalIndex((verticalIndex) => {
            if (verticalIndex === 8) return verticalIndex;
            setFocus(`matrix[${horizontalIndex}][${verticalIndex + 1}]`);
            return verticalIndex + 1;
          });
        } else if (eventKey === 'ArrowUp') {
          setHorizontalIndex((horizontalIndex) => {
            if (horizontalIndex === 0) return horizontalIndex;
            setFocus(`matrix[${horizontalIndex - 1}][${verticalIndex}]`);
            return horizontalIndex - 1;
          });
        } else {
          setHorizontalIndex((horizontalIndex) => {
            if (horizontalIndex === 8) return horizontalIndex;
            setFocus(`matrix[${horizontalIndex + 1}][${verticalIndex}]`);
            return horizontalIndex + 1;
          });
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [focus, horizontalIndex, verticalIndex]);

  if (isPuzzleLoading)
    return (
      <div className={`${scssObj.baseClass}__loader`}>
        <CircularProgress size={150} />
      </div>
    );

  return (
    <div className={`${scssObj.baseClass}__container`}>
      <div className={`${scssObj.baseClass}__title`}>Sudoku Puzzle</div>
      <SudokuCanvas
        selectedPuzzle={selectedPuzzle}
        autoFocus={focus}
        onFocus={setFocus}
        setHorizontalIndex={setHorizontalIndex}
        setVerticalIndex={setVerticalIndex}
      />

      <div className={`${scssObj.baseClass}__referrence`}>
        Made with <span className={`${scssObj.baseClass}__heart`}>❤</span> by
        Suraj
        <div className={`${scssObj.baseClass}__button-container`}>
          <Button
            className={`${scssObj.baseClass}__github-button`}
            role='link'
            onClick={() => {
              window.open(
                'https://github.com/IlIIIlIIIlIlIlI/sudoku-react-client',
                '_blank',
                'noreferrer'
              );
            }}
          >
            <FaGithub />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sudoku;

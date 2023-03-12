import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getPuzzle, getSolution } from '../Redux';
import { selectPuzzle } from '../Redux/Selector';
import SudokuCanvas from '../SudokuCanvas';
import scssObj from './_Sudoku.scss';

const arrowButtonsEventKey = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

function Sudoku() {
  const dispatch = useDispatch();
  const selectedPuzzle = useSelector(selectPuzzle);

  const [isLoading, setIsLoading] = useState(true);
  const [horizontalIndex, setHorizontalIndex] = useState<number>(0);
  const [verticalIndex, setVerticalIndex] = useState<number>(0);
  const [focus, setFocus] = useState(
    `matrix[${horizontalIndex}][${verticalIndex}]`
  );

  if (isLoading) {
    setIsLoading(false);
    axios
      .get<number[][][]>(
        'https://sudoku-puzzle-9x9-presolved-production.up.railway.app/sudoku'
      )
      .then((response) => {
        setIsLoading(false);
        dispatch(getPuzzle({ matrix9x9: response.data[1] }));
        dispatch(getSolution({ matrix9x9: response.data[0] }));
        return response.data;
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      // console.log('User pressed: ', event.key);

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

  if (selectedPuzzle.length === 0) return <div>Loading</div>;

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
        Made with <span className={`${scssObj.baseClass}__heart`}>❤</span> from
        Suraj
      </div>
    </div>
  );
}

export default Sudoku;

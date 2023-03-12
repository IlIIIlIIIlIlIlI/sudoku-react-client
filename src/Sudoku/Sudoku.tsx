import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getPuzzle, getSolution } from '../Redux';
import { selectPuzzle, selectSolution } from '../Redux/Selector';

const arrowButtonsEventKey = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

function Sudoku() {
  const dispatch = useDispatch();
  const selectedPuzzle = useSelector(selectPuzzle);
  const selectedSolution = useSelector(selectSolution);
  const [isLoading, setIsLoading] = useState(true);
  const [horizontalIndex, setHorizontalIndex] = useState<number>(0);
  const [verticalIndex, setVerticalIndex] = useState<number>(0);
  const [focus, setFocus] = useState(
    `matrix[${horizontalIndex}][${verticalIndex}]`
  );

  const puzzleAndSolutionPromise = axios
    .get<number[][][]>(
      'https://sudoku-puzzle-9x9-presolved-production.up.railway.app/sudoku'
    )
    .then((response) => {
      setIsLoading(false);
      dispatch(getPuzzle({ matrix9x9: response.data[0] }));
      dispatch(getSolution({ matrix9x9: response.data[1] }));
      return response.data;
    })
    .catch(() => {
      setIsLoading(false);
    });

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

  const formik = useFormik({
    initialValues: {
      matrix: [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
      ],
    },
    onSubmit: () => {},
  });

  if (isLoading) return <div>Loading</div>;

  const inputMatrix = [];

  for (let i = 0; i < 9; i++) {
    const temp = [];
    for (let j = 0; j < 9; j++) {
      temp.push(
        <Input
          xindex={i}
          yindex={j}
          name={`matrix[${i}][${j}]`}
          value={formik.values.matrix[i][j]}
          autoFocus={focus}
          onChange={formik.handleChange}
          onFocus={setFocus}
          setHorizontalIndex={setHorizontalIndex}
          setVerticalIndex={setVerticalIndex}
        />
      );
    }

    inputMatrix.push(<div>{temp}</div>);
  }

  return <form onSubmit={formik.handleSubmit}>{inputMatrix}</form>;
}

export default Sudoku;

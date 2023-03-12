import { useFormik } from 'formik';
import React from 'react';
import Input from '../Input';
interface Props {
  selectedPuzzle: number[][];
  autoFocus?: string;
  onFocus: (value: string) => void;
  setHorizontalIndex: (value: number) => void;
  setVerticalIndex: (value: number) => void;
}
function SudokuCanvas({
  selectedPuzzle,
  autoFocus,
  onFocus,
  setHorizontalIndex,
  setVerticalIndex,
}: Props) {
  const formik = useFormik({
    initialValues: {
      matrix: selectedPuzzle,
    },
    onSubmit: () => {},
  });

  const inputMatrix = [];

  for (let i = 0; i < 9; i++) {
    const temp = [];
    for (let j = 0; j < 9; j++) {
      temp.push(
        <Input
          xindex={i}
          yindex={j}
          name={`matrix[${i}][${j}]`}
          value={
            formik.values.matrix?.[i]?.[j] ? formik.values.matrix[i][j] : ''
          }
          autoFocus={autoFocus}
          onChange={formik.handleChange}
          onFocus={onFocus}
          setHorizontalIndex={setHorizontalIndex}
          setVerticalIndex={setVerticalIndex}
        />
      );
    }

    inputMatrix.push(<div>{temp}</div>);
  }
  return <form onSubmit={formik.handleSubmit}>{inputMatrix}</form>;
}

export default SudokuCanvas;

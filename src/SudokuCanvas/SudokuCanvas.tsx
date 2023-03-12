import { useFormik } from 'formik';
import React, { useState } from 'react';
import Input from '../Input';
import { checkIfAllErrorsAreResolved, checkIfAllNumbersFilled } from './utils';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import scssObj from './_SudokuCanvas.scss';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

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
    validate(values) {
      let errors: Partial<{
        matrix: boolean[][];
      }> = {};

      const matrixError = [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
      ];

      for (let i = 0; i < 9; i++) {
        const rowContent: number[] = [];
        values.matrix[i].forEach((element) => {
          if (Number(element) > 0) {
            rowContent.push(Number(element));
          }
        });

        const rowContentSet = new Set<number>(Array.from(rowContent));

        if (rowContent.length !== rowContentSet.size) {
          for (let j = 0; j < 9; j++) {
            matrixError[i][j] = true;
          }
        }
      }

      for (let j = 0; j < 9; j++) {
        const columnContent: number[] = [];

        for (let k = 0; k < 9; k++) {
          const currentElement = values.matrix[k][j];
          if (Number(currentElement) > 0) {
            columnContent.push(Number(currentElement));
          }
        }

        const columnContentSet = new Set<number>(Array.from(columnContent));

        if (columnContent.length !== columnContentSet.size) {
          for (let i = 0; i < 9; i++) {
            matrixError[i][j] = true;
          }
        }
      }

      errors.matrix = matrixError;

      return errors;
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
          errored={!!formik?.errors?.matrix?.[i][j]}
          disabled={!!selectedPuzzle[i][j]}
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

  return (
    <>
      <Dialog
        open={
          checkIfAllNumbersFilled(formik.values.matrix) &&
          checkIfAllErrorsAreResolved(formik?.errors?.matrix)
        }
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <div className={`${scssObj.baseClass}__container`}>
          <div className={`${scssObj.baseClass}__title`}>
            <span className={`${scssObj.baseClass}__rotate`}>🎉</span>
            Congratulations<span>🎉</span>
          </div>
          <div className={`${scssObj.baseClass}__mystery`}>Mystery Solved</div>
          <Button
            variant='contained'
            className={`${scssObj.baseClass}__button`}
            onClick={() => {
              window.location.reload();
            }}
          >
            Try once again
          </Button>
        </div>
      </Dialog>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        {inputMatrix}
      </form>
    </>
  );
}

export default SudokuCanvas;

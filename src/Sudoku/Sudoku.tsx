import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import SudokuCanvas from '../SudokuCanvas';
import scssObj from './_Sudoku.scss';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  if (!sessionStorage.getItem('iAmChild')) {
    sessionStorage.setItem('iAmChild', '');
  }
  if (!sessionStorage.getItem('admin')) {
    sessionStorage.setItem('admin', '');
  }
  const dispatch = useDispatch();
  const selectedPuzzle = useSelector(selectPuzzleMatrix);
  const isPuzzleLoading = useSelector(selectIsSudokuBeingCalculated);

  const [isCalledInitially, setIsCalledInitially] = useState(true);
  const [horizontalIndex, setHorizontalIndex] = useState<number>(0);
  const [verticalIndex, setVerticalIndex] = useState<number>(0);
  const [hardness, setHardness] = useState<HardnessLevel>(HardnessLevel.MEDIUM);
  const [focus, setFocus] = useState(
    `matrix[${horizontalIndex}][${verticalIndex}]`
  );

  if (isCalledInitially) {
    dispatch(startSolvingDiagonalMatrices(HardnessLevel.MEDIUM));
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

      <div className={`${scssObj.baseClass}__dropdown`}>
        <FormControl
          fullWidth
          className={`${scssObj.baseClass}__dropdown-container`}
        >
          <InputLabel>Hardness</InputLabel>
          <Select
            value={hardness}
            label='Hardness'
            onChange={(event: SelectChangeEvent) => {
              setHardness(event.target.value as HardnessLevel);
              dispatch(
                startSolvingDiagonalMatrices(
                  event.target.value as HardnessLevel
                )
              );
            }}
            className={`${scssObj.baseClass}__dropdown-container`}
          >
            {sessionStorage.getItem('iAmChild') ? (
              <MenuItem value={HardnessLevel.CHILD}>Child</MenuItem>
            ) : (
              <></>
            )}
            <MenuItem value={HardnessLevel.EASY}>Easy</MenuItem>
            <MenuItem value={HardnessLevel.MEDIUM}>Medium</MenuItem>
            <MenuItem value={HardnessLevel.HARD}>Hard</MenuItem>
            <MenuItem value={HardnessLevel.EXPERT}>Expert</MenuItem>
            <MenuItem value={HardnessLevel.EVIL}>Evil</MenuItem>
            {sessionStorage.getItem('admin') ? (
              <MenuItem value={HardnessLevel.SOLUTION}>Solution</MenuItem>
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
      </div>

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

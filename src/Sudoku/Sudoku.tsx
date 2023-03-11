import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../Input';

const arrowButtonsEventKey = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

function Sudoku() {
  const [focus, setFocus] = useState(0);
  axios
    .get('https://sudoku-puzzle-9x9-presolved-production.up.railway.app/sudoku')
    .then();

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      console.log('User pressed: ', event.key);

      if (arrowButtonsEventKey.includes(event.key)) setFocus(focus + 1);
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [focus]);

  return (
    <div>
      <Input
        name='1'
        autoFocus={focus}
      />
      <Input
        name='2'
        autoFocus={focus}
      />
      <Input
        name='3'
        autoFocus={focus}
      />
    </div>
  );
}

export default Sudoku;

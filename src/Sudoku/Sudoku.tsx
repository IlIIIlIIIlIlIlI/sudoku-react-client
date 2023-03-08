import React from 'react';
import axios from 'axios';

function Sudoku() {
  axios
    .get('https://sudoku-puzzle-9x9-presolved-production.up.railway.app/sudoku')
    .then((value) => console.log('value', value));
  return <div>Sudoku</div>;
}

export default Sudoku;

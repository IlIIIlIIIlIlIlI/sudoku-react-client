import React from 'react';
import scssObj from './_Input.scss';

function Input() {
  return (
    <input
      autoFocus={false}
      className={`${scssObj.baseClass}__input`}
      type='text'
      min={1}
      max={9}
      onKeyPress={(event) => {
        if (
          !/[1-9]/.test(event.key) ||
          Number((event.target as HTMLInputElement).value) > 0
        ) {
          event.preventDefault();
        }
      }}
    />
  );
}

export default Input;

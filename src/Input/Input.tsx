import React, { InputHTMLAttributes, useRef } from 'react';
import scssObj from './_Input.scss';

interface Props {
  name: string;
  autoFocus?: number;
}

function Input({ name, autoFocus }: Props) {
  const input = useRef<any>(null);

  if (autoFocus === Number(name)) {
    input?.current?.focus();
  }

  return (
    <input
      name={name}
      ref={input}
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

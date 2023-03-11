import React, { useRef } from 'react';
import scssObj from './_Input.scss';

interface Props {
  name: string;
  value: number | string;
  autoFocus?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: (value: string) => void;
}

function Input({ name, autoFocus, onChange, value, onFocus }: Props) {
  const input = useRef<any>(null);

  if (autoFocus === name) {
    input?.current?.focus();
  }

  return (
    <input
      onFocus={() => onFocus(name)}
      name={name}
      ref={input}
      className={`${scssObj.baseClass}__input`}
      type='text'
      value={value}
      onChange={onChange}
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

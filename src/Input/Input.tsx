import React, { useRef } from 'react';
import scssObj from './_Input.scss';
import classnames from 'classnames';

interface Props {
  name: string;
  xindex: number;
  yindex: number;
  value: number | string;
  autoFocus?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: (value: string) => void;
  setHorizontalIndex: (value: number) => void;
  setVerticalIndex: (value: number) => void;
}

function Input({
  name,
  xindex,
  yindex,
  autoFocus,
  onChange,
  value,
  onFocus,
  setHorizontalIndex,
  setVerticalIndex,
}: Props) {
  const input = useRef<any>(null);

  const cls = classnames(`${scssObj.baseClass}__input`, {
    [`${scssObj.baseClass}__side-margin`]: (yindex + 1) % 3 === 0,
    [`${scssObj.baseClass}__bottom-margin`]: (xindex + 1) % 3 === 0,
  });

  if (autoFocus === name) {
    input?.current?.focus();
  }

  return (
    <input
      onFocus={() => {
        onFocus(name);
        setHorizontalIndex(Number(name.charAt(7)));
        setVerticalIndex(Number(name.charAt(10)));
      }}
      name={name}
      ref={input}
      className={cls}
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

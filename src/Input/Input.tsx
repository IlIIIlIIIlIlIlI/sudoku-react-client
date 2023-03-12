import React, { useRef } from 'react';
import scssObj from './_Input.scss';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import classnames from 'classnames';
import { selectElementAtFocusedElement } from '../Redux/Selector';
import { getElementAtFocusedInput } from '../Redux';

interface Props {
  name: string;
  xindex: number;
  yindex: number;
  errored?: boolean;
  value: number | string;
  autoFocus?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: (value: string) => void;
  setHorizontalIndex: (value: number) => void;
  setVerticalIndex: (value: number) => void;
  disabled?: boolean;
}

function Input({
  name,
  xindex,
  yindex,
  errored,
  autoFocus,
  onChange,
  value,
  onFocus,
  setHorizontalIndex,
  setVerticalIndex,
  disabled,
}: Props) {
  const elementAtFocusedInput = useSelector(selectElementAtFocusedElement);
  const dispatch = useDispatch();
  const input = useRef<any>(null);

  const cls = classnames(`${scssObj.baseClass}__input`, {
    [`${scssObj.baseClass}__side-margin`]: (yindex + 1) % 3 === 0,
    [`${scssObj.baseClass}__bottom-margin`]: (xindex + 1) % 3 === 0,
    [`${scssObj.baseClass}__focused`]: autoFocus === name,
    [`${scssObj.baseClass}__disabled`]:
      disabled &&
      value !== '' &&
      Number(value) !== Number(elementAtFocusedInput),
    [`${scssObj.baseClass}__error`]: errored,
    [`${scssObj.baseClass}__focused_element`]:
      value !== '' ? Number(value) === Number(elementAtFocusedInput) : false,
  });

  if (autoFocus === name) {
    dispatch(getElementAtFocusedInput({ focused: value }));
    input?.current?.focus();
  }

  return (
    <input
      disabled={disabled}
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
        // console.log('event.key before', event.key);
        if (
          !/[1-9]/.test(event.key) ||
          Number((event.target as HTMLInputElement).value) > 0
        ) {
          // console.log('prevented');
          event.preventDefault();
        }
      }}
    />
  );
}

export default Input;

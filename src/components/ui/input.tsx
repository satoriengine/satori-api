import React, { useState } from 'react';

import { type FieldValues } from 'react-hook-form';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

import {
  generateTextInputStyle,
  generateLabelStyle,
  generateHelpStyle,
} from '@/components/ui/inputStyle';
import {
  type PasswordInputProps,
  type TextInputColor,
  type TextInputProps,
} from '@/types/ui';

export function TextInput<T extends FieldValues>({
  label,
  name,
  placeholder = '',
  type = 'text',
  errorMessage,
  register,
  formState,
  size = 'md',
  full = false,
}: TextInputProps<T>) {
  const { submitCount } = formState;

  const color: TextInputColor =
    submitCount === 0
      ? 'default'
      : errorMessage !== undefined
        ? 'failure'
        : 'success';

  const inputCn = generateTextInputStyle({ color, full, size });
  const labelCn = generateLabelStyle({ color, size });
  const helpCn = generateHelpStyle({ color, size });

  return (
    <div className="relative">
      <input
        className={inputCn}
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      <label className={labelCn} htmlFor={name}>
        {label}
      </label>
      {errorMessage && <div className={helpCn}>{errorMessage}</div>}
    </div>
  );
}

export function PasswordInput<T extends FieldValues>({
  label,
  name,
  placeholder = '',
  errorMessage,
  register,
  formState,
  size = 'md',
  full = false,
}: PasswordInputProps<T>) {
  const [visible, setVisible] = useState(false);

  const { submitCount } = formState;

  const color: TextInputColor =
    submitCount === 0
      ? 'default'
      : errorMessage !== undefined
        ? 'failure'
        : 'success';

  const inputCn = generateTextInputStyle({ color, full, size });
  const labelCn = generateLabelStyle({ color, size });
  const helpCn = generateHelpStyle({ color, size });

  function handleToggle() {
    setVisible((e) => !e);
  }

  return (
    <div className="relative">
      <input
        className={inputCn}
        id={name}
        placeholder={placeholder}
        type={visible ? 'text' : 'password'}
        {...register(name)}
      />
      <label className={labelCn} htmlFor={name}>
        {label}
      </label>
      <button
        className="absolute top-[20px] right-3 cursor-pointer"
        onClick={handleToggle}
        type="button"
      >
        {visible ? <HiEye size="1.5em" /> : <HiEyeSlash size="1.5em" />}
      </button>
      {errorMessage && <div className={helpCn}>{errorMessage}</div>}
    </div>
  );
}

'use client';
import type { FieldProps } from 'formik';
import type { FC } from 'react';
import { ErrorMessage, useField } from 'formik';
import { useState } from 'react';
import './form.css'


type FormInputProps = {
  label: string;
  place: string;
  className?: string;
} & FieldProps;

export const FormInput: FC<FormInputProps> = ({ label, place, className, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState('');

  return (
    <div className="forminput">
      <label
        htmlFor={field.name}
        className={`form-label ${value !== '' && 'form-label-input-value'}`}
      >
        {label}
      </label>
      <input
        placeholder={place}
        type="text"
        className={`form-input ${className} ${meta.touched && meta.error && 'is-invalid'}`}
        {...field}
        {...props}
        autoComplete="off"
        onChangeCapture={e => setValue(e.target.value)}
        style={{
          border: meta.touched && meta.error ? '1px solid red' : undefined,
        }}
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </div>
  );
};

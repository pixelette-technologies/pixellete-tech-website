import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './inputphoneno.css';

type InputPhoneNoProps = {
  label: string;
  place: string;
  className?: string;
  [key: string]: any; // Allows additional props to be passed in (such as 'name', 'type', etc.)
};

const InputPhoneNo: React.FC<InputPhoneNoProps> = ({ label, place, className = '', ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState('');

  const handlePhoneChange = (value: string, country: string, e: any, formattedValue: string) => {
    setValue(value);
    helpers.setValue(value); // Update Formik field value
  };

  return (
    <>
      <section>
        <div
          className={`inputPhoneNumber form-input ${className} ${meta.touched && meta.error ? 'is-invalid' : ''}`}
        >
          <label
            htmlFor={field.name}
            className={`form-label ${value !== '' ? 'form-label-input-value' : ''}`}
          >
            {label}
          </label>
          <section
            style={{
              border: meta.touched && meta.error ? '1px solid red' : '1px solid grey',
              backgroundColor: 'transparent',
              borderBlockColor: 'gray',
            }}
          >
            <PhoneInput
              country="us"
              value={value}
              onChange={handlePhoneChange}
              dropdownStyle={{
                backgroundColor: 'black',
                borderRadius: '5px',
                border: '1px solid grey',
                color: 'grey',
              }}
              buttonStyle={{
                backgroundColor: 'transparent',
                border: 'none',
                transition: 'background-color 0.3s',
              }}
              inputProps={{
                name: field.name,
                required: true,
                autoFocus: false,
                placeholder: place,
                style: {
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                },
                readOnly: false,
                ...props,
              }}
              containerClass="intl-tel-input"
              inputClass="form-control"
            />
          </section>
          <ErrorMessage component="div" name={field.name} className="form-error" />
        </div>
      </section>
    </>
  );
};

export default InputPhoneNo;

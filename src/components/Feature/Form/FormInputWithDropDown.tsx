import type { FieldProps } from 'formik';
import type { FC } from 'react';
import { ErrorMessage, useField } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './form.css';

type FormInputWithDropDownProps = {
  label: string;
  place: string;
  data: string[];
  className?: string;
} & FieldProps;

const FormInputWithDropDown: FC<FormInputWithDropDownProps> = ({
  label,
  place,
  data,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropDown(true);
    helpers.setValue(value);
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    setShowDropDown(!showDropDown);
    e.stopPropagation();
  };

  const handleItemClick = (item: string) => {
    setInputValue(item);
    setShowDropDown(false);
    helpers.setValue(item);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div
      className={`formInputWithDropDown ${meta.touched && meta.error && 'is-invalid'}`}
      style={{ position: 'relative' }}
    >
      <section>
        <label
          htmlFor={field.name}
          className={`form-label ${inputValue !== '' && 'form-label-input-value'}`}
        >
          {label}
        </label>

        <div style={{ border: meta.touched && meta.error && '1px solid red' }}>
          <input
            placeholder={place}
            type="text"
            className={`form-input ${className} ${meta.touched && meta.error && 'is-invalid'}`}
            {...field}
            {...props}
            autoComplete="off"
            onChange={handleInputChange}
            value={inputValue}
          />
          <motion.div
            animate={{
              rotate: showDropDown ? -180 : 0,
            }}
            onClick={handleArrowClick}
          >
            <IoIosArrowDown />
          </motion.div>
        </div>

        <blockquote>
          <ErrorMessage component="div" name={field.name} className="form-error" />
        </blockquote>
      </section>

      {showDropDown && (
        <motion.div
          initial={{ y: '-6rem', opacity: 1 }}
          animate={{ y: '0rem', opacity: 1 }}
          exit={{ opacity: 1 }}
          ref={dropdownRef}
        >
          {filteredData.length > 0
            ? (
                <ul>
                  {filteredData.map((item, index) => (
                    <li key={index} onClick={() => handleItemClick(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              )
            : (
                <center>
                  <span>No match found</span>
                </center>
              )}
        </motion.div>
      )}
    </div>
  );
};

export default FormInputWithDropDown;

import React from 'react';

import cn from '@utils/classnames';

import './FieldCheckbox.css';

const FieldCheckbox = ({
  className = '',
  value,
  onChange,
  label,
  name,
  id,
  type = 'text',
  checked,
  ...props
}: {
  className?: string;
  value: string;
  onChange: Function;
  label: string;
  name: string;
  id: string;
  type?: string;
  checked: boolean;
  [key: string]: any;
}) => (
  <div className={cn(className, 'field-checkbox')}>
    <input
      className="field-checkbox__input"
      value={value}
      type="checkbox"
      onChange={(e) => onChange(e)}
      name={name}
      id={id}
      checked={checked}
      {...props}
    />
    <label className="field-checkbox__label" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default FieldCheckbox;

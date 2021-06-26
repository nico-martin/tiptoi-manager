import React from 'react';
import cn from '@utils/classnames';
import styles from './FieldCheckbox.css';

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
  <div className={cn(className, styles.root)}>
    <input
      className={styles.input}
      value={value}
      type="checkbox"
      onChange={e => onChange(e)}
      name={name}
      id={id}
      checked={checked}
      {...props}
    />
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
  </div>
);

export default FieldCheckbox;

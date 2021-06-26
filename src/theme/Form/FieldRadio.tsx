import React from 'react';
import cn from '@utils/classnames';
import styles from './FieldRadio.css';

const FieldRadio = ({
  className = '',
  value,
  label,
  checked = false,
  onChange,
  name,
  id,
}: {
  className?: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange: Function;
  name: string;
  id: string;
}) => (
  <div className={cn(className, styles.root)}>
    <input
      type="radio"
      checked={checked}
      onChange={e => onChange(e)}
      name={name}
      id={id}
      className={styles.input}
      value={value}
    />
    <label className={styles.label} for={id}>
      {label}
    </label>
  </div>
);

export default FieldRadio;

import React from 'react';

import cn from '@utils/classnames';

import { CloseButton } from '../index';
import styles from './ShadowBox.module.css';

const ShadowBox: React.FC<{
  title?: string;
  children?: React.JSX.Element | React.JSX.Element[] | string;
  close: Function;
  size?: 'large' | 'small';
  className?: string;
  preventClose?: boolean;
}> = ({
  title,
  children,
  close,
  size = 'large',
  className = '',
  preventClose,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  const onClose = () => {
    if (preventClose) {
      return;
    }
    setShow(false);
    window.setTimeout(() => {
      close();
    }, 200);
  };

  return (
    <div
      className={cn(className, styles.root, {
        [styles.isSmall]: size === 'small',
      })}
      data-visible={show}
    >
      <div className={styles.shadow} onClick={onClose} />
      <article className={styles.box}>
        <header className={cn(styles.header)}>
          {title !== null && <h1 className={styles.title}>{title}</h1>}{' '}
          {!preventClose && (
            <CloseButton className={styles.close} onClick={onClose} />
          )}
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    </div>
  );
};

export default ShadowBox;

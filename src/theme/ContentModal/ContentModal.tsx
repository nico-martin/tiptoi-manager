import React from 'react';
import cn from '@utils/classnames';
import { Loader, ShadowBox } from '../index';
import styles from './ContentModal.css';

const ContentModal = ({
  title,
  children,
  onClose,
  className = '',
  loading = false,
  full = true,
  preventClose = false,
}: {
  title: string;
  children?: React.JSX.Element | React.JSX.Element[] | string;
  onClose: Function;
  className?: string;
  loading?: boolean;
  full?: boolean;
  preventClose?: boolean;
}) => (
  <React.Fragment>
    <ShadowBox
      title={title}
      close={onClose}
      className={cn(className, styles.root)}
      size={full ? 'large' : 'small'}
      preventClose={preventClose}
    >
      <div className={styles.content}>
        {loading ? <Loader className={styles.loader} /> : children}
      </div>
    </ShadowBox>
  </React.Fragment>
);

export default ContentModal;

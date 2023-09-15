import React, { MutableRefObject } from 'react';
import { usePopper } from 'react-popper';

import cn from '@utils/classnames.ts';

import styles from './Tooltip.module.css';

let i = 0;

const Tooltip: React.FC<{
  children: any;
  tooltipRef: MutableRefObject<HTMLElement>;
  triggerRef?: MutableRefObject<HTMLElement>;
  maxWidth?: number;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}> = ({
  children,
  tooltipRef,
  triggerRef: customTriggerRef = null,
  maxWidth = null,
  placement = 'bottom',
}) => {
  const [show, setShow] = React.useState<boolean>(false);
  const popperRef = React.useRef<HTMLDivElement>(null);

  const {
    styles: popperStyles,
    attributes,
    //update,
  } = usePopper(tooltipRef?.current, popperRef?.current, {
    placement,
  });

  const id: string = React.useMemo(() => {
    i++;
    tooltipRef?.current &&
      tooltipRef.current.setAttribute('aria-describedby', `tooltip${i}`);
    return `tooltip${i}`;
  }, [tooltipRef?.current]);

  const addListeners = (element: HTMLElement) => {
    if (element) {
      element.addEventListener('mouseover', () => setShow(true));
      element.addEventListener('mouseleave', () => setShow(false));
    }
  };

  const removeListeners = (element: HTMLElement) => {
    if (element) {
      element.removeEventListener('mouseover', () => setShow(true));
      element.removeEventListener('mouseleave', () => setShow(false));
    }
  };

  React.useEffect(() => {
    addListeners(
      customTriggerRef ? customTriggerRef?.current : tooltipRef?.current
    );
    return () =>
      removeListeners(
        customTriggerRef ? customTriggerRef?.current : tooltipRef?.current
      );
  }, [tooltipRef?.current, customTriggerRef?.current]);

  return (
    <div
      ref={popperRef}
      className={cn(styles.tooltip, { [styles.tooltipShow]: show })}
      role="tooltip"
      id={id}
      aria-hidden={!show}
      style={{ ...popperStyles.popper, ...(maxWidth ? { maxWidth } : {}) }}
      {...attributes.popper}
    >
      <div className={styles.tooltipInner}>
        {children}
        <div className={styles.arrow} style={popperStyles.arrow} />
      </div>
    </div>
  );
};

export default Tooltip;

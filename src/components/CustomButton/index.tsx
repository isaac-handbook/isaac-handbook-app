import React, { CSSProperties, memo } from 'react';
import styles from './index.module.scss';
import { Button } from '@tarojs/components';
import classNames from 'classnames';

interface Props {
  value: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

const Cell: React.FC<Props> = (props) => {
  const { value, disabled, onClick, style } = props;
  return (
    <Button
      className={classNames(styles.btn, { [styles.disabled]: disabled })}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {value}
    </Button>
  );
};

export const CustomButton = memo(Cell);

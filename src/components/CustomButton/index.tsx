import React, { CSSProperties, memo } from 'react';
import styles from './index.module.scss';
import { Button } from '@tarojs/components';
import classNames from 'classnames';

interface Props {
  value: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'primary' | 'default';
}

const Cell: React.FC<Props> = (props) => {
  const { value, disabled, onClick, style, type = 'default' } = props;
  return (
    <Button
      className={classNames(styles.btn, { [styles.disabled]: disabled })}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: type === 'primary' ? '#f7b733' : '#ffffff',
        color: type === 'primary' ? '#fff' : '#333',
      }}
    >
      {value}
    </Button>
  );
};

export const CustomButton = memo(Cell);

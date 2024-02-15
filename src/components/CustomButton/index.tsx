import React, { CSSProperties, memo } from 'react';
import styles from './index.module.scss';
import { Button } from '@tarojs/components';
import classNames from 'classnames';
import { useThemeInfo } from '@hooks/useThemeInfo';

interface Props {
  value: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'primary' | 'default';
}

const Cell: React.FC<Props> = (props) => {
  const { value, disabled, onClick, style, type = 'default' } = props;

  const {
    themeInfo: { themeColor },
  } = useThemeInfo();
  return (
    <Button
      className={classNames(styles.btn, { [styles.disabled]: disabled })}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor:
          type === 'primary' ? themeColor.primaryColor : '#ffffff',
        color: type === 'primary' ? '#fff' : '#333',
      }}
    >
      {value}
    </Button>
  );
};

export const CustomButton = memo(Cell);

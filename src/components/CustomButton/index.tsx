import React, { CSSProperties, memo } from 'react';
import styles from './index.module.scss';
import { Button } from '@nutui/nutui-react-taro';

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
      className={styles.btn}
      disabled={disabled}
      onClick={onClick}
      style={
        {
          '--nutui-button-border-width': '0px',
          '--nutui-button-default-height': '48px',
          '--nutui-button-default-font-size': '16px',
          '--nutui-button-default-background-color': '#ffffff',
          ...style,
        } as CSSProperties
      }
    >
      {value}
    </Button>
  );
};

export const CustomButton = memo(Cell);

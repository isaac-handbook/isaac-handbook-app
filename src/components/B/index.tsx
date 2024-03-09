import { View } from '@tarojs/components';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const B: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <View style={{ fontWeight: 'bold', display: 'inline' }}>{children}</View>
  );
};

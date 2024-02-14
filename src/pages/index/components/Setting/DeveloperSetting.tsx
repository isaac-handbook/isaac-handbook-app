import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { useSetting } from '@hooks/useSetting';
import { CustomButton } from '@components/CustomButton';
import Taro from '@tarojs/taro';

const Cell: React.FC = () => {
  const {
    setting: { developerMode },
  } = useSetting();

  if (!developerMode) {
    return null;
  }

  const handleClick = () => {
    // 跳转到开发者页面
    Taro.navigateTo({ url: '/pages/developer/index' });
  };

  return (
    <View>
      <CustomButton
        style={{ marginTop: '24rpx', height: '104rpx' }}
        value="前往开发者设置"
        onClick={handleClick}
      />
    </View>
  );
};

export const DeveloperSetting = memo(Cell);

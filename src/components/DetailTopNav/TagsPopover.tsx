import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import classNames from 'classnames';
import { ItemGridDrawer } from '@components/ItemGridDrawer';
import { Popover } from '@components/Popover';
import { ArrowDown } from '@nutui/icons-react-taro';
import { StuffIcon } from '@components/StuffIcon';
import { stuffIconPositionMap } from '@constants';
import { drawerMaskColor } from '@src/styles';

interface Props {
  tags: string[];
}

export const TagsPopover: React.FC<Props> = ({ tags }) => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const list = tags.map((tag) => {
    return {
      key: tag,
      name: (
        <ItemGridDrawer tagFilter={tag} title={'标签：' + tag}>
          <View style={{ width: '100%' }}>{tag}</View>
        </ItemGridDrawer>
      ),
      icon: (
        <StuffIcon
          location={stuffIconPositionMap['硬币']}
          top={8}
          scale={1.8}
          marginRight={12}
        />
      ),
    };
  });

  return (
    <>
      <View className="popoverWrapper">
        <Popover
          // @ts-ignore 传入组件而不是字符串
          list={list}
          round
          closeOnActionClick={false}
          closeOnOutsideClick={false}
          overlay={true}
          className={styles.popover}
          overlayStyle={{ backgroundColor: drawerMaskColor }}
          showArrow={false}
          visible={showDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
          onOverlayClick={() => {
            setShowDrawer(false);
          }}
          onOpen={() => setShowDrawer(true)}
        >
          <View
            className={styles.cell}
            style={{ height: '100%' }}
            onClick={() => setShowDrawer(true)}
          >
            <View className={styles.label}>
              标签
              <ArrowDown style={{ marginLeft: '4rpx' }} size={9} />
            </View>
            <View className={classNames(styles.value, styles.link)}>
              {tags.length}个
            </View>
          </View>
        </Popover>
      </View>
    </>
  );
};

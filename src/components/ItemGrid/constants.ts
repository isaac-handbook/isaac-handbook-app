import { colorFilter2 } from './color/filter2';
// import { colorFilter3 } from './color/filter3';
// import { colorFilter4 } from './color/filter4';

export type GridIconSize =
  | 'grid-tiny'
  | 'grid-small'
  | 'grid-normal'
  | 'grid-large';

type GridSizeMap = Record<
  GridIconSize,
  {
    scale: number;
    columnCount: number;
  }
>;

export const gridSizeMap: GridSizeMap = {
  'grid-tiny': {
    scale: 1.4,
    columnCount: 8,
  },
  'grid-small': {
    scale: 1.6,
    columnCount: 7,
  },
  'grid-normal': {
    scale: 1.8,
    columnCount: 6,
  },
  'grid-large': {
    scale: 2,
    columnCount: 5,
  },
};

export const sortItemIdByColor = colorFilter2;

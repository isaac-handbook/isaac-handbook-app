const path = require('path');

const config = {
  projectName: 'isaac-handbook',
  date: '2023-9-24',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  cache: { enable: true },
  alias: {
    // 配置taro项目的绝对路径
    '@src': path.resolve(__dirname, '..', 'src'),
    '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@types': path.resolve(__dirname, '..', 'src/types'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@data': path.resolve(__dirname, '..', 'src/data'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    enableExtract: true,
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true,
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};

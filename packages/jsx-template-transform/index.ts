import { transform } from '@babel/core';

export default (code: string, pluginOptions: Record<string, any> = {}) => {
  return transform(code, {
    presets: ['@babel/preset-env'],
    plugins: [
      [
        require('@babel/plugin-transform-react-jsx'),
        {
          pragma: 'Preact.h', // default pragma is React.createElement
          ...pluginOptions,
        },
      ],
    ],
  });
};

import { transform } from '@babel/core';

interface Options {
  /**
   * @babel/plugin-transform-react-jsx plugin options
   */
  transformOptions?: Record<string, any>;

  /**
   * This prefix will add to code before transformed by babel;
   */
  importPrefix?: string;
}

export default (code: string, options: Options = {}) => {
  const {
    transformOptions = {},
    importPrefix = "import { h } from 'preact';\n",
  } = options;

  const codeWithPrefix = `${importPrefix}${code}`;

  return transform(codeWithPrefix, {
    presets: ['@babel/preset-env'],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h', // default pragma is React.createElement
          ...transformOptions,
        },
      ],
    ],
  });
};

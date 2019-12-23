/*
 * transform jsx code string to js code string
 *
 * @Author: Jiyu Shao
 * @Date: 2019-12-05 16:51:56
 * @Last Modified by: Jiyu Shao
 * @Last Modified time: 2019-12-23 16:03:12
 */
import * as fs from 'fs';
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

/**
 * transfom jsx js file into js string
 * @param {string} filePath processing file path
 * @param {Options} options jsx template transform options
 */
const jsxTemplateTransform = (filePath: string, options: Options = {}) => {
  const {
    transformOptions = {},
    importPrefix = "import { h } from 'preact';\n",
  } = options;

  const code = fs.readFileSync(filePath, 'utf-8');
  const codeWithPrefix = `${importPrefix}${code}`;

  return transform(codeWithPrefix, {
    filename: filePath,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h', // default pragma is React.createElement
          ...transformOptions,
        },
      ],
      [
        'babel-plugin-transform-imports-with-loader',
        {
          rules: {
            test: /\.jsx/,
            unserializeFunc: 'eval',
            transform: (_: string, filePath: string) => {
              const parsedCode = (jsxTemplateTransform(
                filePath,
                options
              ) as any).code;
              return parsedCode;
            },
          },
        },
      ],
    ],
  });
};

export default jsxTemplateTransform;

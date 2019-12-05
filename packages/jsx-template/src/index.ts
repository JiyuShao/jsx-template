/*
 * jsx-template modules
 *
 * @Author: Jiyu Shao
 * @Date: 2019-12-05 16:53:38
 * @Last Modified by: Jiyu Shao
 * @Last Modified time: 2019-12-05 17:22:03
 */

import { render as renderToString } from 'preact-render-to-string';
import jsxTemplateTransform from 'jsx-template-transform';

/**
 * compile code into a function
 * @param {string} code jsx code
 * @returns {Function} function that can return html
 */
export const compile = (code: string) => {
  // transform JSX code string
  const transformedCode = jsxTemplateTransform(code);

  // get JS code string
  let finalCode: string;
  if (!transformedCode) {
    throw new Error('jsx-template: compile jsxTemplateTransform code empty');
  } else {
    finalCode = transformedCode.code ? transformedCode.code : '';
  }

  // return function
  return (...args: any[]) => {
    // get codeFunc from JS code string
    const codeFunc = eval(finalCode);

    // exec codeFunc
    const reactElement = codeFunc(...args);
    return renderToString(reactElement);
  };
};

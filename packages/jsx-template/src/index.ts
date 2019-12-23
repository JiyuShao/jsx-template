/*
 * jsx-template modules
 *
 * @Author: Jiyu Shao
 * @Date: 2019-12-05 16:53:38
 * @Last Modified by: Jiyu Shao
 * @Last Modified time: 2019-12-23 15:50:23
 */

import { render as renderToString } from 'preact-render-to-string';
import jsxTemplateTransform from 'jsx-template-transform';

/**
 * compile template file into a function
 * @param {string} filename jsx template
 * @returns {Function} function that can return html
 */
export const compileFile = (filename: string) => {
  // transform JSX template string
  const transformedCode = jsxTemplateTransform(filename);

  // get JS code string
  let finalCode: string;
  if (!transformedCode) {
    throw new Error(
      'jsx-template: compileFile jsxTemplateTransform code empty'
    );
  } else {
    finalCode = transformedCode.code ? transformedCode.code : '';
  }

  // return function
  return (...args: any[]) => {
    // get codeFunc from JS code string
    let codeFunc;
    try {
      codeFunc = eval(finalCode);
    } catch (_) {
      console.error(finalCode);
    }

    // exec codeFunc
    const reactElement = codeFunc(...args);
    return renderToString(reactElement);
  };
};

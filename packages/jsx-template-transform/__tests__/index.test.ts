import * as path from 'path';
import { isValidElement } from 'preact';
import jsxTemplateTransform from '../src/index';

describe('`jsx-templlate-transform` should work with functional component', () => {
  const filename = path.resolve(
    __dirname,
    './fixtures/functional-component.jsx'
  );
  const parsedCode = (jsxTemplateTransform(filename) as any).code;

  it('eval transformed code is a function', () => {
    expect(typeof eval(parsedCode) === 'function').toBe(true);
  });

  it('function return valid react element', () => {
    expect(isValidElement(eval(parsedCode)())).toBe(true);
  });
});

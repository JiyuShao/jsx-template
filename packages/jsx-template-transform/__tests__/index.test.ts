import * as fs from 'fs';
import * as path from 'path';
import { isValidElement } from 'preact';
import jsxTemplateLoad from '../src/index';

describe('Simple functional component', () => {
  const code = fs.readFileSync(
    path.resolve(__dirname, './fixtures/simple-functional-component.jsx'),
    'utf-8'
  );
  const parsedCode = (jsxTemplateLoad(code) as any).code;

  it('eval transformed code is a function', () => {
    expect(typeof eval(parsedCode) === 'function').toBe(true);
  });

  it('function return valid react element', () => {
    expect(isValidElement(eval(parsedCode)())).toBe(true);
  });
});

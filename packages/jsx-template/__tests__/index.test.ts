import * as fs from 'fs';
import * as path from 'path';
import { compile } from '../src/index';

describe('`compile` should work with functional component', () => {
  const jsxTemplate = fs.readFileSync(
    path.resolve(__dirname, './fixtures/functional-component.jsx'),
    'utf-8'
  );

  it('compile jsx template to function', () => {
    expect(typeof compile(jsxTemplate) === 'function').toBe(true);
  });

  it('function return html', () => {
    const html = compile(jsxTemplate)();
    expect(html).toMatchSnapshot();
  });
});

describe('`compile` should work with functional component with parameters', () => {
  const jsxTemplate = fs.readFileSync(
    path.resolve(__dirname, './fixtures/functional-component-with-params.jsx'),
    'utf-8'
  );

  it('compile jsx template to function', () => {
    expect(typeof compile(jsxTemplate) === 'function').toBe(true);
  });

  it('function return html', () => {
    const content = 'this is custom content';
    const html = compile(jsxTemplate)(content);
    expect(html.includes(content)).toBe(true);
    expect(html).toMatchSnapshot();
  });
});

// describe('`compile` should work with functional component with import', () => {
//   const jsxTemplate = fs.readFileSync(
//     path.resolve(__dirname, './fixtures/functional-component-with-import.jsx'),
//     'utf-8'
//   );

//   it('compile jsx template to function', () => {
//     expect(typeof compile(jsxTemplate) === 'function').toBe(true);
//   });

//   it('function return html', () => {
//     const html = compile(jsxTemplate)();
//     expect(html).toMatchSnapshot();
//   });
// });

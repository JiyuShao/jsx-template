import * as path from 'path';
import { compileFile } from '../src/index';

describe('`compile` should work with functional component', () => {
  const filename = path.resolve(
    __dirname,
    './fixtures/functional-component.jsx'
  );

  it('compile jsx template to function', () => {
    expect(typeof compileFile(filename) === 'function').toBe(true);
  });

  it('function return html', () => {
    const html = compileFile(filename)();
    expect(html).toMatchSnapshot();
  });
});

describe('`compile` should work with functional component with parameters', () => {
  const filename = path.resolve(
    __dirname,
    './fixtures/functional-component-with-params.jsx'
  );

  it('compile jsx template to function', () => {
    expect(typeof compileFile(filename) === 'function').toBe(true);
  });

  it('function return html', () => {
    const content = 'this is custom content';
    const html = compileFile(filename)(content);
    expect(html.includes(content)).toBe(true);
    expect(html).toMatchSnapshot();
  });
});

describe('`compile` should work with functional component with import', () => {
  const filename = path.resolve(
    __dirname,
    './fixtures/functional-component-with-import.jsx'
  );

  it('compile jsx template to function', () => {
    expect(typeof compileFile(filename) === 'function').toBe(true);
  });

  it('function return html', () => {
    const html = compileFile(filename)();
    expect(html).toMatchSnapshot();
    expect(html.includes('Functional Component')).toBe(true);
  });
});

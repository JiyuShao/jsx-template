import * as path from 'path';
import { isValidElement } from 'preact';
import jsxTemplateTransform from '../src/index';

describe('`jsx-templlate-transform` should work with functional component', () => {
  const filename = path.resolve(
    __dirname,
    './fixtures/functional-component.jsx'
  );

  it('eval transformed code is a function that return valid react element', () => {
    const parsedCode = (jsxTemplateTransform(filename) as any).code;
    expect(isValidElement(eval(parsedCode)())).toBe(true);
  });

  it('`options.importPrefix` and `options.importPrefix` should work', () => {
    const parsedCode = (jsxTemplateTransform(filename, {
      transformOptions: {
        pragma: 'createElement',
      },
      importPrefix: "import { createElement } from 'preact';\n",
    }) as any).code;
    expect(parsedCode).toContain('createElement');
    expect(isValidElement(eval(parsedCode)())).toBe(true);
  });
});

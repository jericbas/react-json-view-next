import { describe, expect, it } from 'vitest';
import stringifyVariable from '../../src/helpers/stringifyVariable';

describe('stringifyVariable', () => {
  it('stringifyVariable object', () => {
    const test = { a: true };
    expect(stringifyVariable(test)).toBe(JSON.stringify(test, null, '  '));
  });

  it('stringifyVariable array', () => {
    const test = [1, 2, 3];
    expect(stringifyVariable(test)).toBe(JSON.stringify(test, null, '  '));
  });

  it('stringifyVariable integers', () => {
    let test: any = 5;
    expect(stringifyVariable(test)).toBe('5');

    test = -15;
    expect(stringifyVariable(test)).toBe('-15');

    test = 0;
    expect(stringifyVariable(test)).toBe('0');
  });

  it('stringifyVariable floats', () => {
    let test: any = 1.123;
    expect(stringifyVariable(test)).toBe('1.123');

    test = -10.123;
    expect(stringifyVariable(test)).toBe('-10.123');
  });

  it('stringifyVariable booleans', () => {
    let test: any = true;
    expect(stringifyVariable(test)).toBe('true');

    test = false;
    expect(stringifyVariable(test)).toBe('false');
  });

  it('stringifyVariable NaN', () => {
    const test = NaN;
    expect(stringifyVariable(test)).toBe('NaN');
  });

  it('stringifyVariable null', () => {
    const test = null;
    expect(stringifyVariable(test)).toBe('null');
  });

  it('stringifyVariable undefined', () => {
    const test = undefined;
    expect(stringifyVariable(test)).toBe('undefined');
  });

  it('stringifyVariable strings', () => {
    let test = 'test string';
    expect(stringifyVariable(test)).toBe('test string');

    test = '';
    expect(stringifyVariable(test)).toBe('');
  });

  it('stringifyVariable functions', () => {
    function test(e: any) {}
    expect(stringifyVariable(test)).toBe('function test(e) {}');

    const testArrow = (e: any) => {};
    expect(stringifyVariable(testArrow)).toBe('(e) => {}');
  });

  it('stringifyVariable date', () => {
    const test = new Date();
    expect(stringifyVariable(test)).toBe(test.toString());
  });

  it('stringifyVariable regex', () => {
    const regex = /[0-9]/gi;
    expect(stringifyVariable(regex)).toBe(regex.toString());
  });
});

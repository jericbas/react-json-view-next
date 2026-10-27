import { describe, expect, it } from 'vitest';
import parseInput from '../../src/helpers/parseInput';

describe('parseInput', () => {
  it('parseInput array', () => {
    expect(parseInput(JSON.stringify([1, 2, 'test'])).type).toBe('array');
  });

  it('parseInput object', () => {
    expect(parseInput(JSON.stringify({ test: true })).type).toBe('object');
  });

  it('parseInput float', () => {
    expect(parseInput('5.22').type).toBe('float');
  });

  it('parseInput small float', () => {
    expect(parseInput('0.0000002').type).toBe('float');
  });

  it('parseInput scientific notation float', () => {
    expect(parseInput('2e-7').type).toBe('float');
  });

  it('parseInput date', () => {
    expect(parseInput('5/22').type).toBe('date');
  });

  it('parseInput integer', () => {
    expect(parseInput('22').type).toBe('integer');
  });

  it('parseInput scientific notation integer', () => {
    expect(parseInput('4e+8').type).toBe('integer');
  });

  it('parseInput NaN', () => {
    expect(parseInput('nan').type).toBe('nan');
    expect(parseInput('NAN').type).toBe('nan');
  });

  it('parseInput null', () => {
    expect(parseInput('nUlL').type).toBe('null');
    expect(parseInput('NULL').type).toBe('null');
  });

  it('parseInput undefined', () => {
    expect(parseInput('uNdEfiNeD').type).toBe('undefined');
    expect(parseInput('UNDEFINED').type).toBe('undefined');
  });

  it('parseInput boolean', () => {
    expect(parseInput('true').type).toBe('boolean');
    expect(parseInput('False').type).toBe('boolean');
  });

  it('parseInput regex', () => {
    expect(parseInput('/[0-9]/gi').type).toBe(false);
  });

  it('parseInput string', () => {
    expect(parseInput('test').type).toBe(false);
  });
});

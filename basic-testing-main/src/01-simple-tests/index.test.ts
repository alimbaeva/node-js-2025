import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const input = { a: 5, b: 2, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    // Write your test here
  });

  test('should divide two numbers', () => {
    // Write your test here
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
  });

  test('should return null for invalid action', () => {
    // Write your test here
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
  });
});

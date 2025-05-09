import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test.each([
    { input: { a: 2, b: 3, action: Action.Add }, expected: 5 },
    { input: { a: -2, b: 3, action: Action.Add }, expected: 1 },
    { input: { a: 0, b: 0, action: Action.Add }, expected: 0 },
    { input: { a: 1.5, b: 2.5, action: Action.Add }, expected: 4 },
  ])('should add two numbers', ({ input, expected }) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expected);
  });

  test.each([
    { input: { a: 5, b: 2, action: Action.Subtract }, expected: 3 },
    { input: { a: 15, b: 2, action: Action.Subtract }, expected: 13 },
    { input: { a: 10, b: 9, action: Action.Subtract }, expected: 1 },
    { input: { a: 10, b: -9, action: Action.Subtract }, expected: 19 },
    { input: { a: -10, b: -9, action: Action.Subtract }, expected: -1 },
  ])('should subtract two numbers', ({ input, expected }) => {
    const result = simpleCalculator(input);
    expect(result).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const input = { a: 4, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 3, action: '%' };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input1 = { a: '2', b: 3, action: Action.Add };
    const input2 = { a: 2, b: '3', action: Action.Add };
    expect(simpleCalculator(input1)).toBeNull();
    expect(simpleCalculator(input2)).toBeNull();
  });
});

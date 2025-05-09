import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 5, action: Action.Subtract, expected: -2 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: -10, b: 19, action: Action.Subtract, expected: -29 },
  { a: -10, b: -19, action: Action.Subtract, expected: 9 },

  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: -3, b: -3, action: Action.Multiply, expected: 9 },

  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 7, b: 2, action: Action.Divide, expected: 3.5 },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly compute $action of $a and $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test.each([
    { a: 1, b: 2, action: '?' },
    { a: 1, b: 2, action: 'pp' },
    { a: 1, b: 2, action: 'undefined' },
    { a: 1, b: 2, action: '++' },
  ])('should return null for invalid action', ({ a, b, action }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });
});

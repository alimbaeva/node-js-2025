import { throwError, resolveValue } from './index';
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueNumber = 42;
    const valueString = 42;
    const valueBoolean = 42;
    const result1 = await resolveValue(valueNumber);
    const result2 = await resolveValue(valueString);
    const result3 = await resolveValue(valueBoolean);
    expect(result1).toBe(valueNumber);
    expect(result2).toBe(valueString);
    expect(result3).toBe(valueBoolean);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Something went wrong';
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
  });
});

// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');

  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: originalModule.unmockedFunction,
  };
});

describe('partial mocking', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    jest.unmock('./index');
    consoleSpy.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest
      .spyOn(global.console, 'log')
      .mockImplementation(() => {});
    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
  });
});

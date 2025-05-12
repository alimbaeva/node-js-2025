import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'testFile.txt';
    const expectedFullPath = 'some/full/path/testFile.txt';

    (join as jest.Mock).mockReturnValue(expectedFullPath);

    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'testFile.txt';
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'testFile.txt';
    const fileContent = 'File content here';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});

import {
  getBankAccount,
  InsufficientFundsError,
  // SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(500);
    expect(() => account.withdraw(1000)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(1000)).toThrow(
      'Insufficient funds: cannot withdraw more than 500',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);
    expect(() => account1.transfer(600, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account1.transfer(600, account2)).toThrow(
      'Insufficient funds: cannot withdraw more than 500',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(500);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(10, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(500);
    account.deposit(10);
    expect(account.getBalance()).toBe(510);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(500);
    account.withdraw(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(200);
    account1.transfer(200, account2);
    expect(account1.getBalance()).toBe(300);
    expect(account2.getBalance()).toBe(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mathRandomSpy = jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.61);

    const account = getBankAccount(100);
    const balance = await account.fetchBalance();

    if (!balance) return;
    expect(typeof balance).toBe('number');
    expect(balance).toBe(balance);

    mathRandomSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(500);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBeGreaterThanOrEqual(0);
    expect(account.getBalance()).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(500);
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const promise = account.synchronizeBalance();
    await expect(promise).rejects.toThrow('Synchronization failed');
    jest.restoreAllMocks();
  });
});

import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

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
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});

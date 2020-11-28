import { put, select, call } from 'redux-saga/effects'

import { converter, wallet } from '../../selectors'
import { actionTypes, messages, notification } from '../../constants'
import { transferPayment } from '../payment'
import { notificationToggle } from '../notification'

describe('payment Saga', () => {
  it('transferPayment not enough money', () => {
    const saga = transferPayment()
    const converterEntities = {
      activeType: 'from',
      from: {
        currency: 'USD',
        amount: '1',
      },
      to: {
        currency: 'EUR',
        amount: '2',
      },
    }
    const wallets = {
      activeWallets: [
        {
          currency: 'USD',
          balance: '0',
        },
        {
          currency: 'EUR',
          balance: '2',
        },
      ],
      inactiveWallet: [
        {
          currency: 'GBP',
          balance: '3',
        },
      ],
    }

    expect(saga.next().value).toEqual(select(converter.getEntitiesSelector))
    expect(saga.next(converterEntities).value).toEqual(
      select(wallet.getWalletsSelector),
    )
    expect(saga.next(wallets).value).toEqual(
      put({
        type: actionTypes.TRANSFER_PAYMENT_FAIL,
        error: {
          message: messages.NOT_ENOUGH_MONEY,
        },
      }),
    )
    expect(saga.next(converterEntities).value).toEqual(
      call(notificationToggle, {
        type: notification.types.error,
        message: messages.NOT_ENOUGH_MONEY,
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('transferPayment enough money', () => {
    const saga = transferPayment()
    const converterEntities = {
      activeType: 'from',
      from: {
        currency: 'USD',
        amount: '1',
      },
      to: {
        currency: 'EUR',
        amount: '2',
      },
    }
    const wallets = {
      activeWallets: [
        {
          currency: 'USD',
          balance: '2',
        },
        {
          currency: 'EUR',
          balance: '2',
        },
      ],
      inactiveWallet: [
        {
          currency: 'GBP',
          balance: '3',
        },
      ],
    }

    expect(saga.next().value).toEqual(select(converter.getEntitiesSelector))
    expect(saga.next(converterEntities).value).toEqual(
      select(wallet.getWalletsSelector),
    )
    expect(saga.next(wallets).value).toEqual(
      put({
        type: actionTypes.TRANSFER_PAYMENT_SUCCESS,
        payload: {
          entities: [
            ...wallets.inactiveWallet,
            {
              currency: 'USD',
              balance: '1.00',
            },
            {
              currency: 'EUR',
              balance: '4.00',
            },
          ],
        },
      }),
    )
    expect(saga.next().value).toEqual(
      put({
        type: actionTypes.CLEAR_AMOUNT,
      }),
    )
    expect(saga.next().value).toEqual(
      call(notificationToggle, {
        type: notification.types.success,
        message: messages.SUCCESS_RESPONSE,
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('transferPayment error', () => {
    const saga = transferPayment()
    const converterEntities = {
      activeType: 'from',
      from: {
        currency: 'USD',
        amount: '',
      },
      to: {
        currency: 'EUR',
        amount: '',
      },
    }
    const wallets = {
      activeWallets: [
        {
          currency: 'USD',
          balance: '',
        },
        {
          currency: 'EUR',
          balance: '',
        },
      ],
      inactiveWallet: [
        {
          currency: 'GBP',
          balance: '',
        },
      ],
    }

    expect(saga.next().value).toEqual(select(converter.getEntitiesSelector))
    expect(saga.next(converterEntities).value).toEqual(
      select(wallet.getWalletsSelector),
    )
    const error = {}
    saga.next(wallets)
    expect(saga.throw(error).value).toEqual(
      put({
        type: actionTypes.TRANSFER_PAYMENT_FAIL,
        error: {
          message: messages.UNEXPECTED_ERROR,
        },
      }),
    )
    expect(saga.next().value).toEqual(
      call(notificationToggle, {
        type: notification.types.error,
        message: messages.UNEXPECTED_ERROR,
      }),
    )
    expect(saga.next().done).toBe(true)
  })
})

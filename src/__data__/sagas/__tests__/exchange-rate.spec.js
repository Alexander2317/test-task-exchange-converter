import { put, call, select, delay } from 'redux-saga/effects'

import { converter } from '../../selectors'
import {
  actionTypes,
  base,
  messages,
  notification,
  routes,
} from '../../constants'
import { getExchangeRate } from '../exchange-rate'
import { fetchApi } from '../utils'
import priceRation from '../price-ratio'
import { updateAmount } from '../converter'
import { notificationToggle } from '../notification'

describe('priceRatio Saga', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('getExchangeRate success response', () => {
    const saga = getExchangeRate()
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

    expect(saga.next().value).toEqual(select(converter.getEntitiesSelector))
    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.GET_EXCHANGE_RATE_START,
      }),
    )
    expect(saga.next().value).toEqual(
      call(fetchApi, `${routes.api}?base=USD&symbols=EUR`),
    )
    const data = {
      data: {
        rates: { EUR: 0.5 },
        base: 'USD',
        date: '2020-11-27',
      },
    }
    expect(saga.next(data).value).toEqual(
      put({
        type: actionTypes.GET_EXCHANGE_RATE_SUCCESS,
        payload: { rate: 0.5 },
      }),
    )
    expect(saga.next(data).value).toEqual(call(priceRation, 0.5))
    expect(saga.next(data).value).toEqual(call(updateAmount, 'from'))
    expect(saga.next(data).value).toEqual(delay(base.DELAY_REFETCH_RATE))
    expect(saga.next(data).value).toEqual(
      put({
        type: actionTypes.REFETCH_EXCHANGE_RATE,
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('getExchangeRate response failed', () => {
    const saga = getExchangeRate()
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

    expect(saga.next().value).toEqual(select(converter.getEntitiesSelector))
    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.GET_EXCHANGE_RATE_START,
      }),
    )
    expect(saga.next().value).toEqual(
      call(fetchApi, `${routes.api}?base=USD&symbols=EUR`),
    )
    const data = {
      data: {},
    }
    expect(saga.next(data).value).toEqual(
      put({
        type: actionTypes.GET_EXCHANGE_RATE_FAIL,
        error: {
          message: messages.ERROR_RESPONSE,
        },
      }),
    )
    expect(saga.next(data).value).toEqual(
      call(notificationToggle, {
        type: notification.types.error,
        message: messages.ERROR_RESPONSE,
      }),
    )
    expect(saga.next().done).toBe(true)
  })
})

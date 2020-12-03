import { put, call, select, delay } from 'redux-saga/effects'

import { currencies } from '../../../config'
import { converter } from '../../selectors'
import {
  actionTypes,
  base,
  messages,
  notification,
  routes,
  converterTypes,
} from '../../constants'
import { getExchangeRate } from '../exchange-rate'
import { fetchApi } from '../utils'
import priceRatio from '../price-ratio'
import { updateAmount } from '../converter'
import { notificationToggle } from '../notification'

describe('priceRatio Saga', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('getExchangeRate success response', () => {
    const saga = getExchangeRate()
    const converterEntities = {
      activeType: converterTypes.FROM,
      from: {
        currency: currencies.USD,
        amount: '1',
      },
      to: {
        currency: currencies.EUR,
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
      call(
        fetchApi,
        `${routes.api}?base=${currencies.USD}&symbols=${currencies.EUR}`,
      ),
    )
    const data = {
      data: {
        rates: { EUR: 0.5 },
        base: currencies.USD,
        date: '2020-11-27',
      },
    }
    expect(saga.next(data).value).toEqual(
      put({
        type: actionTypes.GET_EXCHANGE_RATE_SUCCESS,
        payload: { rate: 0.5 },
      }),
    )
    expect(saga.next(data).value).toEqual(call(priceRatio, 0.5))
    expect(saga.next(data).value).toEqual(
      call(updateAmount, converterTypes.FROM),
    )
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
      activeType: converterTypes.FROM,
      from: {
        currency: currencies.USD,
        amount: '1',
      },
      to: {
        currency: currencies.EUR,
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
      call(
        fetchApi,
        `${routes.api}?base=${currencies.USD}&symbols=${currencies.EUR}`,
      ),
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

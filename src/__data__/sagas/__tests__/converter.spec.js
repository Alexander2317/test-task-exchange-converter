import { put, select, call } from 'redux-saga/effects'

import { currencies } from '../../../config'
import { actionTypes, base, converterTypes } from '../../constants'
import { converter as converterSelectors, exchangeRate } from '../../selectors'
import { changeAmount, updateAmount, changeCurrency } from '../converter'

describe('converter Saga', () => {
  it('changeAmount count type from', () => {
    const action = {
      payload: { type: converterTypes.FROM, value: '1' },
    }
    const saga = changeAmount(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: converterTypes.FROM,
      from: {
        currency: currencies.USD,
        amount: base.ZERO,
      },
      to: {
        currency: currencies.EUR,
        amount: base.ZERO,
      },
    }
    const exchangeRateEntities = {
      rate: 1,
    }
    expect(saga.next(converterEntities).value).toEqual(
      select(exchangeRate.getEntitiesSelector),
    )
    expect(saga.next(exchangeRateEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_AMOUNT_SUCCESS,
        payload: {
          activeType: converterTypes.FROM,
          from: {
            amount: '1',
            currency: currencies.USD,
          },
          to: {
            amount: '1.00',
            currency: currencies.EUR,
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeAmount count type to', () => {
    const action = {
      payload: { type: converterTypes.TO, value: '1' },
    }
    const saga = changeAmount(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: converterTypes.TO,
      from: {
        currency: currencies.USD,
        amount: base.ZERO,
      },
      to: {
        currency: currencies.EUR,
        amount: base.ZERO,
      },
    }
    const exchangeRateEntities = {
      rate: 1,
    }
    expect(saga.next(converterEntities).value).toEqual(
      select(exchangeRate.getEntitiesSelector),
    )
    expect(saga.next(exchangeRateEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_AMOUNT_SUCCESS,
        payload: {
          activeType: converterTypes.TO,
          from: {
            amount: '1.00',
            currency: currencies.USD,
          },
          to: {
            amount: '1',
            currency: currencies.EUR,
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('updateAmount check exactly the same values', () => {
    const saga = updateAmount()

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: converterTypes.FROM,
      from: {
        currency: currencies.USD,
        amount: base.ZERO,
      },
      to: {
        currency: currencies.EUR,
        amount: base.ZERO,
      },
    }
    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.AMOUNT_IS_THE_SAME,
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('updateAmount count type from', () => {
    const saga = updateAmount()

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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
    expect(saga.next(converterEntities).value).toEqual(
      call(changeAmount, {
        payload: { type: converterTypes.FROM, value: '1' },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('updateAmount count type to', () => {
    const saga = updateAmount()

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: converterTypes.TO,
      from: {
        currency: currencies.USD,
        amount: '1',
      },
      to: {
        currency: currencies.EUR,
        amount: '2',
      },
    }
    expect(saga.next(converterEntities).value).toEqual(
      call(changeAmount, {
        payload: { type: converterTypes.TO, value: '2' },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type from', () => {
    const action = {
      payload: { type: converterTypes.FROM, value: currencies.GBP },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: converterTypes.FROM,
          from: {
            currency: currencies.GBP,
            amount: '1',
          },
          to: {
            currency: currencies.EUR,
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type from with exactly the same currency', () => {
    const action = {
      payload: { type: converterTypes.FROM, value: currencies.EUR },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: converterTypes.FROM,
          from: {
            currency: currencies.EUR,
            amount: '1',
          },
          to: {
            currency: currencies.USD,
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type to', () => {
    const action = {
      payload: { type: converterTypes.TO, value: currencies.GBP },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: converterTypes.FROM,
          from: {
            currency: currencies.USD,
            amount: '1',
          },
          to: {
            currency: currencies.GBP,
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type to with exactly the same currency', () => {
    const action = {
      payload: { type: converterTypes.TO, value: currencies.USD },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: converterTypes.FROM,
          from: {
            currency: currencies.EUR,
            amount: '1',
          },
          to: {
            currency: currencies.USD,
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })
})

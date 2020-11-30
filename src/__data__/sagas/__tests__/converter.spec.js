import { put, select, call } from 'redux-saga/effects'

import { actionTypes } from '../../constants'
import { converter as converterSelectors, priceRation } from '../../selectors'
import { changeAmount, updateAmount, changeCurrency } from '../converter'

describe('converter Saga', () => {
  it('changeAmount count type from', () => {
    const action = {
      payload: { type: 'from', value: '1' },
    }
    const saga = changeAmount(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: 'from',
      from: {
        currency: 'USD',
        amount: '0',
      },
      to: {
        currency: 'EUR',
        amount: '0',
      },
    }
    const priceRatioEntities = {
      from: '1',
      to: '2',
    }
    expect(saga.next(converterEntities).value).toEqual(
      select(priceRation.getEntitiesSelector),
    )
    expect(saga.next(priceRatioEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_AMOUNT_SUCCESS,
        payload: {
          activeType: 'from',
          from: {
            amount: '1',
            currency: 'USD',
          },
          to: {
            amount: '2.00',
            currency: 'EUR',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeAmount count type to', () => {
    const action = {
      payload: { type: 'to', value: '1' },
    }
    const saga = changeAmount(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
    const converterEntities = {
      activeType: 'to',
      from: {
        currency: 'USD',
        amount: '0',
      },
      to: {
        currency: 'EUR',
        amount: '0',
      },
    }
    const priceRatioEntities = {
      from: '1',
      to: '2',
    }
    expect(saga.next(converterEntities).value).toEqual(
      select(priceRation.getEntitiesSelector),
    )
    expect(saga.next(priceRatioEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_AMOUNT_SUCCESS,
        payload: {
          activeType: 'to',
          from: {
            amount: '0.50',
            currency: 'USD',
          },
          to: {
            amount: '1',
            currency: 'EUR',
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
      activeType: 'from',
      from: {
        currency: 'USD',
        amount: '0',
      },
      to: {
        currency: 'EUR',
        amount: '0',
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
    expect(saga.next(converterEntities).value).toEqual(
      call(changeAmount, {
        payload: { type: 'from', value: '1' },
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
      activeType: 'to',
      from: {
        currency: 'USD',
        amount: '1',
      },
      to: {
        currency: 'EUR',
        amount: '2',
      },
    }
    expect(saga.next(converterEntities).value).toEqual(
      call(changeAmount, {
        payload: { type: 'to', value: '2' },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type from', () => {
    const action = {
      payload: { type: 'from', value: 'GBP' },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: 'from',
          from: {
            currency: 'GBP',
            amount: '1',
          },
          to: {
            currency: 'EUR',
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type from with exactly the same currency', () => {
    const action = {
      payload: { type: 'from', value: 'EUR' },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: 'from',
          from: {
            currency: 'EUR',
            amount: '1',
          },
          to: {
            currency: 'USD',
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type to', () => {
    const action = {
      payload: { type: 'to', value: 'GBP' },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: 'to',
          from: {
            currency: 'USD',
            amount: '1',
          },
          to: {
            currency: 'GBP',
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })

  it('changeCurrency set type to with exactly the same currency', () => {
    const action = {
      payload: { type: 'to', value: 'USD' },
    }
    const saga = changeCurrency(action)

    expect(saga.next().value).toEqual(
      select(converterSelectors.getEntitiesSelector),
    )
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

    expect(saga.next(converterEntities).value).toEqual(
      put({
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        payload: {
          activeType: 'to',
          from: {
            currency: 'EUR',
            amount: '1',
          },
          to: {
            currency: 'USD',
            amount: '2',
          },
        },
      }),
    )
    expect(saga.next().done).toBe(true)
  })
})

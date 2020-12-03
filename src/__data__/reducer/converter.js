// @flow

import type { ConverterDataParams, ConverterTypes } from '../../types/common'
import { currencies } from '../../config'
import { actionTypes, converterTypes, base } from '../constants'

type State = {
  entities: {
    activeType: ConverterTypes,
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
}

type Action = {
  type: string,
  payload: {
    activeType: ConverterTypes,
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
}

const initialState = {
  entities: {
    activeType: converterTypes.FROM,
    from: {
      amount: base.ZERO,
      currency: currencies.USD,
    },
    to: {
      amount: base.ZERO,
      currency: currencies.EUR,
    },
  },
}

const converter = (state: State = initialState, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.CHANGE_AMOUNT_SUCCESS:
      return {
        ...state,
        entities: {
          ...payload,
        },
      }
    case actionTypes.CLEAR_AMOUNT:
      return {
        ...state,
        entities: {
          activeType: state.entities.activeType,
          from: {
            amount: base.ZERO,
            currency: state.entities.from.currency,
          },
          to: {
            amount: base.ZERO,
            currency: state.entities.to.currency,
          },
        },
      }
    case actionTypes.CHANGE_CURRENCY_SUCCESS:
      return {
        ...state,
        entities: {
          ...payload,
        },
      }
    default:
      return state
  }
}

export default converter

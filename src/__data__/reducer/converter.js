// @flow

import type { ConverterDataParams } from '../../types/common-types'
import { actionTypes } from '../constants'

type State = {
  entities: {
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
}

type Action = {
  type: string,
  payload: {
    entities: {
      from: ConverterDataParams,
      to: ConverterDataParams,
    },
  },
}

const initialState = {
  entities: {
    from: {
      amount: 0,
      currency: 'USD',
    },
    to: {
      amount: 0,
      currency: 'EUR',
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
          ...payload.entities,
        },
      }
    case actionTypes.CHANGE_CURRENCY_SUCCESS:
      return {
        ...state,
        entities: {
          ...payload.entities,
        },
      }
    default:
      return state
  }
}

export default converter
// @flow

import type { PriceRation } from '../../types/common'
import { actionTypes } from '../constants'

type State = {
  entities: PriceRation,
}

type Action = {
  type: string,
  payload: PriceRation,
}

const initialState = {
  entities: {
    from: '',
    to: '',
  },
}

const priceRation = (state: State = initialState, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.COUNT_PRICE_RATIO:
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

export default priceRation

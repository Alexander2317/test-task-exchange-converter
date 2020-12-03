// @flow

import type { PriceRatio } from '../../types/common'
import { actionTypes } from '../constants'

type State = {
  entities: PriceRatio,
}

type Action = {
  type: string,
  payload: PriceRatio,
}

const initialState = {
  entities: {
    from: '',
    to: '',
  },
}

const priceRatio = (state: State = initialState, action: Action): State => {
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

export default priceRatio

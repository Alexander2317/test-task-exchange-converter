// @flow

import { actionTypes } from '../constants'

type State = {
  loading: boolean,
  entities: {
    rate: number,
  },
  error: string,
}

type Action = {
  type: string,
  payload: {
    rate: number,
  },
  error: {
    message: string,
  },
}

const initialState = {
  loading: false,
  entities: {
    rate: 0,
  },
  error: '',
}

const exchangeRate = (state: State = initialState, action: Action): State => {
  const { type, payload, error } = action

  switch (type) {
    case actionTypes.GET_EXCHANGE_RATE_START:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case actionTypes.GET_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: {
          rate: payload.rate,
        },
        error: '',
      }
    case actionTypes.GET_EXCHANGE_RATE_FAIL:
      return {
        ...state,
        loading: false,
        error: error.message,
      }
    default:
      return state
  }
}

export default exchangeRate

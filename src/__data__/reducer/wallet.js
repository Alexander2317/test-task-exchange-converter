// @flow

import type { Wallet } from '../../types/common-types'
import { actionTypes } from '../constants'
import { walletList } from '../../config'

type State = {
  loading: boolean,
  entities: Array<Wallet>,
  error: string,
}

type Action = {
  type: string,
  payload: {
    entities: Array<Wallet>,
    error: {
      messages: string,
    },
  },
}

const initialState = {
  loading: false,
  entities: walletList,
  error: '',
}

const wallet = (state: State = initialState, action: Action): State => {
  const { type, payload, error } = action

  switch (type) {
    case actionTypes.TRANSFER_PAYMENT_START:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case actionTypes.TRANSFER_PAYMENT_SUCCESS:
      return {
        ...state,
        entities: [...payload.entities],
        loading: false,
        error: '',
      }
    case actionTypes.TRANSFER_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: error.message,
      }
    default:
      return state
  }
}

export default wallet

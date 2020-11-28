// @flow

import { actionTypes } from '../constants'

type State = {
  show: boolean,
  type: string,
  message: string,
}

type Action = {
  type: string,
  payload: {
    type: string,
    message: string,
  },
}

const initialState = {
  show: false,
  type: '',
  message: '',
}

const notification = (state: State = initialState, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        show: true,
        type: payload.type,
        message: payload.message,
      }
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        show: false,
        type: '',
        message: '',
      }
    default:
      return state
  }
}

export default notification

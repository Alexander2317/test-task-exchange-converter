// @flow

import { messages } from '../../constants'

const fetchApi = async (
  url: string,
): Promise<{ data: Object, error: string }> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return {
        data: {},
        error: messages.ERROR_RESPONSE,
      }
    }
    const data = await response.json()
    return { data, error: '' }
  } catch (error) {
    return {
      data: {},
      error: messages.ERROR_RESPONSE,
    }
  }
}

export default fetchApi

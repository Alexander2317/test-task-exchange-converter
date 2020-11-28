// @flow

export type Action = {
  type: string,
  payload?: any,
}

export type Currency = 'USD' | 'EUR' | 'GBP'

export type ConverterTypes = 'from' | 'to'

export type ConverterDataParams = {
  amount: number | string,
  currency: Currency,
}

export type PriceRation = {
  from: string,
  to: string,
}
export type Wallet = {
  currency: Currency,
  balance: string | number,
}

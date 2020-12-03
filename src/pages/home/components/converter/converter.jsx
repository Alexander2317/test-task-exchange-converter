// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import type { ConverterDataParams, PriceRatio } from '../../../../types/common'
import { currencies, currencySymbols } from '../../../../config'
import { actions, constants, selectors } from '../../../../__data__'
import { RateRatio } from '../../../../components'

import { Control } from './components'

type Props = {
  converterEntities: {
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
  priceRatioEntities: PriceRatio,
  changeAmountAction: Function,
  changeCurrencyAction: Function,
  getRateAction: Function,
  exchangeRateLoading: boolean,
}

const Converter = (props: Props): React.Node => {
  const {
    converterEntities,
    priceRatioEntities,
    changeAmountAction,
    changeCurrencyAction,
    getRateAction,
    exchangeRateLoading,
  } = props
  const currencySymbolFrom = currencySymbols[converterEntities.from.currency]
  const currencySymbolTo = currencySymbols[converterEntities.to.currency]

  const handleChangeInputFrom = (value) => {
    changeAmountAction({ type: constants.converterTypes.FROM, value })
  }
  const handleChangeInputTo = (value) => {
    changeAmountAction({ type: constants.converterTypes.TO, value })
  }

  const handleChangeSelectFrom = (value) => {
    changeCurrencyAction({ type: constants.converterTypes.FROM, value })
    getRateAction()
  }
  const handleChangeSelectTo = (value) => {
    changeCurrencyAction({ type: constants.converterTypes.TO, value })
    getRateAction()
  }

  return (
    <>
      <Control
        inputId="amount-from"
        inputName="amount-from"
        inputValue={converterEntities.from.amount}
        inputHandleChange={handleChangeInputFrom}
        selectId="currency-from"
        selectName="currency-from"
        selectValue={converterEntities.from.currency}
        selectHandleChange={handleChangeSelectFrom}
        selectOptions={currencies.options}
      />
      <RateRatio
        loading={exchangeRateLoading}
        currencySymbolLeft={currencySymbolFrom}
        currencySymbolRight={currencySymbolTo}
        rate={priceRatioEntities.to}
      />
      <Control
        inputId="amount-to"
        inputName="amount-to"
        inputValue={converterEntities.to.amount}
        inputHandleChange={handleChangeInputTo}
        selectId="currency-to"
        selectName="currency-to"
        selectValue={converterEntities.to.currency}
        selectHandleChange={handleChangeSelectTo}
        selectOptions={currencies.options}
      />
      <RateRatio
        loading={exchangeRateLoading}
        currencySymbolLeft={currencySymbolTo}
        currencySymbolRight={currencySymbolFrom}
        rate={priceRatioEntities.from}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  converterEntities: selectors.converter.getEntitiesSelector(state),
  priceRatioEntities: selectors.priceRatio.getEntitiesSelector(state),
  exchangeRateLoading: selectors.exchangeRate.getLoadingSelector(state),
})

const mapDispatchToProps = {
  changeAmountAction: actions.converter.changeAmount,
  changeCurrencyAction: actions.converter.changeCurrency,
  getRateAction: actions.exchangeRate.getRate,
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(Converter): React.AbstractComponent<{}>)

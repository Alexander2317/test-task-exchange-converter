// @flow

import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'
import { connect } from 'react-redux'

import type { ConverterDataParams } from '../../../../types/common'
import { actions, constants, selectors } from '../../../../__data__'

const useStyles = makeStyles({
  button: {
    position: 'relative',
    width: '100%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
})

type Props = {
  converterEntities: {
    from: ConverterDataParams,
    to: ConverterDataParams,
  },
  transferPaymentAction: Function,
  exchangeRateLoading: boolean,
  loadingPayment: boolean,
}

const ButtonTransfer = (props: Props): React.Node => {
  const {
    converterEntities,
    transferPaymentAction,
    exchangeRateLoading,
    loadingPayment,
  } = props

  const styles = useStyles()

  const checkDisabledButton =
    Number(converterEntities.from.amount) === Number(constants.base.ZERO) &&
    Number(converterEntities.to.amount) === Number(constants.base.ZERO)
  const checkLoading = exchangeRateLoading || loadingPayment

  return (
    <Button
      className={styles.button}
      variant="outlined"
      disabled={checkDisabledButton || checkLoading}
      onClick={transferPaymentAction}
    >
      {checkLoading && <CircularProgress size={20} className={styles.loader} />}
      transfer payment
    </Button>
  )
}

const mapStateToProps = (state) => ({
  converterEntities: selectors.converter.getEntitiesSelector(state),
  loadingPayment: selectors.wallet.getLoadingSelector(state),
  exchangeRateLoading: selectors.exchangeRate.getLoadingSelector(state),
})

const mapDispatchToProps = { transferPaymentAction: actions.payment.transfer }

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonTransfer): React.AbstractComponent<{}>)

// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

import type { Wallet as WalletProps } from '../../../../types/common'
import { currencySymbols } from '../../../../config'
import { selectors } from '../../../../__data__'

type Props = {
  wallets: {
    activeWallets: Array<WalletProps>,
  },
}

const Wallet = ({ wallets: { activeWallets } }: Props): React.Node => (
  <>
    <Typography variant="body2">Balance</Typography>
    {activeWallets.map((item) => (
      <Typography key={`wallet-${item.currency}`} variant="h4">
        {item.balance} {currencySymbols[item.currency]}
      </Typography>
    ))}
  </>
)

const mapStateToProps = (state) => ({
  wallets: selectors.wallet.getWalletsSelector(state),
})

export default (connect(mapStateToProps)(Wallet): React.AbstractComponent<{}>)

// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'

import { actions } from '../../__data__'
import { CenteredContent } from '../../components'

import { Wallet, Converter, Notification, ButtonTransfer } from './components'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: '95%',
  },
})

type Props = {
  getRateAction: Function,
}

const Home = (props: Props): React.Node => {
  const { useEffect } = React
  const { getRateAction } = props
  const styles = useStyles()

  useEffect(() => {
    getRateAction()
  }, [])

  return (
    <CenteredContent>
      <Box className={styles.root} my={3} mx="auto">
        <Typography variant="h3" align="center">
          Exchange
        </Typography>
        <Box my={2}>
          <Wallet />
          <Converter />
        </Box>
        <ButtonTransfer />
        <Notification />
      </Box>
    </CenteredContent>
  )
}

const mapDispatchToProps = { getRateAction: actions.exchangeRate.getRate }

export default (connect(
  null,
  mapDispatchToProps,
)(Home): React.AbstractComponent<Props>)

// @flow

import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

type Props = {
  loading: boolean,
  currencySymbolLeft: string,
  currencySymbolRight: string,
  rate: string,
}

const RateRatio = ({
  loading,
  currencySymbolLeft,
  currencySymbolRight,
  rate,
}: Props): React.Node => (
  <Box my={1}>
    <Typography variant="caption">
      {loading ? (
        <CircularProgress size={10} />
      ) : (
        <>
          1 {currencySymbolLeft} = {rate} {currencySymbolRight}
        </>
      )}
    </Typography>
  </Box>
)

export default RateRatio

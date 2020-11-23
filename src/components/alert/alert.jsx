// @flow

import * as React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MUIAlert from '@material-ui/lab/Alert'

type Props = {
  open: boolean,
  text: string,
  error?: { message: string },
}

const Alert = ({ open, error, text }: Props): React.Node => (
  <Snackbar open={open}>
    <MUIAlert severity={error?.message ? 'error' : 'success'}>
      {error?.message ? error.message : text}
    </MUIAlert>
  </Snackbar>
)

Alert.defaultProps = {
  error: {
    message: '',
  },
}

export default Alert

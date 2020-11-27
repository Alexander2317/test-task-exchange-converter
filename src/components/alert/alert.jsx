// @flow

import * as React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MUIAlert from '@material-ui/lab/Alert'

type Props = {
  open: boolean,
  text: string,
  type: string,
}

const Alert = ({ open, type, text }: Props): React.Node => (
  <Snackbar open={open}>
    <MUIAlert severity={type}>{text}</MUIAlert>
  </Snackbar>
)

export default Alert

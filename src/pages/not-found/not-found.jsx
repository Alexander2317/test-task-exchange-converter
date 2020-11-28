// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import { constants } from '../../__data__'
import { CenteredContent } from '../../components'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

const NotFound = (): React.Node => {
  const styles = useStyles()
  return (
    <CenteredContent classNameContainer={styles.root}>
      <Typography variant="h2">404</Typography>
      <Typography variant="body1">Page not found</Typography>
      <br />
      <Button component={Link} to={constants.routes.home} variant="outlined">
        Go back to the main page
      </Button>
    </CenteredContent>
  )
}

export default NotFound

// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import { constants } from '../../__data__'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    textAlign: 'center',
  },
})

const NotFound = (): React.Node => {
  const styles = useStyles()
  return (
    <Paper className={styles.root}>
      <Grid
        container
        direction="column"
        justify="center"
        className={styles.root}
      >
        <Grid item>
          <Typography variant="h2">404</Typography>
          <Typography variant="body1">Page not found</Typography>
          <br />
          <Button
            component={Link}
            to={constants.routes.home}
            color="primary"
            variant="contained"
          >
            Go back to the main page
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default NotFound

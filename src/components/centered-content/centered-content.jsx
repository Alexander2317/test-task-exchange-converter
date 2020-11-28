// @flow

import * as React from 'react'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
})

type Props = {
  children: React.Node,
  classNameContainer?: string,
  classNameItem?: string,
}

const CenteredContent = ({
  children,
  classNameContainer,
  classNameItem,
}: Props): React.Node => {
  const styles = useStyles()
  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classNames(styles.root, classNameContainer)}
    >
      <Grid item className={classNameItem}>
        {children}
      </Grid>
    </Grid>
  )
}

CenteredContent.defaultProps = {
  classNameContainer: '',
  classNameItem: '',
}

export default CenteredContent

// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import { selectors } from '../../../../__data__'
import { Alert } from '../../../../components'

type Props = {
  showNotification: boolean,
  typeNotification: string,
  messageNotification: string,
}

const Notification = ({
  showNotification,
  typeNotification,
  messageNotification,
}: Props) =>
  !!showNotification && (
    <Alert
      open={showNotification}
      type={typeNotification}
      text={messageNotification}
    />
  )

const mapStateToProps = (state) => ({
  showNotification: selectors.notification.getShowSelector(state),
  typeNotification: selectors.notification.getTypeSelector(state),
  messageNotification: selectors.notification.getMessageSelector(state),
})

export default (connect(mapStateToProps)(
  Notification,
): React.AbstractComponent<{}>)

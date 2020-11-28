// @flow

import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import { constants } from '../__data__'

import Home from './home'
import NotFound from './not-found'

const { routes } = constants

const Pages = (): React.Node => (
  <Switch>
    <Redirect exact strict from={routes.index} to={routes.home} />
    <Route exact strict path={routes.home} component={Home} />
    <Route exact strict path={routes.home} component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default Pages

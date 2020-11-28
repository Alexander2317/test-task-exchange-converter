// @flow

import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './home'
import NotFound from './not-found'

import { constants } from '../__data__'

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

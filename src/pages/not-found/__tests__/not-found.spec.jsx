import * as React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Router } from 'react-router-dom'

import { MaterialUIWrapper } from '../../../../tests/wrapper'
import { history } from '../../../__data__'
import NotFound from '../not-found'

describe('<NotFound />', () => {
  const Wrapper = ({ children }) => {
    const mockStore = configureStore()
    const store = mockStore({})

    return (
      <MaterialUIWrapper>
        <Provider store={store}>
          <Router history={history}>{children}</Router>
        </Provider>
      </MaterialUIWrapper>
    )
  }
  it('should be defined', () => {
    const component = shallow(
      <Wrapper>
        <NotFound />
      </Wrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return text', () => {
    const component = mount(
      <Wrapper>
        <NotFound />
      </Wrapper>,
    )

    expect(component.text()).toBe('404Page not foundGo back to the main page')
  })

  it('snapshot', () => {
    const component = mount(
      <Wrapper>
        <NotFound />
      </Wrapper>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

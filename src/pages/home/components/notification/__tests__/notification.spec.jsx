import * as React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MaterialUIWrapper } from '../../../../../../tests/wrapper'
import Notification from '../notification'

describe('<Notification />', () => {
  const Wrapper = ({ children }) => {
    const mockStore = configureStore()
    const store = mockStore({
      notification: {
        show: true,
        type: 'success',
        message: 'hello',
      },
    })

    return <Provider store={store}>{children}</Provider>
  }

  it('should be defined', () => {
    const component = shallow(
      <MaterialUIWrapper>
        <Wrapper>
          <Notification />
        </Wrapper>
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return text', () => {
    const wrapper = mount(
      <MaterialUIWrapper>
        <Wrapper>
          <Notification />
        </Wrapper>
      </MaterialUIWrapper>,
    )
    expect(wrapper.text()).toBe('hello')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <MaterialUIWrapper>
        <Wrapper>
          <Notification />
        </Wrapper>
      </MaterialUIWrapper>,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

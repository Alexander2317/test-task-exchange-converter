import * as React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MaterialUIWrapper } from '../../../../../../tests/wrapper'
import { constants } from '../../../../../__data__'
import Wallet from '../wallet'

describe('<Wallet />', () => {
  const Wrapper = ({ children }) => {
    const mockStore = configureStore()
    const store = mockStore({
      converter: {
        entities: {
          activeType: constants.converterTypes.FROM,
          from: {
            amount: constants.base.ZERO,
            currency: 'USD',
          },
          to: {
            amount: constants.base.ZERO,
            currency: 'EUR',
          },
        },
      },
      wallet: {
        loading: false,
        entities: [
          {
            currency: 'EUR',
            balance: '456',
          },
          {
            currency: 'GBP',
            balance: '789',
          },
          {
            currency: 'USD',
            balance: '123',
          },
        ],
        error: '',
      },
    })

    return <Provider store={store}>{children}</Provider>
  }

  it('should be defined', () => {
    const component = shallow(
      <MaterialUIWrapper>
        <Wrapper>
          <Wallet />
        </Wrapper>
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return text', () => {
    const wrapper = mount(
      <MaterialUIWrapper>
        <Wrapper>
          <Wallet />
        </Wrapper>
      </MaterialUIWrapper>,
    )
    expect(wrapper.text()).toBe('Balance123 $456 €')
  })

  it('snapshot', () => {
    const wrapper = mount(
      <MaterialUIWrapper>
        <Wrapper>
          <Wallet />
        </Wrapper>
      </MaterialUIWrapper>,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

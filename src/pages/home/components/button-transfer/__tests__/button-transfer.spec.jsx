import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MaterialUIWrapper } from '../../../../../../tests/wrapper'
import { constants } from '../../../../../__data__'
import ButtonTransfer from '../button-transfer'

describe('<ButtonTransfer />', () => {
  it('should be defined', () => {
    const mockStore = configureStore()
    const store = mockStore({})

    const component = shallow(
      <MaterialUIWrapper>
        <Provider store={store}>
          <ButtonTransfer />
        </Provider>
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return text', () => {
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
      exchangeRate: {
        loading: false,
        entities: {
          rate: 0,
        },
        error: '',
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

    const component = mount(
      <MaterialUIWrapper>
        <Provider store={store}>
          <ButtonTransfer />
        </Provider>
      </MaterialUIWrapper>,
    )

    expect(component.text()).toBe('transfer payment')
  })

  it('snapshot', () => {
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
      exchangeRate: {
        loading: false,
        entities: {
          rate: 0,
        },
        error: '',
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

    const component = mount(
      <MaterialUIWrapper>
        <Provider store={store}>
          <ButtonTransfer />
        </Provider>
      </MaterialUIWrapper>,
    )

    expect(toJson(component)).toMatchSnapshot()
  })
})

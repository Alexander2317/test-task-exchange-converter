import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Router } from 'react-router-dom'

import { MaterialUIWrapper } from '../../../tests/wrapper'
import { history, constants } from '../../__data__'
import Pages from '../pages'

describe('<Pages />', () => {
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
      priceRatio: {
        entities: {
          from: '5',
          to: '6',
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
      notification: {
        show: false,
        type: '',
        message: '',
      },
    })

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
        <Pages />
      </Wrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return text', () => {
    const component = mount(
      <Wrapper>
        <Pages />
      </Wrapper>,
    )

    expect(component.text()).toBe(
      'ExchangeBalance123 $456 €USD1 $ = 6 €EUR1 € = 5 $transfer payment',
    )
  })
})

import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { MaterialUIWrapper } from '../../../../../../tests/wrapper'
import { constants } from '../../../../../__data__'
import Converter from '../converter'

describe('<Converter />', () => {
  it('should be defined', () => {
    const mockStore = configureStore()
    const store = mockStore({})

    const component = shallow(
      <MaterialUIWrapper>
        <Provider store={store}>
          <Converter />
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
    })

    const component = mount(
      <MaterialUIWrapper>
        <Provider store={store}>
          <Converter />
        </Provider>
      </MaterialUIWrapper>,
    )

    expect(component.text()).toBe('USD1 $ = 6 €EUR1 € = 5 $')
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
    })

    const component = shallow(
      <MaterialUIWrapper>
        <Provider store={store}>
          <Converter />
        </Provider>
      </MaterialUIWrapper>,
    )

    expect(toJson(component)).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../tests/wrapper'
import RateRatio from '../rate-ratio'

describe('<RateRatio />', () => {
  it('should be defined', () => {
    const props = {
      loading: false,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = shallow(
      <MaterialUIWrapper>
        <RateRatio {...props} />
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return correct values', () => {
    const props = {
      loading: false,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = mount(
      <MaterialUIWrapper>
        <RateRatio {...props} />
      </MaterialUIWrapper>,
    )

    expect(component.text()).toBe('1 usd = 0.5 gbp')
  })

  it('snapshot', () => {
    const props = {
      loading: false,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = mount(
      <MaterialUIWrapper>
        <RateRatio {...props} />
      </MaterialUIWrapper>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

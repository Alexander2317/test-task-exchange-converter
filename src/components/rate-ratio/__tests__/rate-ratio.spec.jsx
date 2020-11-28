import React from 'react'
import { shallow, mount } from 'enzyme'
import CircularProgress from '@material-ui/core/CircularProgress'

import RateRatio from '../rate-ratio'

describe('<RateRatio />', () => {
  it('should be defined', () => {
    const props = {
      loading: false,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = shallow(<RateRatio {...props} />)

    expect(component).toBeDefined()
  })

  it('should return correct values', () => {
    const props = {
      loading: false,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = mount(<RateRatio {...props} />)

    expect(component.text()).toBe('1 usd = 0.5 gbp')
  })

  it('should return loader', () => {
    const props = {
      loading: true,
      currencySymbolLeft: 'usd',
      currencySymbolRight: 'gbp',
      rate: '0.5',
    }
    const component = mount(<RateRatio {...props} />)

    expect(component.contains(CircularProgress)).toBe(true)
  })
})

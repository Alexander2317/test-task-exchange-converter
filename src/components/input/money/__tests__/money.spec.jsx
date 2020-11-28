import React from 'react'
import { shallow, mount } from 'enzyme'

import Money from '../money'

describe('<Money />', () => {
  it('should be defined', () => {
    const props = {
      id: 'test',
      name: 'name',
      value: '1',
      handleChange: jest.fn(),
    }
    const component = shallow(<Money {...props} />)

    expect(component).toBeDefined()
  })

  it('should return value', () => {
    const props = {
      id: 'test',
      name: 'test-input',
      value: '0',
      handleChange: jest.fn(),
    }

    const component = mount(<Money {...props} />)
    expect(component.find('input').prop('value')).toBe('0')
  })
})

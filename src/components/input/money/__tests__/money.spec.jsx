import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../../tests/wrapper'
import Money from '../money'

describe('<Money />', () => {
  it('should be defined', () => {
    const props = {
      id: 'test',
      name: 'name',
      value: '1',
      handleChange: jest.fn(),
    }
    const component = shallow(
      <MaterialUIWrapper>
        <Money {...props} />
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return value', () => {
    const props = {
      id: 'test',
      name: 'test-input',
      value: '0',
      handleChange: jest.fn(),
    }
    const component = mount(
      <MaterialUIWrapper>
        <Money {...props} />
      </MaterialUIWrapper>,
    )
    expect(component.find('input').prop('value')).toBe('0')
  })

  it('snapshot', () => {
    const props = {
      id: 'test',
      name: 'test-input',
      value: '0',
      handleChange: jest.fn(),
    }
    const component = mount(
      <MaterialUIWrapper>
        <Money {...props} />
      </MaterialUIWrapper>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../tests/wrapper'
import Select from '../select'

describe('<Select />', () => {
  it('should be defined', () => {
    const props = {
      id: 'test',
      value: 'usd',
      name: 'select',
      onChange: jest.fn(),
      options: [
        {
          value: 'usd',
          label: 'usd',
        },
      ],
    }
    const component = mount(
      <MaterialUIWrapper>
        <Select {...props} />
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return correct values', () => {
    const props = {
      id: 'test',
      value: 'test',
      name: 'select',
      onChange: jest.fn(),
      options: [
        {
          value: 'test',
          label: 'test',
        },
      ],
    }
    const component = mount(
      <MaterialUIWrapper>
        <Select {...props} />
      </MaterialUIWrapper>,
    )

    expect(component.find('div#test').at(0).text()).toBe('test')
  })

  it('snapshot', () => {
    const props = {
      id: 'test',
      value: 'test',
      name: 'select',
      onChange: jest.fn(),
      options: [
        {
          value: 'test',
          label: 'test',
        },
      ],
    }
    const component = mount(
      <MaterialUIWrapper>
        <Select {...props} />
      </MaterialUIWrapper>,
    )

    expect(toJson(component)).toMatchSnapshot()
  })
})

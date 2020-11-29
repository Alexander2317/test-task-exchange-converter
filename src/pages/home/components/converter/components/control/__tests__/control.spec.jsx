import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../../../../../tests/wrapper'
import Control from '../control'

describe('<Control />', () => {
  it('should be defined', () => {
    const props = {
      inputId: 'inputId',
      inputName: 'inputName',
      inputValue: '12',
      inputHandleChange: jest.fn(),
      selectId: 'selectId',
      selectName: 'selectName',
      selectValue: 'selectValue',
      selectHandleChange: jest.fn(),
      selectOptions: [{ value: 'selectValue', label: 'selectValue' }],
    }
    const component = shallow(
      <MaterialUIWrapper>
        <Control {...props} />
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should return values', () => {
    const props = {
      inputId: 'inputId',
      inputName: 'inputName',
      inputValue: '12',
      inputHandleChange: jest.fn(),
      selectId: 'selectId',
      selectName: 'selectName',
      selectValue: 'selectValue',
      selectHandleChange: jest.fn(),
      selectOptions: [{ value: 'selectValue', label: 'selectValue' }],
    }
    const component = mount(
      <MaterialUIWrapper>
        <Control {...props} />
      </MaterialUIWrapper>,
    )

    expect(component.find('input[name="inputName"]').props().value).toBe('12')
    expect(component.find('input[name="selectName"]').props().value).toBe('selectValue')
  })

  it('snapshot', () => {
    const props = {
      inputId: 'inputId',
      inputName: 'inputName',
      inputValue: '12',
      inputHandleChange: jest.fn(),
      selectId: 'selectId',
      selectName: 'selectName',
      selectValue: 'selectValue',
      selectHandleChange: jest.fn(),
      selectOptions: [{ value: 'selectValue', label: 'selectValue' }],
    }

    const wrapper = mount(
      <MaterialUIWrapper>
        <Control {...props} />
      </MaterialUIWrapper>,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

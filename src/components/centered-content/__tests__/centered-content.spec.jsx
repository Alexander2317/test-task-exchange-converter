import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../tests/wrapper'
import CenteredContent from '../centered-content'

const props = {
  classNameContainer: '',
  classNameItem: '',
}

describe('<CenteredContent />', () => {
  it('should be defined', () => {
    const component = shallow(
      <MaterialUIWrapper>
        <CenteredContent {...props}>
          <div>123</div>
        </CenteredContent>
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should render children', () => {
    const component = mount(
      <MaterialUIWrapper>
        <CenteredContent {...props}>
          <div>123</div>
        </CenteredContent>
      </MaterialUIWrapper>,
    )

    expect(component.contains(<div>123</div>)).toBe(true)
    expect(component.text()).toBe('123')
  })

  it('should get text', () => {
    const component = mount(
      <MaterialUIWrapper>
        <CenteredContent {...props}>
          <div>123</div>
        </CenteredContent>
      </MaterialUIWrapper>,
    )

    expect(component.text()).toBe('123')
  })

  it('snapshot', () => {
    const component = mount(
      <MaterialUIWrapper>
        <CenteredContent {...props}>
          <div>123</div>
        </CenteredContent>
      </MaterialUIWrapper>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

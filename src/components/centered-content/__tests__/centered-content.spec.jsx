import React from 'react'
import { shallow, mount } from 'enzyme'

import CenteredContent from '../centered-content'

const props = {
  classNameContainer: '',
  classNameItem: '',
}

describe('<CenteredContent />', () => {
  it('should be defined', () => {
    const component = shallow(
      <CenteredContent {...props}>
        <div>123</div>
      </CenteredContent>,
    )

    expect(component).toBeDefined()
  })

  it('should render children', () => {
    const component = shallow(
      <CenteredContent {...props}>
        <div>123</div>
      </CenteredContent>,
    )

    expect(component.contains(<div>123</div>)).toBe(true)
    expect(component.text()).toBe('123')
  })
})

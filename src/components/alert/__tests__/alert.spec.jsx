import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { MaterialUIWrapper } from '../../../../tests/wrapper'
import Alert from '../alert'

const props = {
  open: true,
  text: 'hello',
  type: 'success',
}

describe('<Alert />', () => {
  it('should be defined', () => {
    const component = shallow(
      <MaterialUIWrapper>
        <Alert {...props} />
      </MaterialUIWrapper>,
    )

    expect(component).toBeDefined()
  })

  it('should get text', () => {
    const component = mount(
      <MaterialUIWrapper>
        <Alert {...props} />
      </MaterialUIWrapper>,
    )

    expect(component.text()).toBe('hello')
  })

  it('snapshot', () => {
    const component = mount(
      <MaterialUIWrapper>
        <Alert {...props} />
      </MaterialUIWrapper>,
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

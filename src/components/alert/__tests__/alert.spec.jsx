import React from 'react'
import { shallow } from 'enzyme'

import Alert from '../alert'

const props = {
  open: true,
  text: 'hello',
  type: 'success',
}

describe('<Alert />', () => {
  it('should be defined', () => {
    const component = shallow(<Alert {...props} />)

    expect(component).toBeDefined()
  })

  it('should get text', () => {
    const component = shallow(<Alert {...props} />)

    expect(component.text()).toBe('hello')
  })
})

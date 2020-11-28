import React from 'react'
import { mount } from 'enzyme'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import Select from '../select'

describe('<Select />', () => {
  it('should be defined', () => {
    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    })
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
      <ThemeProvider theme={theme}>
        <Select {...props} />
      </ThemeProvider>,
    )

    expect(component).toBeDefined()
  })

  it('should return correct values', () => {
    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    })
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
      <ThemeProvider theme={theme}>
        <Select {...props} />
      </ThemeProvider>,
    )

    expect(component.find('div#test').at(0).text()).toBe('test')
  })
})

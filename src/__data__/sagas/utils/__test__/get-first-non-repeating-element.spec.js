import getFirstNonRepeatingElement from '../get-first-non-repeating-element'

describe('getFirstNonRepeatingElement', () => {
  it('should have elements in array', () => {
    const arr = []

    expect(() => {
      getFirstNonRepeatingElement({ elements: arr, element: '123' })
    }).toThrow("Array shouldn't be empty")
  })

  it('should have minimum 2 elements', () => {
    const arr = ['123']

    expect(() => {
      getFirstNonRepeatingElement({ elements: arr, element: '123' })
    }).toThrow('Array should have minimum 2 elements')
  })

  it('should return first uniq element', () => {
    const arr = ['123', '345']
    const result = getFirstNonRepeatingElement({
      elements: arr,
      element: '123',
    })

    expect(result).toBe('345')
  })
})

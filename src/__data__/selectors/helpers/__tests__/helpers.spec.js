import { getIdentifier, getStoreKey } from '../helpers'

describe('helpers', () => {
  it('getIdentifier', () => {
    expect(getIdentifier(1)).toEqual(1)
  })

  it('getStoreKey', () => {
    const store = {
      users: {
        entities: [],
      },
    }

    expect(getStoreKey({ name: 'users', key: 'entities' })(store)).toEqual([])
  })
})

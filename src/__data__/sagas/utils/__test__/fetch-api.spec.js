import fetchApi from '../fetch-api'

describe('fetchApi', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('success response', async () => {
    fetch.mockResponseOnce(JSON.stringify({ rate: 0.5 }))

    const url = 'https://test.com'
    const response = await fetchApi(url)

    await expect(fetch.mock.calls.length).toEqual(1)
    await expect(fetch.mock.calls[0][0]).toEqual(url)
    await expect(response).toEqual({
      data: {
        rate: 0.5,
      },
      error: '',
    })
  })

  it('failed response', async () => {
    fetch.mockReject(new Error('some error'))

    const url = 'https://test.com'
    const response = await fetchApi(url)

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(url)
    expect(response).toEqual({
      data: {},
      error: 'Something is wrong with server...Try to update the page',
    })
  })
})

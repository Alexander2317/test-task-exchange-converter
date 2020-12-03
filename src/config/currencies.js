const USD = 'USD'
const EUR = 'EUR'
const GBP = 'GBP'

const list = [USD, EUR, GBP]

const options = list.map((currency) => ({ value: currency, label: currency }))

export { options, list, USD, EUR, GBP }

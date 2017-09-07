const request = require('request-promise')

exports.main = (args) => {
  const reqPromise = request({
    uri: 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json',
    json: true,
    headers: { 'User-Agent': 'OpenWhisk' }
  })

  let data = (args.data)? args.data:{}

  return reqPromise
          .then(res => (data.btc_usd_rate = res.bpi.USD.rate))
          .catch(error => ({err: err}))
          .then(() => ({data: data}))
}

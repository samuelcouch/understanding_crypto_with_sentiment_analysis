const openWhisk = require('openwhisk')

exports.main = (args) => {
  if (!args.data) {
    return Promise.reject('Data is required')
  }

  const ow = openWhisk({
      apihost: process.env['__OW_API_HOST'],
      api_key: process.env['__OW_API_KEY']
  })

  const actionBase  = '/sam.couch_dev/Bluemix_crypto_pulse_Credentials-1/'

  return new Promise((resolve, reject) => {
    ow.actions.invoke({
      actionName: `${actionBase}write`,
      blocking: true,
      params: {
        "dbname": "pulse",
        "doc": args.data
      }
    }).then(res => resolve({success: true, doc: args.data}))
      .catch(err => reject({success: false}))
  })
}

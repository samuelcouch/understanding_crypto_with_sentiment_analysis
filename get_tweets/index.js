const Twit = require('twit')

exports.main = (args) => {
  let twitter_consumer_key = args.twitter_consumer_key
  let twitter_consumer_secret = args.twitter_consumer_secret
  let twitter_access_token = args.twitter_access_token
  let twitter_access_token_secret = args.twitter_access_token_secret

  if (!twitter_consumer_key || !twitter_consumer_secret ||
      !twitter_access_token || !twitter_access_token_secret) {
    return Promise.reject('All parameters required')
  }

  let T = new Twit({
    consumer_key: twitter_consumer_key,
    consumer_secret: twitter_consumer_secret,
    access_token: twitter_access_token,
    access_token_secret: twitter_access_token_secret,
    timeout_ms: 60 * 1000
  })

  return T.get('search/tweets', { q: '$BTC', lang: 'en', result_type: 'recent', count: 40 })
          .then(res => ({ tweets: res.data.statuses }))
          .catch(err => ({ error: `There was an error getting tweets: ${err}` }))
}

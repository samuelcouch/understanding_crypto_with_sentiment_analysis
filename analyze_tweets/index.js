const NaturalLanguageUnderstandingV1 =
  require('watson-developer-cloud/natural-language-understanding/v1.js')

exports.main = (args) => {
  let nlu_username = args.nlu_username
  let nlu_password = args.nlu_password
  let tweets = (args.tweets)? args.tweets:[]

  if (!nlu_username) {
    return Promise.reject('Watson NLU username required')
  }

  if (!nlu_password) {
    return Promise.reject('Watson NLU password required')
  }

  // Initialize our NLU object with credentials
  const nlu = new NaturalLanguageUnderstandingV1({
    username: nlu_username,
    password: nlu_password,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
  })

  let runningSentiment = 0
  let runningTotal = 0

  // Map over all tweets and create an array of promises to invoke later
  let analysisPromises = tweets.map((tweet) => {
    let options = {
      text: tweet.text,
      features: {
        sentiment: {}
      }
    }

    return invokeAnalysis(nlu, options)
  })

  // Run all of the promises-NLU's, check if there is data (there won't be
  // if there was an error), and then aggregate the sentiments.
  // Finally we'll return an object with the aggregate numbers
  return Promise.all(analysisPromises)
          .then((results) => {
            results.forEach((item) => {
              if (item) {
                runningTotal++
                runningSentiment += item.sentiment.document.score
              }
            })
          })
          .catch((err) => {
            console.log('err:' + err)
          })
          .then(() => ({
            data: {
              total: runningTotal,
              totalSentiment: runningSentiment,
              avg: runningSentiment/runningTotal,
              timestamp: new Date()
            }
          }))
}

/*
  We wrap NaturalLanguageUnderstandingV1.analyze in a promise for ease of use
*/
function invokeAnalysis(nlu, options) {
  var p = new Promise((resolve, reject) => {
    nlu.analyze(options, function(err, data) {
      resolve(data)
    });
  });

  return p
}

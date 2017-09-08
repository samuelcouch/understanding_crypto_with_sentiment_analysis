get_tweets
==========
1. Create a new app in Twitter: https://dev.twitter.com/index
1. Copy your `twitter_consumer_key`, `twitter_consumer_secret`, `twitter_access_token`, and `twitter_access_token_secret`
1. `npm install` in the get_tweets directory to get the dependencies for this action
1. From within this directory run `zip -r get_tweets.zip *` to create a zip file
1. `bx wsk action create get_tweets --kind nodejs:6 get_tweets.zip` - this tells Bluemix to create an OpenWhisk action called `get_tweets`, use the `node 6` runtime, and the source is `get_tweets.zip`. Super straightforward!
1. Now we need to set our default parameters for the Twitter API. `bx wsk action update get_tweets -p twitter_consumer_key YOUR_CONSUMER_KEY -p twitter_consumer_secret YOUR_CONSUMER_SECRET -p twitter_access_token YOUR_ACCESS_TOKEN -p twitter_access_token_secret YOUR_ACCESS_TOKEN_SECRET`
1. `bx wsk action invoke get_tweets -r -b` running this should result in a series of tweets displaying in your terminal

Now that this action is setup, on to [the next one](../analyze_tweets/README.md)

analyze_tweets
==========
1. In your Bluemix dashboard, create a new [Natural Language Understanding](https://www.ibm.com/watson/services/natural-language-understanding/) instance
1. `npm install` in the analyze_tweets directory to get the dependencies for this action
1. From within this directory run `zip -r analyze_tweets.zip *` to create a zip file
1. `bx wsk action create analyze_tweets --kind nodejs:6 analyze_tweets.zip`
1. `bx wsk action update get_tweets -p nlu_username YOUR_NLU_USERNAME -p nlu_password YOUR_NLU_PASSWORD` in your Bluemix dashboard, click in to the Natural Language Understanding instance that you created, then expand the section with your credentials, the service will generate a username and password for you, that's what we're referencing here.
1. `bx wsk action invoke analyze_tweets -r -b` since we aren't passing an tweets, so long as there isn't an error, we're good to go!

Now that this action is setup, on to [the next one](../get_btc_price/README.md)

Crypto Pulse
============
A series of small serverless actions that get tweets containing `$BTC`, use Watson Natural Language Understanding to get a sentiment score, and save the results. This runs on IBM Clouc Functions (based on Apache OpenWhisk).

# Setup
This project was setup as a series of actions that run on [BlueMix OpenWhisk](https://www.ibm.com/cloud-computing/bluemix/openwhisk). Before getting started make sure that you have a Bluemix account setup. Once you've got your account setup, login and create a Cloudant instance (this is the database that we'll be using). After you've created your Cloudant instance, make sure you create login credentials!

Each action is essentially a single function, `main()`, that is executed. Actions can be linked together as a sequence, where the result of the previous action is returned to the next as a parameter.

Within Bluemix it is possible to use the IDE in the browser to develop actions, however, since we will be using NPM modules that are not available by default, we have to use the Bluemix CLI and upload a zip of our whole action (we'll get in to this more for each individual action).

## Setup the Bluemix CLI
Following this guide will be the quickest way to get setup and ready to deploy our actions: https://console.bluemix.net/docs/openwhisk/bluemix_cli.html#cloudfunctions_cli

Once you've setup the Bluemix CLI, run `bx wsk package refresh` to make sure that your Cloudant instance is properly linked and ready to use.

## First action
Since each action needs to be deployed individually and then linked in to a sequence, I have included a short guide for each.
[get_tweets setup](get_tweets/README.md)

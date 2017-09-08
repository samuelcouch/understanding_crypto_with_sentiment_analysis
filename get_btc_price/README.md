save_analysis
=============
This one is a bit trickier to setup, I couldn't find a good programatic way to set some of the variables, so things like `actionBase` are hard coded (will update if I find a better solution) – in order to find this string, go to your Bluemix dashboard, in the menu on the left side, select `Functions`, then select `Manage`, this will load all of your actions as well as actions provided by Bluemix to access other services (in this case, to access our Cloudant instance), at the bottom you should see an expandable section with the name of your Cloudant instance that you previously created, select the first action, then click `Additional details` – you should see a `Fully Qualified Name` copy the whole string minus the last part which is the action name. You should get something like `/sam.couch_dev/Bluemix_crypto_pulse_Credentials-1/` this is your `actionBase`.

1. `npm install` in the save_analysis directory to get the dependencies for this action
1. Open [index.js](index.js#L13) and change the `actionBase` to your own
1. In your Bluemix dashboard, select the Cloudant instance that you created and click `LAUNCH` button
1. Now, click `Create Database` in the top navigation bar
1. Set the name for your database to `pulse` (if you use a different name, make sure to change the `dbname` parameter in `index.js`)
1. From within this directory run `zip -r save_analysis.zip *` to create a zip file
1. `bx wsk action create save_analysis --kind nodejs:6 save_analysis.zip`

Now that all of our actions are created, there's only a couple things left to do!

## Create the sequence
1. `wsk action create bitcoin_pulse --sequence get_tweets,analyze_tweets,get_btc_price,save_analysis` this tells OpenWhisk to create a new action (that we can invoke like any other action), but instead of telling it which runtime to use and pointing it to a zip file, we're telling it that this action is actually a sequence (a linked series) of other actions
1. `bx wsk action invoke bitcoin_pulse -b -r` this should execute the fully functional sequence and return an object including the average sentiment,  bitcoin price, and some other data

## Create the trigger (Cron jon)
Now, all that's left is to create a trigger so that this sequence is executed once per hour without us having to call it, for this we'll create a Cron timer
1. `wsk trigger create execute_bitcoin_pulse --feed /whisk.system/alarms/alarm --param cron "0 * * * *" ` this tells OpenWhisk to create a new trigger called `execute_bitcoin_pulse` which is powered  by the `alarm` system, and we're passing a param to tell it to use Cron scheduling (the `0 * * * *` just means run once per hour. https://crontab.guru/ is a great resource for learning more about Cron scheduling).

## Link it all up
Now that our trigger is created all that's left to do is to tie it into our sequence.
1. `bx wsk rule update execute_bitcoin_pulse_trigger execute_bitcoin_pulse bitcoin_pulse` this tells openWhisk to create a new rule (it will update or create with this command) called `execute_bitcoin_pulse_trigger` that will use the `execute_bitcoin_pulse` alarm to invoke the `bitcoin_pulse` sequence.

And now we're all set!

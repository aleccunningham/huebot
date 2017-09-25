# huebot
GroupMe bot that controls Philip Hue lights

## Install

Run the server somewhere; easiest to just deploy to Heroku with the provided Procfile:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aleccunningham/huebot)

## Configure

You'll need a to create a GroupMe bot, which can be accessed @ [GroupMe Developers](https://dev.groupme.com/bots/) bots dashboard. It'll ask for a callback URL -- fill that with the deployed Heroku instance URL (i.e. https://*.herokuapp.com). Choose the GroupMe chatroom  you'd like to add the bot to, and you can give it a URL to an avatar photo. Once you've created it, snag the BOT_ID.

Make sure to edit `.env` and replace the BOT_ID field to reflect the bot token you retrieved. *Note*: If you deployed via Heroku, you will also need to go to the app's settings and set a Config Variable, with the `KEY` equal to `BOT_ID` and the `VALUE` equal to your bots ID retrieved from GroupMe. After that, you should be up and running!

### Commands
```
/livingroom_on
/livingroom_off
/livingroom_dim <%>
...following rooms have identical commands
/bedroom
/sunroom
/kitchen
```

## IFTT

huebot takes advantage of the awesome project, [IFTT](https://ifttt.com/). It allows us to make webhooks that have native integration with Philips Hue. In order to get the bot to actually access hue, you'll need an applet (an IFTT object) for each event. For the "This" part of the command, search for Webhooks.

In the event name, enter the huebot trigger command as such

![Imgur](https://i.imgur.com/yeDm0SZ.png)

And the "That" command will be a Philips Hue applet. Just as when you searched for the webhook, search for Philips Hue. A full list of available applets can be found [here]()

In order to dim hue lights, we have to alwso provide a second value that holds the percentage stored as an integer. We can achieve that by selecting Add ingredient, which lets us pass the webhook payload data through as the brightness.

![Imgur](https://i.imgur.com/DfeDhpD.png)

Here is a view on IFTT of all the webhook applets I created:

![Imgur](https://i.imgur.com/7KEdKjo.png)

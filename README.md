# huebot
GroupMe bot that controls Philip Hue lights

## Install

Run the server somewhere; easiest to just deploy to Heroku with the provided Procfile:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aleccunningham/huebot)

## Configure

You'll need a to create a GroupMe bot, which can be accessed @ [GroupMe Developers](https://dev.groupme.com/bots/) bots dashboard. It'll ask for a callback URL -- fill that with the deployed Heroku instance URL (i.e. https://*.herokuapp.com). Choose the GroupMe chatroom  you'd like to add the bot to, and you can give it a URL to an avatar photo. Once you've created it, snag the BOT_ID.

Make sure to edit `.env` and replace the BOT_ID field to reflect the bot token you retrieved. After that, you should be up and running!

### Commands

```
/<room> <on/off/dim%>
```

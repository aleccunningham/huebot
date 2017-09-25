var HTTPS = require('https');
var events = require('./constants');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  switch(request) {
    case events.LIVING_ROOM_ON:
      data = {
        "event": "living_room_on",
      }
      break;
    case events.LIVING_ROOM_OFF:
      data = {
        "event": "living_room_off",
      }
      break;
    case events.LIVING_ROOM_DIM:
      data = {
        "event": "living_room_dim",
        "Value1": dimValue
      }
      break;
    case events.LIVING_ROOM_MOVIE:
      data = {
        "event": "living_room_movie",
      }
    case events.SUNROOM_ROOM_ON:
      data = {
        "event": "sunroom_room_on",
      }
      break;
    case events.SUNROOM_ROOM_OFF:
      data = {
        "event": "sunroom_room_off",
      }
      break;
    case events.SUNROOM_ROOM_DIM:
      data = {
        "event": "sunroom_room_dim",
        "Value1": dimValue
      }
      break;
    case events.KITCHEN_ROOM_ON:
      data = {
        "event": "kitchen_room_on",
      }
      break;
    case events.KITCHEN_ROOM_OFF:
      data = {
        "event": "kitchen_room_off",
      }
      break;
    case events.KITCHEN_ROOM_DIM:
      data = {
        "event": "kitchen_room_dim",
        "Value1": dimValue
      }
      break;
    case events.BEDROOM_ROOM_ON:
      data = {
        "event": "bedroom_room_on",
      }
      break;
    case events.BEDROOM_ROOM_OFF:
      data = {
        "event": "bedroom_room_off",
      }
      break;
    case events.BEDROOM_ROOM_DIM:
      data = {
        "event": "bedroom_room_dim",
        "Value1": dimValue
      }
      break;
    default:
      data = {
        "event": "error",
      }
  }

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(data);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(data) {
  var botResponse, options, body, botReq, groupme, groupme_body, eventType;
  eventType = data["event"]
  options = {
    hostname: 'maker.ifttt.com',
    path: `/trigger/${eventType}/with/key/defFRlgcG0s8F0w53vR_kF`,
    method: 'POST'
  };

  body = {
    "event": data["event"],
    "Value1": data["Value1"],
  };

  groupme = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  groupme_body = {
    "bot_id": botID,
    "text": data["event"]
  }

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));

  groupmeReq = HTTPS.request(groupme, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  groupmeReq.end(JSON.stringify(groupme_body));

}


exports.respond = respond;

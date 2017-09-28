var HTTPS = require('https');
var events = require('./constants');

var botID = process.env.BOT_ID;
var key = process.env.HUE_KEY;

function respond(request) {
  var data, eventType,
      str=request.text,
      dimValue=str.slice(-3);

  switch(request.text) {
    case events.LIVING_ROOM_ON:
      data = {
        eventType: "living_room_on",
      }
      break;
    case events.LIVING_ROOM_OFF:
      data = {
        eventType: "living_room_off",
      }
      break;
    case events.LIVING_ROOM_DIM:
      data = {
        eventType: "living_room_dim",
        Value1: dimValue
      }
      break;
    case events.LIVING_ROOM_MOVIE:
      data = {
        eventType: "living_room_movie",
      }
    case events.SUNROOM_ROOM_ON:
      data = {
        eventType: "sunroom_room_on",
      }
      break;
    case events.SUNROOM_ROOM_OFF:
      data = {
        eventType: "sunroom_room_off",
      }
      break;
    case events.SUNROOM_ROOM_DIM:
      data = {
        eventType: "sunroom_room_dim",
        Value1: dimValue
      }
      break;
    case events.KITCHEN_ROOM_ON:
      data = {
        eventType: "kitchen_room_on",
      }
      break;
    case events.KITCHEN_ROOM_OFF:
      data = {
        eventType: "kitchen_room_off",
      }
      break;
    case events.KITCHEN_ROOM_DIM:
      data = {
        eventType: "kitchen_room_dim",
        Value1: dimValue
      }
      break;
    case events.BEDROOM_ROOM_ON:
      data = {
        eventType: "bedroom_room_on",
      }
      break;
    case events.BEDROOM_ROOM_OFF:
      data = {
        eventType: "bedroom_room_off",
      }
      break;
    case events.BEDROOM_ROOM_DIM:
      data = {
        eventType: "bedroom_room_dim",
        Value1: dimValue
      }
      break;
    default:
      data = {
        eventType: "error",
      }
  }

  postMessage(data);
  postGroupme();
}

function postMessage(data) {
  var options, body, botReq;

  options = {
    hostname: 'maker.ifttt.com',
    path: '/trigger/' + data.eventType + '/with/key/' + key,
    method: 'POST'
  };

  body = {
    "eventType": data.eventType,
    "Value1": data.Value1,
  };

  console.log('sending ' + data.eventType + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202 || res.statusCode == 200) {
        //neat
      } else {
        console.log('hue rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error triggering hook '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout triggering hook '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postGroupme() {
  var options, body, groupmeReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id": botID,
    "text": "Got it, boss"
  };

  groupmeReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202 || res.statusCode == 200) {
        //neat
      } else {
        console.log('groupme rejecting bad status code ' + res.statusCode);
      }
  });

  groupmeReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  groupmeReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  groupmeReq.end(JSON.stringify(body));

}


exports.respond = respond;

var HTTPS = require('https');
var events = require('./constants');

var botID = process.env.BOT_ID;

function respond(request) {
  var data;

  switch(request) {
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
}

function postMessage(data) {
  var options, body, botReq, groupme, groupme_body;

  options = {
    hostname: 'maker.ifttt.com',
    path: '/trigger/' + data.eventType + '/with/key/defFRlgcG0s8F0w53vR_kF',
    method: 'POST'
  };

  body = {
    "eventType": data.eventType,
    //"Value1": data["Value1"],
  };

  groupme = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  groupme_body = {
    "bot_id": botID,
    "text": data["eventType"]
  };

  console.log('sending ' + eventType + ' to ' + botID);

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

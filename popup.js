var foo = {};
var temp_store = {};

function firstThingsFirst() {
  var userInput_temp = document.getElementById("userInput");
  var userInput = userInput_temp.options[userInput_temp.selectedIndex].text;
  var searchURL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=actransit&r=' + encodeURIComponent(userInput);
  makeRequest(searchURL);
}

function makeRequest(URL) {
  var req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = buildDocument.bind(this);
  req.send(null);
}


function buildDocument(e) {
  var toDelete = document.getElementById("chicken");
  if (toDelete) {
    var child = document.getElementById("Waldo");
    while (child) {
      toDelete.removeChild(child);
      child = document.getElementById("Waldo");
    }
  }
  var herpaderp = document.getElementById("chicken");
  var boo = false;
  if (!herpaderp) {
    var herpaderp = document.createElement("select");
    herpaderp.setAttribute("id", "chicken");
    boo = true;
    var init = document.createElement("br");
    document.body.appendChild(init);
    var node = document.createTextNode("Direction:");
    document.body.appendChild(node);
  }
  var kittens = e.target.responseXML.querySelectorAll('direction');
  temp_store = kittens;
  for (var i = 0; i < kittens.length; i++) {
    var img = document.createElement("option");
    img.setAttribute("id", "Waldo");
    img.setAttribute("value", kittens[i].getAttribute("title"));
    var node = document.createTextNode(kittens[i].getAttribute("title"));
    img.appendChild(node)
    herpaderp.appendChild(img);
  }
  var stop = e.target.responseXML.querySelectorAll('stop');
  for (var ii = 0; ii< stop.length; ii++) {
    temp_title = stop[ii].getAttribute("title");
    if (temp_title) {
      foo[stop[ii].getAttribute("tag")] = temp_title;
    }
  }
  if (boo) {
    document.body.appendChild(herpaderp);
  }
  var evt = document.createEvent('Event');
  evt.initEvent('build', true, true);
  herpaderp.dispatchEvent(evt);
}


function getACTransitRoutes() {
  var searchURL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=actransit';
  makeAPIRequest_1(searchURL);

}

function makeAPIRequest_1(URL) {
  var req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = buildInitialDocument.bind(this);
  req.send(null);
}

function buildInitialDocument(e) {
    var kittens = e.target.responseXML.querySelectorAll('route');
    var herpaderp = document.createElement("select");
    herpaderp.setAttribute("id", "userInput");
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement("option");
      img.setAttribute("value", kittens[i].getAttribute("tag"));
      var node = document.createTextNode(kittens[i].getAttribute("tag"));
      img.appendChild(node);
      herpaderp.appendChild(img)
    }
    document.body.appendChild(herpaderp);
}

function findStop() {
  var toDelete = document.getElementById("stop");
  if (toDelete) {
    var child = document.getElementById("Waldo_2");
    while (child) {
      toDelete.removeChild(child);
      child = document.getElementById("Waldo_2");
    }
  }
  var herpaderp = document.getElementById("stop");
  var boo = false;
  if (!herpaderp) {
    var herpaderp = document.createElement("select");
    herpaderp.setAttribute("id", "stop");
    boo = true;
    var init = document.createElement("br");
    document.body.appendChild(init);
    var node = document.createTextNode("Stop:");
    document.body.appendChild(node);
  }
  var userInput_temp = document.getElementById("chicken");
  var userInput = userInput_temp.options[userInput_temp.selectedIndex].text;
  var kittens = temp_store;
  var the_chosen_one = {}
  for (var i = 0; i < kittens.length; i++) {
    var title = kittens[i].getAttribute("title");
    if (title == userInput) {
      var the_chosen_one = kittens[i];
      break;
    }
  }
  var stops = the_chosen_one.getElementsByTagName("stop");
  for (var e = 0; e < stops.length; e++) {
    var img = document.createElement("option");
    img.setAttribute("id", "Waldo_2");
    var temp_tag = stops[e].getAttribute("tag");
    var value = foo[temp_tag];
    img.setAttribute("value", value);
    img.setAttribute("tag", temp_tag);
    var node = document.createTextNode(value);
    img.appendChild(node);
    herpaderp.appendChild(img)
  }
  if (boo) {
    document.body.appendChild(herpaderp);
  }
  var evt = document.createEvent('Event');
  evt.initEvent('buildy', true, true);
  herpaderp.dispatchEvent(evt);
}

function finalAPICall() {
  var route_temp = document.getElementById("userInput");
  var route = route_temp.options[route_temp.selectedIndex].text;
  var direction_temp = document.getElementById("chicken");
  var direction = direction_temp.options[direction_temp.selectedIndex].text;
  var stop_temp = document.getElementById("stop");
  var stop = stop_temp.options[stop_temp.selectedIndex].getAttribute("tag");
  var finalURL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=actransit&s=' + encodeURIComponent(stop) + '&r=' + encodeURIComponent(route);
  makeAPIRequest_2(finalURL);
}

function makeAPIRequest_2(URL) {
  var req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = buildFinalDocument.bind(this);
  req.send(null);
}

function buildFinalDocument(e) {
    var toDelete = document.getElementById("times");
    while (toDelete) {
      document.body.removeChild(toDelete);
      toDelete = document.getElementById("times");
    }
    var kittens = e.target.responseXML.querySelectorAll('direction');
    var the_chosen_one = null;
    var direction_temp = document.getElementById("chicken");
    var direction = direction_temp.options[direction_temp.selectedIndex].text;
    for (var i = 0; i < kittens.length; i++) {
      temp_title = kittens[i].getAttribute("title");
      if (temp_title == direction) {
        the_chosen_one = kittens[i];
        break;
      }
    }
    if (kittens.length > 0 && the_chosen_one != null) {
      var predictions = the_chosen_one.getElementsByTagName("prediction");
      for (var e = 0; e < predictions.length; e++) {
        var img = document.createElement("h3");
        img.setAttribute("id", "times");
        var node = document.createTextNode(predictions[e].getAttribute("minutes") + ' minutes');
        img.appendChild(node);
        document.body.appendChild(img);
      }
    } else {
      var img = document.createElement("h3");
      img.setAttribute("id", "times");
      var node = document.createTextNode("No predictions at this time.");
      img.appendChild(node);
      document.body.appendChild(img);
    }
}


/** Run our kitten generation script as soon as the document's DOM is ready. */
document.addEventListener('DOMContentLoaded', getACTransitRoutes);
$(document).on('change', 'select#userInput', firstThingsFirst);
$(document).on('change', 'select#chicken', findStop);
$(document).on('change', 'select#stop', finalAPICall);
$(document).on('build', findStop);
$(document).on('buildy', finalAPICall);
// Set up Firebase Cloud Messaging
var messaging = firebase.messaging();
messaging.usePublicVapidKey("BP8pKpFj6ppwFdAh4oQqs1YYDNI49RuCmA0yK7J_Kn2r2yCQcyp_7iQr4fhCO84A25g1aQR_hdV_3tPP39qzGA4");

function Cookie() {
  // https://www.w3schools.com/js/js_cookies.asp
  this.set = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  this.get = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  this.delete = function(cname) {
    cookie.set(cname, '', -1);
  }
}

var cookie = new Cookie();


function AskDialog(selector) {
  this.confirm = function(title, message, yesFunction, noFunction) {
    $(selector + ' .title').html(title);
    $(selector + ' .message').html(message);
    $(selector + ' .yes.button').attr('onclick', yesFunction);
    $(selector + ' .no.button').attr('onclick', noFunction);
    $(selector + ' .confirm').removeClass('hidden');
    $(selector).removeClass('hidden');
  }
  this.alert = function(title, message, okayFunction) {
    $(selector + ' .title').html(title);
    $(selector + ' .message').html(message);
    $(selector + ' .okay.button').attr('onclick', okayFunction);
    $(selector + ' .alert').removeClass('hidden');
    $(selector).removeClass('hidden');
  }
  this.close = function() {
    $(selector + ' .title').html('');
    $(selector + ' .message').html('');
    $(selector + ' .confirm').addClass('hidden');
    $(selector + ' .alert').addClass('hidden');
    $(selector).addClass('hidden');
  }
}
var ask = new AskDialog('#askdialog');

function requestNotifPermission(permission) {
  ask.close();
  if (permission) {
    cookie.set('notifications', 'yes', 150);
    requestNotif();
  } else {
    cookie.set('notifications', 'no', 150);
  }
}
function requestNotif() {
  ask.close();
  if (cookie.get('notifications') == 'yes') {
    messaging.requestPermission().then(function() {
      getNotifToken();
    }).catch(function(err) {
      ask.confirm('Error: Push Notifications', 'An error occurred while trying to enable push notifications. Would you like to try again?', 'requestNotif()', 'ask.close()');
      console.log(err);
    });
  }
}

function askNotif() {
  ask.confirm('Push Notifications', 'Would you like to receive push notifications with important news about upcoming strikes?', 'requestNotifPermission(true)', 'requestNotifPermission(false)');
}

function getNotifToken() {
  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      sendNotifTokenToServer(currentToken);
      notifSuccess();
    } else {
      askNotif();
    }
  }).catch(function(err) {
    ask.confirm('Error: Push Notifications', 'An error occurred with push notifications. Would you like to retry setup?', 'requestNotif()', 'ask.close()');
  });
}

function notifSuccess() {
  messaging.onTokenRefresh(function() {
    notif.getToken();
  });
}

function sendNotifTokenToServer(token) {
  console.log(token);
}

console.log("Hey there! What are you doing here? Having a little look at the code are we?\nVisit our github repo at https://github.com/sycs-climate/sycs-climate.github.io")

$(document).ready(function() {
  // if (cookie.get('notifications') == '') {
  //   askNotif();
  // }
  // if (cookie.get('notifications') == 'yes') {
  //   getNotifToken();
  // }
});

// // Set up Firebase Cloud Messaging
// var messaging = firebase.messaging();
//
// messaging.usePublicVapidKey("BP8pKpFj6ppwFdAh4oQqs1YYDNI49RuCmA0yK7J_Kn2r2yCQcyp_7iQr4fhCO84A25g1aQR_hdV_3tPP39qzGA4");
//
//
// function Cookie() {
//   // https://www.w3schools.com/js/js_cookies.asp
//   this.set = function(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }
//
//   this.get = function(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
//   this.delete = function(cname) {
//     cookie.set(cname, '', -1);
//   }
// }
//
// function AskDialog(selector) {
//   this.ask = function(message, yesFunction, noFunction) {
//     $(selector + ' .message').html(message);
//     $(selector + ' .yes.button').attr('onclick', yesFunction);
//     $(selector + ' .no.button').attr('onclick', noFunction);
//     $(selector).removeClass('hidden');
//   }
//   this.close = function() {
//     $(selector + ' .message').html('');
//     $(selector).addClass('hidden');
//   }
// }
//
// function Notification() {
//   this.requestPermission = function(permission) {
//     ask.close();
//     if (permission) {
//       cookie.set('notifications', 'yes', 150);
//       notif.request();
//     } else {
//       cookie.set('notifications', 'no', 150);
//     }
//   }
//   this.request = function() {
//     if (cookie.get('notifications') == 'yes') {
//       messaging.requestPermission().then(function() {
//
//       }).catch(function(err) {
//         ask.ask('An error occurred while trying to enable push notifications. Would you like to try again?', 'notif.request()', '');
//       });
//     }
//   }
//   this.ask = function() {
//     ask.ask('Would you like to receive push notifications with important news about upcoming strikes?', 'notif.requestPermission(true)', 'notif.requestPermission(false)');
//   }
// }
//
// var cookie = new Cookie();
// var notif = new Notification();
// var ask = new AskDialog('#askdialog');
//
// $(document).ready(function() {
//   notif.ask();
// });
//
//
// messaging.getToken().then(function(currentToken) {
//   if (currentToken) {
//     sendTokenToServer(currentToken);
//     updateUIForPushEnabled();
//   } else {
//     notif.ask();
//     setTokenSentToServer(false);
//   }
// }).catch(function(err) {
//   showToken('Error retrieving Instance ID token. ', err);
//   setTokenSentToServer(false);
// });

// // Set up Firebase Cloud Messaging
// var messaging = firebase.messaging();
//
// messaging.usePublicVapidKey("BP8pKpFj6ppwFdAh4oQqs1YYDNI49RuCmA0yK7J_Kn2r2yCQcyp_7iQr4fhCO84A25g1aQR_hdV_3tPP39qzGA4");
//
// messaging.requestPermission().then(function() {
//   console.log('Notification permission granted.');
// }).catch(function(err) {
//   console.log('Unable to get permission to notify.', err);
// });
//
// messaging.getToken().then(function(currentToken) {
//   if (currentToken) {
//     sendTokenToServer(currentToken);
//     updateUIForPushEnabled(currentToken);
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.');
//     // Show permission UI.
//     updateUIForPushPermissionRequired();
//     setTokenSentToServer(false);
//   }
// }).catch(function(err) {
//   console.log('An error occurred while retrieving token. ', err);
//   showToken('Error retrieving Instance ID token. ', err);
//   setTokenSentToServer(false);
// });

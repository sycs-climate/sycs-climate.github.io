// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here, other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//
// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//   'messagingSenderId': '761370184415'
// });
//
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// var messaging = firebase.messaging();
//
//
// messaging.setBackgroundMessageHandler(function(payload) {
//   // Customize notification here
//   // var notificationTitle = 'Background Message Title';
//   var notificationOptions = {
//     // body: 'Background Message body.',
//     icon: "https://www.sycs.org.uk/assets/sycs-logo.jpeg"
//   };
//
//   return self.registration.showNotification('',
//     notificationOptions);
// });

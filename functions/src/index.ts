import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();


/*exports.newSubscriberNotification = functions.firestore
    .document('subscribers/{subscriptionId}')
    .onCreate(async event => {
        
    const data = event.data();

    const userId = data.userId
    const subscriber = data.subscriberId

   
    


    // Notification content
    const payload = {
      notification: {
          title: 'New Subscriber',
          body: `${subscriber} is following your content!`,
          //body:"Asdasd",
          icon: 'https://goo.gl/Fz9nrQ'
      }
    }

    // ref to the device collection for the user
    const db = admin.firestore()
    //const devicesRef = db.collection('devices').where('userId', '==', userId)
    const devicesRef = db.collection('devices').where('userId', '==', 'userId')


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();
    //const devices = devicesRef.get();

    const tokens = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })

    return admin.messaging().sendToDevice(tokens, payload)

});*/

exports.probandoAxel = functions.database
    .ref('rooms/{roomId}/messages/{messageId}')
    .onCreate((snapshot,context) => {
        
    const data = snapshot.val();

    const userId = context.params.roomId
    const subscriber = context.params.messageId

   
    


    // Notification content
    const payload = {
      notification: {
          title: 'New Subscriber',
          body: `${subscriber} is following your content!`,
          //body:"Asdasd",
          icon: 'https://goo.gl/Fz9nrQ'
      }
    }

 
    const db = admin.firestore()
  
   /* const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })*/

    const tokens = [];
    tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});




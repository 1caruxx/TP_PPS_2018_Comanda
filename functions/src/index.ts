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
    .onCreate(async (snapshot,context) => {
        
    const data = snapshot.val();

    const userId = context.params.roomId
    const subscriber = context.params.messageId

   
    


    // Notification content
    const payload = {
      notification: {
          title: 'New Subscriber',
          body: `${subscriber} is following your content!`,
          icon: 'https://goo.gl/Fz9nrQ',
          sound:'default',
          //body:"Asdasd",
          vibrate: "true",
      }
    }

 
    const db = admin.firestore()
  
    const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      if(result.data().tipo=="cliente")
      {
        tokens.push( token )
      }

   
    })

    //const tokens = [];
   // tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});


exports.pedirMesa = functions.database
    .ref('usuarios/{usuarioId}')
    .onUpdate(async (change, context) => {
        
        const before = change.before.val()
        const after = change.after.val()

        if (after.estado != "espera") 
        {
            console.log("error");
            return null
        }
    


    // Notification content
    const payload = {
      notification: {
          title: 'Nueva mesa pedida',
          body: `Un cliente escaneo el codigo qr y necesita una mesa!!!`,
          icon: 'https://goo.gl/Fz9nrQ',
          sound:'default',
          //body:"Asdasd",
          vibrate: "true",
      }
    }

 
    const db = admin.firestore()
  
    const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      if(result.data().tipo=="mozo" || result.data().tipo=="supervisor")
      {
        tokens.push( token )
      }

   
    })

    //const tokens = [];
   // tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});

exports.pedidoPlatosBebidas = functions.database
    .ref('pedidos/{pedidoId}')
    .onCreate(async (change, context) => {
        
    // Notification content
    const payload = {
      notification: {
          title: 'Se hizo un nuevo pedido',
          body: `Un cliente hizo un pedido!!!`,
          icon: 'https://goo.gl/Fz9nrQ',
          sound:'default',
          //body:"Asdasd",
          vibrate: "true",
      }
    }

 
    const db = admin.firestore()
  
    const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      if(result.data().tipo=="cocinero" || result.data().tipo=="bartender")
      {
        tokens.push( token )
      }

   
    })

    //const tokens = [];
   // tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});

exports.hacerReserva = functions.database
    .ref('reservas/{reservasId}')
    .onCreate(async (snapshot,context) => {
        
    // Notification content
    const payload = {
      notification: {
          title: 'Se hizo una reserva',
          body: `Un cliente hizo una reserva!!!`,
          icon: 'https://goo.gl/Fz9nrQ',
          sound:'default',
          //body:"Asdasd",
          vibrate: "true",
      }
    }

 
    const db = admin.firestore()
  
    const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      if(result.data().tipo=="supervisor")
      {
        tokens.push( token )
      }

   
    })

    //const tokens = [];
   // tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});


exports.aceptarReserva = functions.database
    .ref('reservas/{reservasId}')
    .onUpdate(async (change, context) => {

        const before = change.before.val()
        const after = change.after.val()

        if (after.estado == "pendiente") 
        {
            console.log("error");
            return null
        }
        
    // Notification content
    const payload = {
      notification: {
          title: 'Reserva Aceptada',
          body: `Ya aceptaron una de tus reserva!!!`,
          icon: 'https://goo.gl/Fz9nrQ',
          sound:'default',
          //body:"Asdasd",
          vibrate: "true",
      }
    }

 
    const db = admin.firestore()
  
    const devicesRef = db.collection('devices')


   
    const devices = await devicesRef.get();
   

    const tokens = [];

    
    devices.forEach(result => {
      const token = result.data().token;

      if(result.data().tipo=="cliente" && result.data().correo==after.correo)
      {
        tokens.push( token )
      }

   
    })

    //const tokens = [];
   // tokens.push("eiEhMAhigdY:APA91bH4oVLkLh8fzOsjm1bVhlyTsh4v8tb3WZ7zNmiUQXkEMmPW6aHJ_Rv_Ylx5ZuaChX2zIHMPIjp7mACe6_fP6t-i8r4KhP4B97GxLQlxWB8LYGFRHOJYy4-l5u3Bi-7uy_jTe_zk");

    return admin.messaging().sendToDevice(tokens, payload)

});


export const cancelarReserva = functions.database
.ref('reservas/{reservasId}')
.onDelete(async (snapshot, context) => {

  const data = snapshot.val();

  const payload = {
    notification: {
        title: 'Reserva Cancelada',
        body: `Se cancelo una de tus reservas!!!`,
        icon: 'https://goo.gl/Fz9nrQ',
        sound:'default',
        //body:"Asdasd",
        vibrate: "true",
    }
  }


  const db = admin.firestore()

  const devicesRef = db.collection('devices')


 
  const devices = await devicesRef.get();
 

  const tokens = [];

  
  devices.forEach(result => {
    const token = result.data().token;

    if(result.data().tipo=="cliente" && data.correo==result.data().correo && data.terminada!="si")
    {
      tokens.push( token )
    }

 
  })

 
  return admin.messaging().sendToDevice(tokens, payload)

  



  


});






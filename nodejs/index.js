const admin = require('firebase-admin')

const express = require('express');

const app  = express();

var serviceAccount = require("./localpushdemo-ea225-firebase-adminsdk-8d785-39b32f715c.json");

app.use(express.json())


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//Multi device send Notification through Express Server (Get Token Of Each Device )
app.post('/send-noti',(req,res)=>{
  console.log(req.body);
  const message = {
    notification:{
        title : 'New Post',
        body :'New Ad Posted Click to Open'
    },
    tokens:req.body.tokens

}

admin.messaging().sendMulticast(message).then(res =>{
      console.log("Message Sent");
}).catch(e =>{
  console.log(e);
})

})

app.listen(3000,()=>{
  console.log("server Running ..");
})


//Single Device Meesage Through Token .....!!! (Take Token in App.js)

// const message = {
//     notification:{
//         title : 'New Post',
//         body :'New Ad Posted Click to Open'
//     },
//     token:'dJA9qB_fR1WnIqqfO8qPl-:APA91bESO67v14R3z0WLr5BPG8Zt8MyOkmKwqXnr3XpPHfs6LF6LUmcrj75I64_O10jRAvi4rjo6FvBewTdY6qc6gOxEcMZhfOCE2jj7RtwS5KEUKWyxButWeWEnZ6MkKAA0V3GNFgiY'

// }

// admin.messaging().send(message).then(res =>{
//       console.log("Message Sent");
// }).catch(e =>{
//   console.log(e);
// })
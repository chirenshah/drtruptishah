var functions = require('firebase-functions')
var admin = require('firebase-admin')
admin.initializeApp()

 exports.addAdminRole = functions.https.onCall((data,context) => {
        admin.auth().createUser({
           displayName:'Chiren',
           phoneNumber:data.phoneNumber
        }).then((userRecord) =>{
           return('Successfully created a user: ',userRecord.uid);
        }).catch((error) => {
           return(error)
        })
 });
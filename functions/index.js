const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');

admin.initializeApp();
const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
    db.collection("camp").get().then(snapshot => {
        snapshot.forEach(doc => {
            db.collection("camp").doc(doc.id).collection('facility').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const startTime = moment().startOf('day').subtract(1, 'days').toDate().getTime();
                    const endTime = moment().endOf('day').subtract(1, 'days').toDate().getTime();

                    db.collection("camp").doc(doc.id).collection('facility').doc(doc.id).collection('reservation').where('start', '>=', new Date(startTime)).where('start', '<=', new Date(endTime)).get().then(snapshot => {
                        console.log(doc.data().start)
                        console.log(doc.data().end)
                    })
                })
            })
        });
    });
});


// exports.scheduledFunctionCrontab = functions.pubsub.schedule('45-50 8 * * *').timeZone('Asia/Seoul').onRun((context) => {
//     console.log('This will be run every day at 8:45 ~ 8:50 AM !');
//     return null;
// });

//함수 deploy 방법 : firebase deploy --only functions
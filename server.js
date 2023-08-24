var express = require('express');
var cors = require ('cors');
var app = express();
const PORT =  5050
app.use(cors());
const admin = require('firebase-admin');
const serviceAccount = require("./drdo-weather-firebase-adminsdk-70blw-e540b6bbc9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://drdo-weather-default-rtdb.firebaseio.com/'
});
app.get('/weather', (req,res)=>{
    const databaseRef = admin.database().ref('WeatherData');
    databaseRef
    .orderByKey()
    .limitToLast(1)
    .once('value')
    .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const lastId = childSnapshot.key;
      const data = childSnapshot.val();
      console.log(lastId);
      console.log(data);
      return res.status(201).json(data);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
});
app.listen(PORT, function () {
console.log(`Demo project at: http://localhost:${PORT}/weather`); });





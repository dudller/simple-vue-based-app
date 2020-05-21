import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBQVnNqiFKRNondDhZtZlGrIOX6QqbS1yI",
  authDomain: "workers-42206.firebaseapp.com",
  databaseURL: "https://workers-42206.firebaseio.com",
  projectId: "workers-42206",
  storageBucket: "workers-42206.appspot.com",
  messagingSenderId: "229416699285",
  appId: "1:229416699285:web:ce0cdf7d5b7de820f3229c",
  measurementId: "G-ZD8D9MQMQ9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  getWorkers() {
    return new Promise((resolve, reject) => {
      var list = [];
      db.collection("workers")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push(doc.data());
          });
          resolve(list);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          reject(error);
        });
    });
  },
  postWorker(worker) {
    db.collection("workers").add(worker);
  },
};

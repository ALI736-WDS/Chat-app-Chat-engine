import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyABsh5RciGSrX2iyjFKTnC1k0vzBEz2UVY",
    authDomain: "botogram-ca064.firebaseapp.com",
    projectId: "botogram-ca064",
    storageBucket: "botogram-ca064.appspot.com",
    messagingSenderId: "491761691080",
    appId: "1:491761691080:web:622adb07974de4a59a78fd"
  }).auth();

// (My Sign)
// const firebaseConfig = {
// export const auth = firebase.initializeApp({      // initializeApp: start App
//   apiKey: "AIzaSyDO7UTG744y55pqreTqzq1kkBxixRBbn4A",
//   authDomain: "botogram-d231e.firebaseapp.com",
//   projectId: "botogram-d231e",
//   storageBucket: "botogram-d231e.appspot.com",
//   messagingSenderId: "224125647317",
//   appId: "1:224125647317:web:7a3cb741e938a7b0c2a55c"
// }).auth();
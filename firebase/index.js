// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes} from 'firebase/storage'
var randomstring = require('randomstring')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlUL0zRZOWZ3bT-5N2QPUjm5sG08luiZw",
  authDomain: "ecom-classic.firebaseapp.com",
  projectId: "ecom-classic",
  storageBucket: "ecom-classic.appspot.com",
  messagingSenderId: "690560719255",
  appId: "1:690560719255:web:d1e5f7b1dce3eb22c24cd2",
  measurementId: "G-H6MJJKY3YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const uploadEdbleImage = (file) => {
  const storage = getStorage()
  const randomString = randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  })
  const location = `edibleImages/${randomString}${file.name}`
  const imageStorageref = ref(storage, location)

  uploadBytes(imageStorageref, file).then((snapshot) => {
    console.log('image file uploaded')
  }).catch((error) => {
    console.log('error: ', error)
  })

  return location
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as signout } from "firebase/auth";
import toast from 'react-hot-toast';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJcFnogDXFBb7TXaPv7Gan8Q9yrGneO6Y",
  authDomain: "mathyou-6b131.firebaseapp.com",
  projectId: "mathyou-6b131",
  storageBucket: "mathyou-6b131.appspot.com",
  messagingSenderId: "1095620459157",
  appId: "1:1095620459157:web:67a35fdf42922527fe799c",
  measurementId: "G-2ETN5HYDE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function signIn(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    if(user){
      toast.success("Sign in successful")
    }
    console.log(result)
  })
  .catch((error) => {
    toast.error("Sign in failed");
    console.error(error)
  });
}

function signOut(){
  signout(auth)
  .then(() => {
    toast.success("Sign out successful")
  })
  .catch((error) => {
    toast.error("Sign out failed");
    console.error(error)
  });
}

export {
  app,
  auth,
  provider,
  GoogleAuthProvider,
  signIn,
  signOut
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as signout } from "firebase/auth";
import toast from 'react-hot-toast';

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
const db = getFirestore(app);
const storage = getStorage(app);
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
    console.log(error.message)
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

async function publish_topic(topic){
  toast.promise(
      setDoc(doc(db, "topics", topic.id), topic, { merge: true }),
    {
      success: "Topic Published Successfully",
      error: "Topic Publishing Failed",
      loading: "Publishing..."
    }
  )
}

async function uploadFile(name, type, string){
  const storageRef = ref(storage, `${type}/${Date.now()}-${name}`);

  let snapshot = await toast.promise(
      uploadString(storageRef, string, 'data_url'),
      {
        loading: "Uploading " +type,
        success: type+" successfully uploaded",
        error: "Uploading " +type+ " failed",
      }
  );

  let downloadURL = await toast.promise(
      getDownloadURL(snapshot.ref),
      {
        loading: "Downloading " +type+ " URL",
        success: type+" URL Downloaded",
        error: "Downloading " +type+ " URL failed",
      }
  );  

  return downloadURL;
}

async function read_database(dbname){
  const data = [];
  const querySnapshot = await getDocs(collection(db, dbname));
  querySnapshot.forEach((doc) => data.push(doc.data()));
  return data;
}

async function get_single_doc(dbname, id){
  const singleDoc = await getDoc(doc(db, dbname, id));
  return singleDoc.data();
}


export {
  app,
  auth,
  provider,
  GoogleAuthProvider,
  signIn,
  signOut,
  storage,
  publish_topic,
  uploadFile,
  read_database,
  get_single_doc
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-l4uSAqCKu-IYpRqX3psDwo3Dn68XzaI",
  authDomain: "ethos-website-98c85.firebaseapp.com",
  projectId: "ethos-website-98c85",
  storageBucket: "ethos-website-98c85.appspot.com",
  messagingSenderId: "458849843741",
  appId: "1:458849843741:web:84805fb05fe2dded6ea4f4",
  databaseURL: "https://ethos-website-98c85-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const signOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Signed Out");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const checkEmail = async (email) => {
  fetchSignInMethodsForEmail(auth, email)
    .then((result) => {
      if (result.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const signUp = async (email, password, username) => {
  let err = null;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("hello");
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          console.log(auth.currentUser);
          console.log("Profile Updated");
        })
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            alert("Verification Email Sent");
            return "Verification Email Sent";
          });
        });
    })
    .catch((error) => {
      console.log(error.message + "hello 1");
      err = error.message;
      // return error.message
    });
  return err;
};

export const SendVerificationEmail = () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("Verification Email Sent");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const signIn = async (email, password) => {
  let err = null;
  await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log("hello");
      err = error.message;
    });
  return err;
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password Reset Link Sent to your Email");
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const storage = getStorage();
export const db = getDatabase();

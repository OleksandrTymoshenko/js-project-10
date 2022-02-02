import { initializeApp } from "firebase/app";
// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseClass from "./firebaseApi";

const propFiebase = new FirebaseClass;

import refs from './auth-modal';
import { uniqueId } from "lodash";
const firebaseConfig = {
    apiKey: "AIzaSyCqVUBbVgMQVw7F0Ui6UZiRCfFX4vTUtNU",
    authDomain: "fir-8926a.firebaseapp.com",
    projectId: "fir-8926a",
    storageBucket: "fir-8926a.appspot.com",
    messagingSenderId: "789848914440",
    appId: "1:789848914440:web:0c1d36ce7d4d9e020befbd"
}

const app = initializeApp(firebaseConfig);

refs.refs.regForm.addEventListener('submit', registration);
refs.refs.signInForm.addEventListener('submit', signInAccount)

async function registration(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    await propFiebase.createUser(email, password)

}

async function signInAccount(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    await propFiebase.signUserInAccount(email, password);
    console.log(propFiebase.uid)
}
// console.log(refs.refs.signWithGoogle)
// refs.refs.signWithGoogle.addEventListener('submit', signWithGoogl)

// async function signWithGoogl() {
//     await propFiebase.signUserInAccountWithGoogle();
// }
export { propFiebase}
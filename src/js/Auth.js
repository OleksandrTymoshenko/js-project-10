import { initializeApp } from "firebase/app";
import FirebaseClass from "./firebaseApi";
import { refs, toggleModal } from './auth-modal';

const propFirebase = new FirebaseClass;

const firebaseConfig = {
    apiKey: "AIzaSyCqVUBbVgMQVw7F0Ui6UZiRCfFX4vTUtNU",
    authDomain: "fir-8926a.firebaseapp.com",
    projectId: "fir-8926a",
    storageBucket: "fir-8926a.appspot.com",
    messagingSenderId: "789848914440",
    appId: "1:789848914440:web:0c1d36ce7d4d9e020befbd"
}

const app = initializeApp(firebaseConfig);

refs.regForm.addEventListener('submit', registration);
refs.signInForm.addEventListener('submit', signInAccount)
refs.signWithGoogle.addEventListener('click', signWithGoogl)

async function registration(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    await propFirebase.createUser(email, password)
    refs.regForm.reset();
    
}

async function signInAccount(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    await propFirebase.signUserInAccount(email, password);
    toggleModal();
    refs.openModalBtn.removeEventListener('click', toggleModal)
}

async function signWithGoogl(e) {
    e.preventDefault();
    await propFirebase.signUserInAccountWithGoogle();
    toggleModal();
    refs.openModalBtn.removeEventListener('click', toggleModal)
}

export { propFirebase }
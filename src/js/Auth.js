import { initializeApp } from "firebase/app";
import FirebaseClass from "./firebaseApi";
import { refs, toggleModal } from './auth-modal';
import Notiflix from "notiflix";

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
refs.signWithGoogleReg.addEventListener('click', signWithGooglReg)
refs.eyeBtnSignPassword.addEventListener('click', eyeSignPassword)
refs.eyeBtnRegPassword.addEventListener('click', eyeRegPassword)


function eyeSignPassword() {
    const typeSign = refs.inputPasswordSign;
    if (typeSign.getAttribute('type') === 'password') {
        typeSign.setAttribute('type', 'text');
    } else {
 typeSign.setAttribute('type', 'password')
    }
}

function eyeRegPassword() {
    const typeReg = refs.inputPasswordReg;
    if (typeReg.getAttribute('type') === 'password') {
        typeReg.setAttribute('type', 'text');
    } else {
 typeReg.setAttribute('type', 'password')
    }
}

async function registration(e) {
    e.preventDefault();
    console.log(e)
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    await propFirebase.createUser(email, password)
    refs.regForm.reset();
    
}

async function signInAccount(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.passwordSign.value;
    await propFirebase.signUserInAccount(email, password);
    toggleModal();
    refs.openModalBtn.removeEventListener('click', toggleModal)
}

async function signWithGoogl(e) {
    e.preventDefault();
    await propFirebase.signUserInAccountWithGoogle();
    if (propFirebase.logIn) {
    toggleModal();
    refs.openModalBtn.removeEventListener('click', toggleModal)
    }
    Notiflix.Notify.warning('Вы не вошли в аккаунт')

}

async function signWithGooglReg(e) {
    e.preventDefault();
    await propFirebase.signUserInAccountWithGoogle();
    if (propFirebase.logIn) {
    toggleModal();
    refs.openModalBtn.removeEventListener('click', toggleModal)
    }
    Notiflix.Notify.warning('Вы не вошли в аккаунт')
}

export { propFirebase }
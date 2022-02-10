import { initializeApp } from "firebase/app";
import FirebaseClass from "./firebaseApi";
import { refs, closeModal, openModal, openSignInForm } from './auth-modal';
import Notiflix from "notiflix";
import { ref } from "firebase/database";

const propFirebase = new FirebaseClass;
const firebaseConfig = {
    apiKey: "AIzaSyCqVUBbVgMQVw7F0Ui6UZiRCfFX4vTUtNU",
    authDomain: "fir-8926a.firebaseapp.com",
    projectId: "fir-8926a",
    storageBucket: "fir-8926a.appspot.com",
    messagingSenderId: "789848914440",
    appId: "1:789848914440:web:0c1d36ce7d4d9e020befbd"
}

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  height: '15px'
});

const app = initializeApp(firebaseConfig);
const refsRegistration = {
    userAdd: document.querySelector('.user-registration-plus'),
    userCheck: document.querySelector('.user-registration-check'),
    userOut: document.querySelector('.user-registration-minus')
}

refs.regForm.addEventListener('submit', registration);
refs.signInForm.addEventListener('submit', signInAccount)
refs.signWithGoogle.addEventListener('click', signWithGoogl)
refs.signWithGoogleReg.addEventListener('click', signWithGooglReg)
refs.eyeBtnSignPassword.addEventListener('click', eyeSignPassword)
refs.eyeBtnRegPassword.addEventListener('click', eyeRegPassword)
refsRegistration.userCheck.addEventListener('mouseover', userMinus)
refsRegistration.userOut.addEventListener('mouseleave', userCheck)
refsRegistration.userOut.addEventListener('click', outUser)
refsRegistration.userAdd.addEventListener('click', clickOpenModelForRegistration)

function clickOpenModelForRegistration() {
    openModal();
}

function outUser(e) {
    refsRegistration.userCheck.removeEventListener('mouseover', userMinus);
    refsRegistration.userOut.removeEventListener('mouseleave', userCheck)
    refsRegistration.userOut.classList.add('hide')
    refsRegistration.userCheck.classList.add('hide')
    refsRegistration.userAdd.classList.remove('hide')
    localStorage.removeItem('User');
    Notiflix.Notify.init({ height: '20px'},'Вы вышли из аккаунта')
    
}

function userCheck() {
    refsRegistration.userCheck.classList.remove('hide');
    refsRegistration.userOut.classList.add('hide');
}

function userMinus() {
    refsRegistration.userCheck.classList.add('hide');
    refsRegistration.userOut.classList.remove('hide');
}

function qwe() {
    if (localStorage.getItem('User')) {
        refsRegistration.userAdd.classList.add('hide');
        refsRegistration.userCheck.classList.remove('hide')
        refs.openModalBtn.removeEventListener('click', openModal)
        return;
    }
    console.log('No')
}
qwe();

function eyeSignPassword() {
    const typeSign = refs.inputPasswordSignin;
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
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.passwordReg.value;
    await propFirebase.createUser(email, password)
    refs.regForm.reset();
    openSignInForm()
    
}

async function signInAccount(e) {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.passwordSign.value;
    
    await propFirebase.signUserInAccount(email, password);
    if (propFirebase.logIn) {
        closeModal();
        refsRegistration.userCheck.addEventListener('mouseover', userMinus)
        refsRegistration.userOut.addEventListener('mouseleave', userCheck)
        refsRegistration.userCheck.classList.remove('hide')
        refsRegistration.userAdd.classList.add('hide')
        localStorage.setItem('User', propFirebase.logIn)
        refs.openModalBtn.removeEventListener('click', openModal)
        return;
    }
    return;
    // openModal()
}

async function signWithGoogl(e) {
    e.preventDefault();
    await propFirebase.signUserInAccountWithGoogle();
    if (propFirebase.logIn) {
        closeModal();
        refsRegistration.userCheck.addEventListener('mouseover', userMinus)
        refsRegistration.userOut.addEventListener('mouseleave', userCheck)
        refsRegistration.userCheck.classList.remove('hide')
        refsRegistration.userAdd.classList.add('hide')
        localStorage.setItem('User', propFirebase.logIn)
        refs.openModalBtn.removeEventListener('click', openModal)
        return;
    }
    Notiflix.Notify.warning('Вы не вошли в аккаунт')
    openModal()

}

async function signWithGooglReg(e) {
    e.preventDefault();
    await propFirebase.signUserInAccountWithGoogle();
    if (propFirebase.logIn) {
        closeModal();
        refsRegistration.userCheck.addEventListener('mouseover', userMinus)
        refsRegistration.userOut.addEventListener('mouseleave', userCheck)
        refsRegistration.userCheck.classList.remove('hide')
        refsRegistration.userAdd.classList.add('hide')
        localStorage.setItem('User', propFirebase.logIn)
        refs.openModalBtn.removeEventListener('click', openModal)
        return;
    }
    Notiflix.Notify.warning('Вы не вошли в аккаунт')
    openModal()
}

export { propFirebase }

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { openSignInForm } from './auth-modal'
import { onNaviHomeClick } from '../index';
export default class FirebaseClass {

    constructor( logIn = false, email, password) {
        this.email = email;
        this.password = password;
        this.logIn = logIn;
    }

    async createUser(email, password) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                Notiflix.Notify.success('Поздравляем! Вы успешно зарегистрированы на нашем сайте:)')
                openSignInForm();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    async signUserInAccount(email, password) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password).then((result) => {
            Notiflix.Notify.success(`Вы вошли на сайт как ${email}`);
            this.logIn = true;
            onNaviHomeClick();
            return;
            }).catch(function (error) {
            if (error.code === 'auth/wrong-password') {
                Notiflix.Notify.warning('Неверный пароль');
            } else {
                console.log(error);
                Notiflix.Notify.warning('Чтобы войти нужно зарегистрироваться');
            }
        });
    }

    async signUserInAccountWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                Notiflix.Notify.success('Вы вошли в свой аккаунт')
                this.logIn = true;
                onNaviHomeClick();

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
}
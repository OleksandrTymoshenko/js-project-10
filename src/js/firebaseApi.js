import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default class FirebaseClass {

    constructor(uid, email, password) {
        this.email = email;
        this.password = password;
        this.uid = uid;
    }

    async createUser(email, password) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Notiflix.Notify.success('You are registration')
                console.log(userCredential, user)
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
            this.uid = result.user.uid;
           // console.log(result.user.uid);
        }).catch(function (error) {
            if (error.code === 'auth/wrong-password') {
                Notiflix.Notify.warning('Неверный пароль');
            } else {
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
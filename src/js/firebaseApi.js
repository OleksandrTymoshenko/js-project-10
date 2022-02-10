import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth,setPersistence,browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default class FirebaseClass {

    constructor( logIn = false, email, password, uid) {
        this.email = email;
        this.password = password;
        this.logIn = logIn;
        this.uid = uid
    }

    async createUser(email, password) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                Notiflix.Notify.success('Welcome')
                Notiflix.Notify.merge({
                position: 'center-top',
});

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
            Notiflix.Notify.success(`Welcome ${email}`);
            Notiflix.Notify.merge({
            position: 'center-top',
});


                    this.logIn = true;
                    this.uid = result.user.uid;
                    
                }).catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        Notiflix.Notify.warning('Invalid password');
                        return;
                    } else {
                        console.log(error);
                        Notiflix.Notify.warning('Something is wrong');
                        Notiflix.Notify.merge({
                     position: 'center-top',
});         
  }             
})
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
                Notiflix.Notify.success('Welcome')
                Notiflix.Notify.merge({
                position: 'center-top',
});

                this.logIn = true;
                this.uid = result.user.uid;

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

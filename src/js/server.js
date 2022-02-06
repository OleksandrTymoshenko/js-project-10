import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { ref, set, onValue, get, child, getDatabase, push } from "firebase/database";
import {propFirebase} from './Auth'
const Uid = propFirebase; 

const firebaseConfig = {
    apiKey: "AIzaSyCqVUBbVgMQVw7F0Ui6UZiRCfFX4vTUtNU",
    authDomain: "fir-8926a.firebaseapp.com",
    projectId: "fir-8926a",
    storageBucket: "fir-8926a.appspot.com",
    messagingSenderId: "789848914440",
    appId: "1:789848914440:web:0c1d36ce7d4d9e020befbd"
}

const app = initializeApp(firebaseConfig);

export default class Server {
    constructor() {

    }

async setFilm ({id, title, overview, path, popularity}) {
    const db = getDatabase() 
    const commentRef = ref(db, 'films/' + Uid.uid)
    const newFilmRef = push(commentRef)
    await set(newFilmRef, {id, title, overview, path, popularity})
    .then(() => {
    console.log('success')
    })
    .catch((error) => {
    console.warn(error)
    });
}
    


async getFilms() {
const dbRef = ref(getDatabase());
    await get(child(dbRef, `films/`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}
}
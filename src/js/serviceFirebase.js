import { initializeApp } from 'firebase/app';
import { ref, set, get, getDatabase, child, onValue, push, update } from 'firebase/database';
import { propFirebase } from './Auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCqVUBbVgMQVw7F0Ui6UZiRCfFX4vTUtNU',
  authDomain: 'fir-8926a.firebaseapp.com',
  projectId: 'fir-8926a',
  storageBucket: 'fir-8926a.appspot.com',
  messagingSenderId: '789848914440',
  appId: '1:789848914440:web:0c1d36ce7d4d9e020befbd',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const Uid = propFirebase;

export function addToLibrary({ id, title, overview, path, popularity }) {
  const db = getDatabase();

  const filmData = {
    id,
    title,
    overview,
    path,
    popularity,
  };

  // Get a key for a new Post.
  const newFilmKey = push(child(ref(db), 'films')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/films/' + newFilmKey] = filmData;

  return update(ref(db), updates);
}

export async function getFilmsFromLibrary() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `films/`))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

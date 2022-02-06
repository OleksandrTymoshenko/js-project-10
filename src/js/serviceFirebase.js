import { initializeApp } from 'firebase/app';
import { ref, set, get, getDatabase, child, onValue } from 'firebase/database';
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

const Uid = propFirebase;

export const addFilmToLibrary = film => {};

export const getFilmsFromLibrary = () => {};

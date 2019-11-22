import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/firestore';

import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBU3P6dZpJaqtrwg5gC6JWWfTQDMXttwbs",
    authDomain: "income-optimizer.firebaseapp.com",
    databaseURL: "https://income-optimizer.firebaseio.com",
    projectId: "income-optimizer",
    storageBucket: "income-optimizer.appspot.com",
    messagingSenderId: "1090179729361",
    appId: "1:1090179729361:web:41332ffe020739e8c902f0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const firestore = firebase.firestore;

export default firebaseApp;

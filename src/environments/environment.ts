import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const environment = {
  firebase: {
    projectId: 'ng-images',
    appId: '1:1014593091607:web:c3a19cd2f662c7182f8452',
    databaseURL: 'https://ng-images-default-rtdb.firebaseio.com',
    storageBucket: 'ng-images.appspot.com',
    apiKey: 'AIzaSyC4bo-75Wo6Mt7p7MTRi1WrmOaUHFgttfM',
    authDomain: 'ng-images.firebaseapp.com',
    messagingSenderId: '1014593091607',
    measurementId: 'G-DL85BEZGRJ'
  },
  production: false,
  SIGNUP_URL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  SIGNIN_URL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  FIRE_BASE:
    'https://ng-images-default-rtdb.firebaseio.com/albums.json',
  API_KEY: 'AIzaSyC4bo-75Wo6Mt7p7MTRi1WrmOaUHFgttfM'
};

// Firebase Storage
const app = initializeApp(environment.firebase);
export const storage = getStorage(app);

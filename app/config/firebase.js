import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuL28zeZ6a51SZL06lII-oE6L9qKwKZOI",
  authDomain: "discrepanciadental.firebaseapp.com",
  projectId: "discrepanciadental",
  storageBucket: "discrepanciadental.appspot.com",
  messagingSenderId: "495348033910",
  appId: "1:495348033910:web:425a55c15c0bbcfc44b257"
};

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
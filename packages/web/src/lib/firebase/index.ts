import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, Firestore, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, Functions, getFunctions } from "firebase/functions";

import firebase from "../../../../../firebase.json";

const firebaseConfig = {
  apiKey: "AIzaSyCvRHg3s1glB0I-axzeO2Jchv9oaW0ILQk",
  authDomain: "kaguraswap-prod.firebaseapp.com",
  projectId: "kaguraswap-prod",
  storageBucket: "kaguraswap-prod.appspot.com",
  messagingSenderId: "649337962639",
  appId: "1:649337962639:web:b981ff913a6b8eadf9b0fa",
  measurementId: "G-QYDVED6CLB",
};

const getFirebaseApp = (): { app: FirebaseApp; db: Firestore; functions: Functions } => {
  const apps = getApps();
  const initialized = apps.length > 0;
  let app;
  if (initialized) {
    [app] = apps;
  } else {
    app = initializeApp(firebaseConfig);
  }
  const db = getFirestore(app);
  const functions = getFunctions(app);
  if (!initialized && process.env.NODE_ENV !== "production") {
    connectFirestoreEmulator(db, "localhost", firebase.emulators.firestore.port);
    connectFunctionsEmulator(functions, "localhost", firebase.emulators.functions.port);
  }
  return { app, db, functions };
};

export const { app, db, functions } = getFirebaseApp();

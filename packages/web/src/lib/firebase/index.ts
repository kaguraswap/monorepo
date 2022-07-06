import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCvRHg3s1glB0I-axzeO2Jchv9oaW0ILQk",
  authDomain: "kaguraswap-prod.firebaseapp.com",
  projectId: "kaguraswap-prod",
  storageBucket: "kaguraswap-prod.appspot.com",
  messagingSenderId: "649337962639",
  appId: "1:649337962639:web:b981ff913a6b8eadf9b0fa",
  measurementId: "G-QYDVED6CLB",
};

export const getFirebaseApp = (): FirebaseApp => {
  const apps = getApps();

  if (apps.length > 0) {
    const [app] = apps;
    return app;
  } else {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    if (process.env.NODE_ENV !== "production") {
      connectFirestoreEmulator(db, "localhost", 8080);
    }

    return app;
  }
};

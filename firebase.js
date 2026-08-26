import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDonUQjh1kfT6NvVrRACCpD9ycPaXp7T7E",
    authDomain: "snaply-project-1.firebaseapp.com",
    projectId: "snaply-project-1",
    storageBucket: "snaply-project-1.firebasestorage.app",
    messagingSenderId: "567863515271",
    appId: "1:567863515271:web:567b7466640ced04d68022"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
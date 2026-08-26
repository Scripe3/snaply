import { auth } from "../firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Giriş başarılı!");

        location.href = "../";

    } catch (err) {

        switch (err.code) {

            case "auth/invalid-credential":
                alert("E-posta veya şifre hatalı.");
                break;

            case "auth/invalid-email":
                alert("Geçersiz e-posta.");
                break;

            default:
                console.error(err);
                alert(err.message);

        }

    }

});
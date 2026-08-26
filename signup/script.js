import { auth, db } from "../firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const publicusername = document.getElementById("publicusername").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Kullanıcı adı kontrolü
    const usernameRegex = /^[a-z0-9._]+$/;

    if (!usernameRegex.test(publicusername)) {
        alert("Herkese açık kullanıcı adı sadece İngilizce küçük harf, rakam, nokta ve alt çizgi içerebilir.");
        return;
    }

    try {

        // Aynı publicusername var mı?
        const q = query(
            collection(db, "users"),
            where("publicusername", "==", publicusername)
        );

        const existing = await getDocs(q);

        if (!existing.empty) {
            alert("Bu kullanıcı adı zaten kullanılıyor.");
            return;
        }

        // Firebase Auth hesabı oluştur
        const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Firestore'a kullanıcı bilgilerini kaydet
        await setDoc(doc(db, "users", cred.user.uid), {
            uid: cred.user.uid,
            email: email,
            username: username,
            publicusername: publicusername,
            photoURL: "/snaply/images/default-avatar.png",
            createdAt: serverTimestamp()
        });

        alert("Hesabın başarıyla oluşturuldu!");

        location.href = "../login/";

    } catch (err) {

        switch (err.code) {

            case "auth/email-already-in-use":
                alert("Bu e-posta zaten kayıtlı.");
                break;

            case "auth/invalid-email":
                alert("Geçersiz e-posta adresi.");
                break;

            case "auth/weak-password":
                alert("Şifre en az 6 karakter olmalıdır.");
                break;

            default:
                console.error(err);
                alert("Bir hata oluştu: " + err.message);

        }

    }

});

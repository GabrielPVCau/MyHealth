import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// Import para usar o autentificacao
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
// Import para usar o Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBG5RXF_EHssHrbmP-mZVEECyLmvfSM88I",
    authDomain: "myhealth-eeb4f.firebaseapp.com",
    projectId: "myhealth-eeb4f",
    storageBucket: "myhealth-eeb4f.appspot.com",
    messagingSenderId: "3778431969",
    appId: "1:3778431969:web:66a1b58921fb5918b920a0"
};

const app = initializeApp(firebaseConfig);

// Alguem q usa o modulo de autenticacao vai usar o modulo para este app q tem aquelas informacoes
const auth = getAuth(app)

// Alguem q usa o modulo Firestore vai usar o modulo para este app q tem aquelas informacoes
const db = getFirestore(app)

// Outro arquivo pode utilizar, entao exporte
// Chaves no javascript é uma funcao/objeto 
export { auth, db }

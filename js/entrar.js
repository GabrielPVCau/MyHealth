import { auth } from "../firebase/config.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const form = document.getElementById('loginForm');
const buttonEntrar = document.getElementById('buttonEntrar');

const autenticarUsuario = async () => {
    const email = form.email.value;
    const senha = form.senha.value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);

        window.location.href = '/home.html';
    } catch (error) {
        console.error("Error signing in with email and password", error);
    }
}

buttonEntrar.addEventListener('click', autenticarUsuario);

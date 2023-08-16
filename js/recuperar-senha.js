import { auth } from "/firebase/config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const form = document.getElementById('passwordResetForm');
const botaoEnviar = document.getElementById('botaoEnviar');
const botaoVoltar = document.getElementById('botaoVoltar');
const messageElement = document.getElementById('message');

const enviarLinkReset = async () => {
    const email = form.email.value;
    
    try {
        await sendPasswordResetEmail(auth, email);
        messageElement.style.color = 'green';
        messageElement.textContent = 'Email de recuperação de senha enviado!';
    } catch (error) {
        console.error("Error sending password reset email", error);
        messageElement.style.color = 'red';
        messageElement.textContent = 'Erro ao enviar email de recuperação de senha. Por favor, tente novamente.';
    }
}

botaoEnviar.addEventListener('click', enviarLinkReset);
botaoVoltar.addEventListener('click', () => window.location.href = "/entrar.html");

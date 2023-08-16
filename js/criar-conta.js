import { auth, db } from '../firebase/config.js';
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const form = document.getElementById('cadastroForm');
const btnCadastrar = document.getElementById('btnCadastrar');

const cadastrarUsuario = async () => {
    const nome = form.nome.value;
    const sexo = form.sexo.value;
    const dataNascimento = form.dataNascimento.value;
    const email = form.email.value;
    const senha = form.senha.value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        
        //manda um objeto para a colecao usuarios
        //passo db, colecao e user id
        //cria documento dentro da colecao q quero criar
        await setDoc(doc(db, 'usuarios', user.uid), {
            nome: nome,
            sexo: sexo,
            dataNascimento: dataNascimento,
            email: email
        });
        //se deu certo ele te direciona para tela entrar
        // como é chamada assincrona eu preciso ver se deu ou nao certo
        //poderia colocar console then json stringify mas isso...
        window.location.href = '/entrar.html';
    } catch (error) {
        //se deu errado n direciona e aparece o erro no console
        console.error("Erro ao entrar", +JSON.stringify (error));
    }
}

btnCadastrar.addEventListener('click', cadastrarUsuario);
// se n existir ele cria a colecao usuarios
// se existir ele cria um documento no usuario existente
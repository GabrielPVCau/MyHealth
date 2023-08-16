import { auth, db } from "../firebase/config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// Verificação de autenticação
auth.onAuthStateChanged((usuario) => {
    if (!usuario) {
        window.location.href = "entrar.html";
    }
});

async function cadastrarVacina() {
    let dataVacinacao = document.getElementById('dataVacinacao').value;
    let nomeVacina = document.getElementById('nomeVacina').value;
    let dose = document.querySelector('input[name="dose"]:checked').value;
    let comprovante = document.getElementById('comprovante').files[0];
    let dataProximaVacinacao = document.getElementById('dataProximaVacinacao').value;

    // Armazenar o comprovante no Firebase Storage
    let storage = getStorage();
    let comprovanteRef = ref(storage, 'comprovantes/' + comprovante.name);
    let uploadTask = uploadBytesResumable(comprovanteRef, comprovante);


    uploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, (error) => {
        console.error('Upload falhou:', error);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((urlComprovante) => {

            //dados da vacina q quero salvar na colecao vacina dentro do usuario
            let vacina = {
                dataVacinacao,
                nomeVacina,
                dose,
                urlComprovante,
                dataProximaVacinacao
            }
      
            // Adicionar 'vacina' à coleção de vacinas do usuário atual no Firestore
            //interpolacao usando string e variavel
            // onde vc coloca em qual colecao quer, o user id e cria a colecao vacinas
            // adiciono esta vacina
            addDoc(collection(db, `usuarios/${auth.currentUser.uid}/vacinas`), vacina)
                .then((result) => {
                    console.log('Vacina cadastrada com sucesso!' + JSON.stringify(result));
                    window.location.href = "home.html";
                })
                .catch((error) => {
                    console.error('Erro ao cadastrar a vacina:', JSON.stringify(error));
                });
        });
    });
}

document.getElementById("btnCadastrarVacina").addEventListener('click', cadastrarVacina);

document.getElementById("btnMinhasVacinas").addEventListener('click', () => {
    window.location.href = "home.html";
});

document.getElementById("btnLogout").addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "entrar.html";
    });
});

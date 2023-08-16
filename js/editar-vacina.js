import { auth, db } from "../firebase/config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Verificação de autenticação
auth.onAuthStateChanged((usuario) => {
    if (usuario) {
        carregarVacina();
    } else {
        window.location.href = "entrar.html";
    }
});

// Função para carregar os dados da vacina atual
async function carregarVacina() {
    const urlParams = new URLSearchParams(window.location.search);
    const vacinaId = urlParams.get("id");

    const vacinaDoc = doc(db, `usuarios/${auth.currentUser.uid}/vacinas`, vacinaId);
    const vacinaSnapshot = await getDoc(vacinaDoc);

    if (vacinaSnapshot.exists()) {
        const vacina = vacinaSnapshot.data();
        vacina.id = vacinaSnapshot.id;
        preencherCampos(vacina);
    } else {
        console.error("Vacina não encontrada.");
    }
}

// Função para preencher os campos com os dados da vacina
function preencherCampos(vacina) {
    document.getElementById('dataVacinacao').value = vacina.dataVacinacao;
    document.getElementById('nomeVacina').value = vacina.nomeVacina;

    const radioDose = document.querySelector(`input[name="dose"][value="${vacina.dose}"]`);
    if (radioDose) {
        radioDose.checked = true;
    }

    document.getElementById('dataProximaVacinacao').value = vacina.dataProximaVacinacao;
}

// Função para atualizar os dados da vacina
function atualizarVacina() {
    const urlParams = new URLSearchParams(window.location.search);
    const vacinaId = urlParams.get("id");

    let dataVacinacao = document.getElementById('dataVacinacao').value;
    let nomeVacina = document.getElementById('nomeVacina').value;
    let dose = document.querySelector('input[name="dose"]:checked').value;
    let dataProximaVacinacao = document.getElementById('dataProximaVacinacao').value;

    const vacinaDoc = doc(db, `usuarios/${auth.currentUser.uid}/vacinas`, vacinaId);

    const updates = {
        dataVacinacao,
        nomeVacina,
        dose,
        dataProximaVacinacao
    };

    updateDoc(vacinaDoc, updates)
        .then(() => {
            console.log('Vacina atualizada com sucesso!');
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error('Erro ao atualizar a vacina:', JSON.stringify(error));
        });
}

function deletarVacina() {
    const urlParams = new URLSearchParams(window.location.search);
    const vacinaId = urlParams.get("id");

    const vacinaDoc = doc(db, `usuarios/${auth.currentUser.uid}/vacinas`, vacinaId);

    deleteDoc(vacinaDoc)
        .then(() => {
            console.log('Vacina deletada com sucesso!');
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error('Erro ao deletar a vacina:', JSON.stringify(error));
        });
}


document.getElementById("btnAtualizarVacina").addEventListener('click', atualizarVacina);
document.getElementById("btnDeletarVacina").addEventListener('click', deletarVacina);
document.getElementById("btnMinhasVacinas").addEventListener('click', () => {
    window.location.href = "home.html";
});
document.getElementById("btnLogout").addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "entrar.html";
    });
});

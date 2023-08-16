import { auth, db } from "../firebase/config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { onSnapshot, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Verificação de autenticação
auth.onAuthStateChanged((usuario) => {
    if (usuario) {
        listarVacinas();
    } else {
        window.location.href = "entrar.html";
    }
});

let todasVacinas = [];
let vacinasFiltradas = [];

// Função para obter as vacinas do usuário atual
function listarVacinas() {
    const vacinasRef = collection(db, `usuarios/${auth.currentUser.uid}/vacinas`);
    const q = query(vacinasRef, orderBy('nomeVacina'));

    // Observar mudanças nos documentos em tempo real
    onSnapshot(q, (snapshot) => {
        todasVacinas = [];
        snapshot.forEach((doc) => {
            const vacina = doc.data();
            vacina.id = doc.id;
            todasVacinas.push(vacina);
        });

        // Filtrar e exibir as vacinas
        filtrarVacinas();
    });
}

// Função para filtrar as vacinas baseada na pesquisa
function filtrarVacinas() {
    const campoPesquisa = document.getElementById('campoPesquisa');
    const texto = campoPesquisa.value.trim().toLowerCase();

    if (texto) {
        vacinasFiltradas = todasVacinas.filter(vacina => vacina.nomeVacina.toLowerCase().includes(texto));
    } else {
        vacinasFiltradas = todasVacinas;
    }

    // Atualizar a exibição
    exibirVacinas();
}

// Função para exibir as vacinas
function exibirVacinas() {
  const tabela = document.getElementById('listaVacinas');
  tabela.innerHTML = '';

  vacinasFiltradas.forEach((vacina) => {
      const linha = document.createElement('tr');
      linha.addEventListener('click', () => {
          redirecionarParaEdicaoVacina(vacina.id);
      });

      ['dataVacinacao', 'nomeVacina', 'dose', 'urlComprovante', 'dataProximaVacinacao'].forEach(chave => {
          const celula = document.createElement('td');
          
          // Caso a chave seja 'urlComprovante', criar uma imagem
          if (chave === 'urlComprovante') {
              const imagem = document.createElement('img');
              imagem.src = vacina[chave];
              imagem.style.width = '100px';  // Define o tamanho da imagem. Ajuste conforme necessário.
              celula.appendChild(imagem);
          } else {
              celula.textContent = vacina[chave];
          }

          linha.appendChild(celula);
      });

      tabela.appendChild(linha);
  });
}

// Função para redirecionar para a página de edição da vacina
function redirecionarParaEdicaoVacina(id) {
    window.location.href = `editar-vacina.html?id=${id}`;
}

// Adicionar ouvintes de eventos
document.getElementById("campoPesquisa").addEventListener('input', filtrarVacinas);
document.getElementById("botaoNovaVacina").addEventListener('click', () => {
    window.location.href = "nova-vacina.html";
});
document.getElementById("botaoLogout").addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "entrar.html";
    });
});

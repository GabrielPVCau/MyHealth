# MyHealth Web Application

## Descrição
MyHealth é uma aplicação web desenvolvida para gerenciar informações pessoais de saúde, com ênfase no registro e acompanhamento de vacinações. Este aplicativo permite aos usuários criar uma conta, fazer login, registrar informações sobre suas vacinas, incluindo datas e documentos comprobatórios, e editar ou deletar essas informações conforme necessário.

## Funcionalidades
- **Criação de Conta**: Permite aos usuários criar uma nova conta fornecendo informações pessoais.
- **Login**: Autenticação de usuários para acesso ao sistema.
- **Recuperação de Senha**: Funcionalidade para recuperar a senha em caso de esquecimento.
- **Cadastro de Vacinas**: Possibilidade de registrar novas vacinas, incluindo informações como data da vacinação, nome da vacina, dose e data da próxima vacinação.
- **Edição de Vacinas**: Permite editar as informações de vacinas já cadastradas.
- **Exclusão de Vacinas**: Opção para deletar registros de vacinas.
- **Visualização de Vacinas**: Visualização de todas as vacinas cadastradas pelo usuário.

## Tecnologias Utilizadas
- **HTML**: Estruturação das páginas da aplicação.
- **CSS**: Estilização da página 'Home'.
- **JavaScript**: Lógica de interação das páginas e comunicação com o Firebase.
- **Firebase**:
  - **Firebase Auth**: Autenticação de usuários.
  - **Firestore**: Banco de dados para armazenamento das informações das vacinas.
  - **Firebase Storage**: Armazenamento de arquivos (comprovantes de vacinação).

## Estrutura do Projeto
- `criar-conta.html`: Página para criação de novas contas de usuário.
- `editar-vacina.html`: Interface para edição de informações de vacinas cadastradas.
- `entrar.html`: Página de login para usuários cadastrados.
- `home.html`: Página principal que mostra todas as vacinas cadastradas.
- `index.html`: Página inicial da aplicação.
- `nova-vacina.html`: Página para cadastro de novas vacinas.
- `recuperar-senha.html`: Interface para recuperação de senha.
- Diretório `js/`: Contém os scripts JavaScript para manipulação das funcionalidades de cada página.
- Diretório `firebase/`: Contém a configuração de inicialização do Firebase.

## Instalação e Configuração
1. Clone o repositório para sua máquina local.
2. Certifique-se de ter uma conta Firebase e configure um projeto Firebase.
3. Atualize o arquivo `firebase/config.js` com as configurações do seu projeto Firebase.
4. Abra os arquivos HTML em um navegador para visualizar e interagir com a aplicação.

## Contribuições
Contribuições para o projeto são bem-vindas. Sinta-se à vontade para criar um fork do repositório, fazer suas alterações e enviar um pull request.



Desenvolvido c por Gabriel Cau
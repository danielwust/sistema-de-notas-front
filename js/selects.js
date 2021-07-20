const url = "https://sistema-de-notas-back.herokuapp.com";
// const url = "http://127.0.0.1:8080";
axios.defaults.baseURL = url;

// SELETORES

const alertWarning = '<div class="alert alert-warning" role="alert">';
const alertPrimary = '<div class="alert alert-primary" role="alert">';
const alertSuccess = '<div class="alert alert-success" role="alert">';
const alertDanger = '<div class="alert alert-danger" role="alert">';
const alertInfo = '<div class="alert alert-info" role="alert">';

const alertRecados = document.getElementById("alerta-recados");
const listagem = document.getElementById("listagem");

const confirmacaosenha = document.getElementById("confirmacaosenha");
const confirmarsenha = document.getElementById("confirmarsenha");
const criarsenha = document.getElementById("criarsenha");
const criarlogin = document.getElementById("criarlogin");
const criarnome = document.getElementById("criarnome");
const algumUso = document.getElementById("algum-uso");
const pDireita = document.getElementById("direita");
const pOutra = document.getElementById("outra");
const login = document.getElementById("login");
const senha = document.getElementById("senha");
const nome = document.getElementById("nome");

const detalhamento = document.getElementById("detalhamento");
const descricao = document.getElementById("descricao");
const lista = document.getElementsByClassName("row");
const todas = document.getElementById("todas");

const modaldetalhamento = document.getElementById("modaldetalhamento");
const modaldescricao = document.getElementById("modaldescricao");

const alertLogin = document.getElementById("alerta-login");

function redirecionamento() {
    window.location.href = "index.html";
}

// NAVBAR ITENS

function limparNotas() {
    notas = [];
    anotacao = "";
    identificador = 0;
    localStorage.removeItem("notas");
}

async function encerrarSessao() {
    localStorage.removeItem("sessao");
    delete sessao;
}

function inserirNotaRapida() {
    const acesso = JSON.parse(localStorage.dados);
    if (acesso.logado == 0) {
        alertLogin.innerHTML = `${alertDanger} Usuario não logado </div>`;
    } else {
        if (!localStorage.notas) {
            notas = [];
            identificador = notas.length;

            const anotacaoo = {
                descricao: modaldescricao.value,
                detalhamento: modaldetalhamento.value,
                id: identificador,
            };
            if (modaldescricao.value == "" || modaldetalhamento.value == "") {
                return (alertRecados.innerHTML = `${alertWarning} Nota não adicionada, verifique os campos </div>`);
            }

            notas.push(anotacaoo);
            localStorage.notas = JSON.stringify(notas);
            identificador++;
        } else {
            notas = JSON.parse(localStorage.notas);
            identificador = notas.length;

            const anotacaoo = {
                descricao: modaldescricao.value,
                detalhamento: modaldetalhamento.value,
                id: identificador,
            };
            if (modaldescricao.value == "" || modaldetalhamento.value == "") {
                return (alertRecados.innerHTML = `${alertWarning} Nota não adicionada, verifique os campos </div>`);
            }

            notas.push(anotacaoo);
            localStorage.notas = JSON.stringify(notas);
            identificador++;
        }

        modaldetalhamento.value = "";
        modaldescricao.value = "";

        if (!alertRecados) {
            alertLogin.innerHTML = `${alertSuccess} Nota adicionada com sucesso! </div>`;
        } else {
            alertRecados.innerHTML = `${alertSuccess} Nota adicionada com sucesso! </div>`;
            listarNotas();
        }
    }
}

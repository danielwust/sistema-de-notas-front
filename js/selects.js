// const url = "https://sistema-de-notas-back.herokuapp.com";
const url = "http://localhost:8080/api";
axios.defaults.baseURL = url;

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

function pular(sim) {
    if (!sim){
        window.location.href = "index.html";
    } else {
        window.location.href = "notas.html";
    }

}

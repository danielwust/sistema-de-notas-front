if (!localStorage.sessao) {
    const sessao = {
        token: null,
    };

    localStorage.sessao = JSON.stringify(sessao);
} else {
    sessao = JSON.parse(localStorage.sessao);
}

sessao = JSON.parse(localStorage.sessao);

if (sessao.token) {
    alertLogin.innerHTML = `${alertPrimary} Usuario já logado, redirecionando </div>`;
    window.setTimeout(pular("sim"), 5000);
}

function transicao(valor) {
    if (valor == 1) {
        pDireita.classList.add("sumida");
        pOutra.classList.remove("sumida");
    } else {
        pDireita.classList.remove("sumida");
        pOutra.classList.add("sumida");
    }
}

async function criarConta(event) {
    event.preventDefault();

    const { data } = await axios.post("/usuarios", {
        usuario: criarlogin.value,
        senha: criarsenha.value,
        nome: criarnome.value,
    });

    if (data) {
        alertLogin.innerHTML = `${alertSuccess} Usuario criado! </div>`;
        transicao(true);
    } else {
        alertLogin.innerHTML = `${alertDanger} Dados invalidos </div>`;
    }
}

async function efetuarLogin(event) {
    event.preventDefault();
    const { data } = await axios.post("/login", {
        usuario: login.value,
        senha: senha.value,
    });

    if (data.erro) {
        return (alertLogin.innerHTML = `${alertDanger} ${data.erro}`);
    }

    sessao = data;
    localStorage.sessao = JSON.stringify(sessao);

    if (data.token.length > 20) {
        alertLogin.innerHTML = `${alertPrimary} Login Efetuado, redirecionando </div>`;
        window.setTimeout(pular(), 5000);
    }
}

function checarSenha() {
    if (criarsenha.value == confirmarsenha.value) {
        confirmacaosenha.style.color = "green";
        confirmacaosenha.innerHTML = "Senhas iguais!";
    } else {
        confirmacaosenha.style.color = "red";
        confirmacaosenha.innerHTML = "Senhas dEferentes ;p";
    }
}

notas = [];
var sessao = {};

if (localStorage.sessao) {
    sessao = JSON.parse(localStorage.sessao);
}

if (!sessao.token) {
    window.location.href = "login.html";
}

if (!notas) {
    alertRecados.innerHTML = `${alertWarning} Sem notas para exibir, tente criar alguma hehe </div>`;
} else {
    listarNotas();
}

async function listarNotas() {
    listagem.innerHTML = "";

    const { data } = await axios(`/notas/${sessao.uid}/todas/`, {
        headers: {
            authorization: "Bearer " + sessao.token,
        },
    });

    for (let nota of data) {
        let horaNC = nota.updatedAt.slice(0, 10);
        let horaC = horaNC.split("-").reverse().join("/");

        var criardiv = `<div id="recado-${nota.uid}" class="row mt-1 separar">`;
        var botoes = `<button class="btn btn-danger" onclick="deletarNota('${nota.uid}')">Excluir</button>
        <button class="btn btn-primary" onclick="editarNota('${nota.uid}')">Editar</button>`;

        listagem.innerHTML += `${criardiv}<div class="col-1">${horaC}</div>
        <div class="col-3 offset-1">${nota.descricao}</div><div class="col-4">${nota.detalhamento}</div>
        <div class="col-3">${botoes}</div></div>`;
    }
}

async function inserirNota() {
    const { data } = await axios.post(
        "/notas/",
        {
            detalhamento: detalhamento.value,
            descricao: descricao.value,
            usuariosUID: sessao.uid,
        },
        {
            headers: {
                authorization: "Bearer " + sessao.token,
            },
        }
    );

    if (detalhamento.value == "" || descricao.value == "") {
        return (alertRecados.innerHTML = `${alertWarning} Nota não adicionada, verifique os campos </div>`);
    }
    alertRecados.innerHTML = "";

    listarNotas();
}

async function deletarNota(what) {
    await axios.delete(`/notas/${what}`, {
        headers: {
            authorization: "Bearer " + sessao.token,
        },
    });

    alertRecados.innerHTML = `${alertDanger} Nota deletada como desejado! </div>`;
    listarNotas();
}

async function editarNota(who) {
    const { data } = await axios(`/notas/${who}`, {
        headers: {
            authorization: "Bearer " + sessao.token,
        },
    });

    const edicao = document.getElementById(`recado-${who}`);

    edicao.innerHTML = `
            <div class="col-1">#</div>
            <div class="col-4"><input id="ndesc" value="${data.descricao}"></input></div>
            <div class="col-4"><input id="ndeta" value="${data.detalhamento}"></input></div>
            <div class="col-3"><button class="btn btn-info" onclick="salvarNota('${who}')">
            Salvar</button></div>`;
}

async function salvarNota(who) {
    const ndesc = document.getElementById("ndesc").value;
    const ndeta = document.getElementById("ndeta").value;

    const { data } = await axios.put(
        `/notas/${who}`,
        {
            descricao: ndesc,
            detalhamento: ndeta,
            usuariosUID: sessao.uid,
        },
        {
            headers: {
                authorization: "Bearer " + sessao.token,
            },
        }
    );

    alertRecados.innerHTML = `${alertPrimary} Nota de UID: ${who} editada como solicitado! </div>`;

    listarNotas();
}
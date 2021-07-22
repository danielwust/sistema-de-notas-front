async function inserirNotaRapida() {
    const sessao = JSON.parse(localStorage.sessao);
    if (!sessao.token) {
        alertLogin.innerHTML = `${alertDanger} Usuario não logado </div>`;
    } else {
        if (modaldescricao.value == "" || modaldetalhamento.value == "") {
            alertRecados.innerHTML = `${alertWarning} Nota não adicionada, verifique os campos </div>`;
        } else {
            const { data } = await axios.post(
                "/notas/",
                {
                    detalhamento: modaldetalhamento.value,
                    descricao: modaldetalhamento.value,
                    usuariosUID: sessao.uid,
                },
                {
                    headers: {
                        authorization: "Bearer " + sessao.token,
                    },
                }
            );
        }

        alertRecados.innerHTML = `${alertSuccess} Nota adicionada com sucesso! </div>`;
        listarNotas();
    }
}

async function limparNotas() {
    await axios.delete(`/notas/${sessao.uid}/todas`, {
        headers: {
            authorization: "Bearer " + sessao.token,
        },
    });

    localStorage.removeItem("notas");
    alertRecados.innerHTML = `${alertDanger} Notas limpas </div>`;

    listarNotas();
}

function encerrarSessao() {
    localStorage.removeItem("sessao");
    delete sessao;
}

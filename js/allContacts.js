const setCreateCard = function (contatos) {
    const divCardContatos = document.getElementById('cardContatos');

    if (!divCardContatos) {
        console.error('Elemento "cardContatos" não encontrado.');
        return;
    }

    divCardContatos.innerHTML = '';

    contatos.forEach(function (item) {
        const divCardFormat = document.createElement('div');
        const figureImagem = document.createElement('figure');
        const img = document.createElement('img');
        const h2Nome = document.createElement('h2');
        const divIconEmail = document.createElement('div');
        const imgEmail = document.createElement('img');
        const pEmail = document.createElement('p');
        const divIconTelefone = document.createElement('div');
        const imgTelefone = document.createElement('img');
        const pTelefone = document.createElement('p');

        const textoNome = document.createTextNode(item.nome);
        const textoEmail = document.createTextNode(item.email);
        const textoTelefone = document.createTextNode(item.telefone);

        divCardFormat.setAttribute('class', 'cardformat');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', item.nome);
        img.setAttribute('id', 'image-contato');
        h2Nome.setAttribute('id', 'name-contato');
        divIconEmail.setAttribute('class', 'divicons');
        imgEmail.setAttribute('src', '../img/BlackIcons/Mail.png');
        imgEmail.setAttribute('alt', 'e-mail.png');
        pEmail.setAttribute('id', 'email-contato');
        divIconTelefone.setAttribute('class', 'divicons');
        imgTelefone.setAttribute('src', '../img/BlackIcons/Phone.png');
        imgTelefone.setAttribute('alt', 'telefone.png');
        pTelefone.setAttribute('id', 'telefone-contato');

        divCardContatos.appendChild(divCardFormat);
        divCardFormat.appendChild(figureImagem);
        figureImagem.appendChild(img);
        divCardFormat.appendChild(h2Nome);
        h2Nome.appendChild(textoNome);
        divCardFormat.appendChild(divIconEmail);
        divIconEmail.appendChild(imgEmail);
        divIconEmail.appendChild(pEmail);
        pEmail.appendChild(textoEmail);
        divCardFormat.appendChild(divIconTelefone);
        divIconTelefone.appendChild(imgTelefone);
        divIconTelefone.appendChild(pTelefone);
        pTelefone.appendChild(textoTelefone);
    });
};
const contatosPorPagina = 5;
let paginaAtual = 1;
let contatosOriginais = [];

function atualizarPagina() {
    const inicio = (paginaAtual - 1) * contatosPorPagina;
    const fim = inicio + contatosPorPagina;
    const contatosPagina = contatosOriginais.slice(inicio, fim);
    setCreateCard(contatosPagina);

    document.getElementById('input-prev').display = paginaAtual === 1 ? 'none' : 'block';
    document.getElementById('input-next').display =
        fim >= contatosOriginais.length ? 'none' : 'block';
}

function configurarEventosPaginacao() {
    document.getElementById('input-prev').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            atualizarPagina();
        }
    });

    document.getElementById('input-next').addEventListener('click', () => {
        if (paginaAtual * contatosPorPagina < contatosOriginais.length) {
            paginaAtual++;
            atualizarPagina();
        }
    });
}


async function getDadosContatosAPI() {
    try {
        const response = await fetch(
            'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos'
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
        }

        const dadosContatos = await response.json();

        if (Array.isArray(dadosContatos?.contatos)) {
            contatosOriginais = dadosContatos.contatos;

            paginaAtual = 1;
            atualizarPagina();
            configurarEventosPaginacao();

            document.getElementById('input-search').addEventListener('click', () => {
                const filtro = document.getElementById('input-filtro').value.trim().toLowerCase();
                if (filtro) {
                    contatosOriginais = dadosContatos.contatos.filter((contato) =>
                        contato.nome.toLowerCase().includes(filtro)
                    );
                    paginaAtual = 1;
                    atualizarPagina();
                }
            });

            document.getElementById('input-reset').addEventListener('click', () => {
                document.getElementById('input-filtro').value = '';
                contatosOriginais = dadosContatos.contatos;
                paginaAtual = 1;
                atualizarPagina();
            });
        } else {
            console.error('Contatos não encontrado ou não é um array.');
        }
    } catch (error) {
        console.error('Erro ao carregar os dados da API:', error);
    }
}

window.addEventListener('load', function () {
    getDadosContatosAPI();
});
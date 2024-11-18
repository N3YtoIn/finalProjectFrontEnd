const setCreateCard = function (dadosContatos) {
    let divCardContatos = document.getElementById('cardContatos');

    dadosContatos.slice(-4).forEach(function (item) {
        let divCardFormat = document.createElement('div');
        let figureImagem = document.createElement('figure');
        let img = document.createElement('img');
        let h2Nome = document.createElement('h2');
        let divIconEmail = document.createElement('div');
        let imgEmail = document.createElement('img');
        let pEmail = document.createElement('p');
        let divIconTelefone = document.createElement('div');
        let imgTelefone = document.createElement('img');
        let pTelefone = document.createElement('p');

        let textoNome = document.createTextNode(item.nome);
        let textoEmail = document.createTextNode(item.email);
        let textoTelefone = document.createTextNode(item.telefone);

        divCardFormat.setAttribute('class', 'cardformat');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', item.nome);
        img.setAttribute('id', 'image-contato');
        h2Nome.setAttribute('id', 'name-contato');
        divIconEmail.setAttribute('class', 'divicons');
        imgEmail.setAttribute('src', './img/BlackIcons/Mail.png');
        imgEmail.setAttribute('alt', 'e-mail.png');
        pEmail.setAttribute('id', 'email-contato');
        divIconTelefone.setAttribute('class', 'divicons');
        imgTelefone.setAttribute('src', './img/BlackIcons/Phone.png');
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

const getDadosContatosAPI = async function () {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos';

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API.');
        }

        let dados = await response.json();
        setCreateCard(dados.contatos);
    } catch (error) {
        console.error('Erro:', error);
    }
};

window.addEventListener('load', function () {
    getDadosContatosAPI();
});

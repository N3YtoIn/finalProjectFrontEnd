// Função para pegar os dados do formulário
const getDadosForm = function(){
    let contatoJSON = {};
    let status = true;

    // Recebe os dados do formulário
    let nomeContato     = document.getElementById('nome').value;
    let emailContato    = document.getElementById('email').value;
    let telefoneContato = document.getElementById('telefone').value;
    let imagemContato   = document.getElementById('image').value;

    // Verifica se todos os campos estão preenchidos
    if(nomeContato == '' || emailContato == '' || telefoneContato == '' || imagemContato == ''){
        alert('Todos os dados devem ser preenchidos.');
        status = false;
    }else{
        // Cria o objeto JSON
        contatoJSON.nome     = nomeContato;
        contatoJSON.email    = emailContato;
        contatoJSON.telefone = telefoneContato;
        contatoJSON.image   = imagemContato;
    }

    if(status){
        return contatoJSON;
    }else{
        return false;
    }
}

// Função para salvar um novo contato
const postContato = async function(dadosContato){
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/novo/contato'
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosContato)
    })

    if(response.status == 201){
        alert('Registro inserido com sucesso.')
        getContatos()
    }else{
        alert('Não foi possível inserir o Contato, verifique os dados encaminhados.')
    }
}

//Função para alterar um Contato existente
const putContato = async function(dadosContato){

    let id = sessionStorage.getItem('idContato')

    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/atualizar/contato/${id}`

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosContato)
    })

    if(response.status == 200){
        alert('Registro atualizado com sucesso.')     
        getContatos()
    }else{
        alert('Não foi possível atualizar o Contato, verifique os dados encaminhados.')
    }

}


// Função para excluir um contato
const deleteContato = async function(id){
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/excluir/contato/${id}`;

    let response = await fetch(url, {
        method: 'DELETE'
    });

    if(response.status == 200){
        alert('Contato excluído com sucesso!');
        getContatos();
    }else{
        alert('Não foi possível excluir o contato.');
    }
}

// Função para listar todos os contatos
const getContatos = async function(){
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos'; 

    let response = await fetch(url);

    let dados = await response.json();

    setCardItens(dados.contatos);
}

// Função para criar a lista de contatos no HTML
const setCardItens = function(dadosContatos){
    let divListDados = document.getElementById('cardContatos');
    
    divListDados.innerHTML = ''; 

    dadosContatos.forEach(function(contato){
        let divDados    = document.createElement('div');
        let divFormat   = document.createElement('div');
        let divImagem   = document.createElement('figure');
        let imgContato  = document.createElement('img');
        let divNome     = document.createElement('h2');
        let divEmail    = document.createElement('div');
        let divTelefone = document.createElement('div');
        let divOpcoes   = document.createElement('div');
        let divEditar   = document.createElement('div');
        let divExcluir  = document.createElement('div');
        

        imgContato.setAttribute('src', contato.image);  
        imgContato.setAttribute('alt', 'contato.png');  
        divNome.innerText     = contato.nome;           
        divEmail.innerHTML    = `<img src="./img/BlackIcons/Mail.png" alt="e-mail.png"><p>${contato.email}</p>`;  
        divTelefone.innerHTML = `<img src="./img/BlackIcons/Phone.png" alt="telefone.png"><p>${contato.telefone}</p>`; 
        

        divEditar.innerHTML   = '<h2 id="input-editar">Editar</h2>';
        divExcluir.innerHTML  = '<h2 id="input-excluir">Excluir</h2>';
        

        divEditar.setAttribute('class', 'divbuttonedit');
        divExcluir.setAttribute('class', 'divbuttonedit');
        divEditar.setAttribute('idContato', contato.id);
        divExcluir.setAttribute('idContato', contato.id);
        divFormat.setAttribute('class','cardformat');
        divEmail.setAttribute('class','divicons');
        divTelefone.setAttribute('class','divicons');

        divListDados.appendChild(divDados);
        divDados.appendChild(divFormat);
        divFormat.appendChild(divImagem);
        divImagem.appendChild(imgContato);  // Colocando a imagem do contato dentro de <figure>
        divFormat.appendChild(divNome);
        divFormat.appendChild(divEmail);
        divFormat.appendChild(divTelefone);
        divFormat.appendChild(divOpcoes);
        divOpcoes.appendChild(divEditar);
        divOpcoes.appendChild(divExcluir);
        

        divExcluir.addEventListener('click', function() {
            let id = divExcluir.getAttribute('idContato');
            let resposta = confirm('Deseja realmente excluir o contato?');
            if (resposta) {
                deleteContato(id); 
            }
        });
        
        // Evento de click para o botão de editar
        divEditar.addEventListener('click', function() {
            let id = divEditar.getAttribute('idContato');
            getBuscarContato(id); 
        });
        
    }
)};        
// Função para buscar um contato pelo ID
const getBuscarContato = async function(id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/buscar/contato/${id}`;

    let response = await fetch(url);
    let dados = await response.json();

    console.log('Dados retornados do servidor:', dados); 

    if (response.status == 200 && dados.contato) {
        document.getElementById('nome').value       = dados.contato[0].nome;
        document.getElementById('email').value      = dados.contato[0].email;
        document.getElementById('telefone').value   = dados.contato[0].telefone;
        document.getElementById('image').value      = dados.contato[0].image;

        document.getElementById('salvar').innerText = 'Atualizar';

        sessionStorage.setItem('idContato', id);
    } else {
        alert('Não foi possível carregar os dados do contato.');
    }
}


// Evento de clique no botão salvar para realizar POST ou PUT
document.getElementById('salvar').addEventListener('click', function(){
    let dados = getDadosForm();

    if(dados){
        if(document.getElementById('salvar').innerText == 'Salvar'){
            postContato(dados);
        }else if(document.getElementById('salvar').innerText == 'Atualizar'){
            putContato(dados);
        }
    }
});

// Função para filtrar contatos por nome
const filtrarContatos = function(nomeFiltro) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos'; 

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            let contatosFiltrados = dados.contatos.filter(contato => 
                contato.nome.toLowerCase().includes(nomeFiltro.toLowerCase())
            );
            setCardItens(contatosFiltrados);
        })
        .catch(error => console.error('Erro ao buscar contatos:', error));
}


const resetarContatos = function() {
    document.getElementById('input-filtro').value = '';  
    getContatos();  
}

// Evento de clique no botão "Buscar"
document.getElementById('input-search').addEventListener('click', function() {
    let nomeFiltro = document.getElementById('input-filtro').value;
    filtrarContatos(nomeFiltro);
});

// Evento de clique no botão "Resetar"
document.getElementById('input-reset').addEventListener('click', function() {
    resetarContatos();
});



// Ao carregar a página, lista os contatos cadastrados
window.addEventListener('load', function(){
    getContatos();
});
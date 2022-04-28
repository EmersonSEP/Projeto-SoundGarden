//Faz uma requisicao GET para pegar os eventos
fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json()) //Pega o resultado e transforma em json
    .then(eventos => { //Agora temos a nossa lista de eventos em json que chamei de 'eventos'
        eventos.forEach((evento, index) => { //Roda o forEach percorrendo evento por evento dentro da lista
            const tabela = document.querySelector('.table tbody'); //Seleciona o corpo da tabela que queremos manipular
            const linha = tabela.insertRow(tabela.rows.length); //Insere uma nova linha/row nessa tabela
            
            //Formata a data pro padrao local dd/mm/yyyy e exclui as horas
            const data = new Date(evento.scheduled);
            const dataFormatada = data.toLocaleDateString();

            //# - Id/Chave primaria da tabela
            const th = document.createElement("th"); //Cria um elemento th onde ficara o numero da tabela começando do 1
            th.innerHTML = index+1; //Set o numero do indice+1, pois começa do zero e na lista queremos a partir do 1
            th.setAttribute("scope", "row"); //Seta o attributo "scope" com o valor "row" na tag th
            linha.appendChild(th); //Adiciona o elemento th que criamos e editamos na linha criada

            //>> O insertCell usado abaixo pega a linha criada e insere os dados no indice/coluna especificado
            //Data
            //insere na coluna com indice 1 a data que formatamos e a hora(usamos substring pra cortar apenas a hora da data recebida no json)
            linha.insertCell(1).innerText = `${dataFormatada} ${evento.scheduled.substring(11, 16)}`;
            //Titulo
            linha.insertCell(2).innerText = evento.name;
            //Atracoes
            //Attractions é um array, usamos o join pra pegar cada item do array
            //e separar usando o parametro passado, nesse caso separamos os itens por ", "
            linha.insertCell(3).innerText = evento.attractions.join(', ');

            // // Botao ver reservas
            const botaoVerReservas = document.createElement('a'); //Criamos um elemento a (botao)
            botaoVerReservas.innerText = "ver reservas"; //Definimos o texto dele
            botaoVerReservas.classList.add("btn"); //Adicionamos uma classe
            botaoVerReservas.classList.add("btn-dark"); //Adicionamos uma classe
            botaoVerReservas.setAttribute("href", "") //setamos o link para reservas.html
            botaoVerReservas.addEventListener('click',(e) => {
                e.preventDefault();
                document.querySelector('.modalBackground').style.display = 'flex';
                listarReservas(evento._id)
            })

            //Botao editar
            const botaoEditar = document.createElement('a'); //Criamos um elemento a (botao)
            botaoEditar.innerText = "editar"; //Definimos o texto dele
            botaoEditar.classList.add("btn"); //Adicionamos uma classe
            botaoEditar.classList.add("btn-secondary"); //Adicionamos uma classe
            //Setamos o link para a page editar-evento.html e passamos o id no parametro query
            botaoEditar.setAttribute("href", `editar-evento.html?id=${evento._id}`);
            
            //Botao excluir
            const botaoExcluir = document.createElement('a'); //Criamos um elemento a (botao)
            botaoExcluir.innerText = "excluir"; //Definimos o texto dele
            botaoExcluir.classList.add("btn"); //Adicionamos uma classe
            botaoExcluir.classList.add("btn-danger"); //Adicionamos uma classe
            //Setamos o link para a page editar-evento.html e passamos o id no parametro query
            botaoExcluir.setAttribute("href", `excluir-evento.html?id=${evento._id}`);
            
            // //Adiciona os botoes 
            const botoes = document.createElement("td"); //Cria um elemento td, que vai ser a ultima coluna de cada linha da tabela
            botoes.append(botaoVerReservas, botaoEditar, botaoExcluir); //Adiciona os botoes nesse td
            linha.append(botoes); //Adiciona essa coluna(td) com os botoes dentro na linha atual
        })
    })
    .catch(error => console.log(error));


async function listarReservas(id) {
    //Faz uma requisicao GET com o fetch e recebe a lista de reservas em json
    const listaDeReservas = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
        .then(data => data.json())
        .catch(error => console.log(error))

    //Verifica se existem reservas feitas para esse evento, caso não exista exibe uma mensagem
    if(listaDeReservas.length < 1) {
        document.querySelector('.divTable').innerHTML = "Não há reservas para esse evento"
        return;
    }

    //Percorre a lista de reservas passando reserva por reserva
    listaDeReservas.forEach((reserva, index) => {
        const tabelaReservas = document.querySelector('.modalTable tbody'); //Seleciona a o corpo da tabela

        
        const linha = tabelaReservas.insertRow(tabelaReservas.rows.length); //Cria uma nova linha na tabela
        const pk = document.createElement('th'); //Cria a primeira coluna da linha onde fica o numero
        pk.innerHTML = index+1 //Seta o valor do numero pelo indice
        linha.append(pk) //Adiciona a primeira coluna na linha
        linha.insertCell(1).innerText = reserva.owner_name; //Seleciona a segunda coluna e insere o nome
        linha.insertCell(2).innerText = reserva.owner_email; //Seleciona a terceira coluna e insere o email
        linha.insertCell(3).innerText = reserva.number_tickets; //Seleciona a quarta coluna e insere a qnt de tickets
    })
}


//Funcao que roda ao clicar no botao X pra fechar o modal
//Essa funcao fecha o modal dando display none, limpa o html da tabela e cria uma nova
//Pois quando uma o modal de reservas é fechado as informacoes carregas ficam lá e precisam ser limpadas
function closeModal() {

    //Seleciona e muda o modal para display: 'none' ao clicar no X
    document.querySelector('.modalBackground').style.display = 'none';
    
    const table = document.createElement('table'); //Cria uma tabela
    
    const thead = document.createElement('thead'); //Cria o cabecalho da tabela
    const tbody = document.createElement('tbody'); //Cria o corpo da tabela
    table.classList.add("modalTable") //Adiciona uma classe na tabela

    const linhaHead = thead.insertRow(thead.rows.length); //Insere o cabecalho da tabela

    const thnumber = document.createElement('th'); //Cria a coluna1 no cabecalho com os numeros
    thnumber.innerText = "#";
    thnumber.setAttribute("scope", "col")
    const thnome = document.createElement('th'); //Cria a coluna2 no cabecalho com os nomes
    thnome.innerText = "Nome";
    thnome.setAttribute("scope", "col")
    const themail = document.createElement('th'); //Cria a coluna3 no cabecalho com os emails
    themail.innerText = "Email";
    themail.setAttribute("scope", "col")
    const thtickets = document.createElement('th'); //Cria a coluna2 no cabecalho com a qnt de tickets
    thtickets.innerText = "Tickets";
    thtickets.setAttribute("scope", "col")
    
    //Adiciona as colunas criadas na linha, mas a linha ainda nao foi adicionada no HTML
    linhaHead.append(thnumber, thnome, themail, thtickets)

    table.append(thead, tbody); //Adiciona o cabecalho e o corpo de tabela criados dentro da tabela
    document.querySelector('.divTable').innerHTML = ''; //Limpa os resultados anteriores da tabela
    document.querySelector('.divTable').append(table); //Adiciona a tabela criada no HTML do modal

}
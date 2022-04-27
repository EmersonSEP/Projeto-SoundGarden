let eventoID;

function exibirEventos(eventos) {
    eventos.forEach(evento => {
        //Clona o modelo de elemento HTML do evento para ser edidato mais abaixo
        const eventoModel = document.querySelector('.models article').cloneNode(true);
        
        //Formata a data pro padrao local dd/mm/yyyy
        const data = new Date(evento.scheduled);
        const dataFormatada = data.toLocaleDateString();

        //Titulo e Data
        eventoModel.querySelector('h2').innerHTML = `${evento.name} - ${dataFormatada}`;
        //Atracoes
        eventoModel.querySelector('h4').innerHTML = evento.attractions.join(', ');
        //Descricao
        eventoModel.querySelector('p').innerText = evento.description;
        //Adiciona um evento de click em cada botão reservar ingresso
        eventoModel.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            //Seleciona o modal e atribui a variavel modal pra ele
            const modal = document.querySelector('.modal');
            
            //Muda o display do modal que está 'none' pra 'flex'
            modal.style.display = 'flex';
            //Adiciona no titulo o nome + data do evento
            document.querySelector('.modal-window p').innerHTML = `<b>Evento</b>: ${evento.name}<br><b>Data</b>: ${dataFormatada}`
            
            //Adicionando função do botão de fechar modal
            document.querySelector('.modal-window span').addEventListener('click', () => {
                modal.style.display = 'none';
            })

            //Seta o id do evento atual acessado ao clicar no no botao de reservar
            eventoID = evento._id
        })
        //Apos preparar nosso elemento HTML com as informacoes desse evento
        //Entao usamos um append para adiciona-lo na pagina
        //No HTML peguei a Div que guarda os elementos e dei um id 'boxEventos' para ela
        document.getElementById('boxEventos').append(eventoModel);
    });
}

try {
    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    .then(data => data.json())
    .then(listaEventos => exibirEventos(listaEventos))

} catch (error) {
    console.error(error);
}


//Função do botão reservar do modal
document.querySelector('.modal-window a').addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.querySelector('.modal');
    //Seleciona os inputs/campos do modal e atribui uma variavel a eles
    let nome = document.querySelector(`.modal-window #nomeInput`);
    let email = document.querySelector(`.modal-window #emailInput`);
    let qntTickets = document.querySelector(`.modal-window label > input`);
    
    //Body da requisicao
    let body = {
        owner_name: nome.value,
        owner_email: email.value,
        number_tickets: qntTickets.value,
        event_id: eventoID
    }
    //Detalhes da requisicao
    const requisicao = {
        method: 'POST',
        body: JSON.stringify(body), //Aqui é passamos o body e convertemos em string
        headers: {"Content-type": "application/json"}
    }
    //Faz a uma requisicao POST para reservar o(s) ticket(s)
    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
        .then(response => {
            //Emite um erro se retornar algum statuscode de erro
            //Ao emitir o erro, ele interrompe o .then e cai no .catch
            if(response.status != 201) {
                throw new Error();
            }

            modal.style.display = 'none'; //Fecha o modal
            nome.value = "";
            email.value = "";
            qntTickets.value = 1;

            alert('Reservado com sucesso!');
        })
        .catch(error => {
            //Mostra um alerta informando erro e printa no console o erro
            alert('Algo saiu errado, tente novamente :C');
            console.error('error: ', error.message);
        })
})
try {
    
    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    .then(data => data.json())
    .then(eventos => {
        eventos.forEach(evento => {
            //Clona o modelo de elemento HTML do evento para ser edidato mais abaixo
            const eventoModel = document.querySelector('.models article').cloneNode(true);
            
            //Formata a data pro padrao local dd/mm/yyyy
            const data = new Date(evento.scheduled);
            const dataFormatada = data.toLocaleDateString();

            //Titulo e Data
            eventoModel.querySelector('h2').innerHTML = `${evento.name} - ${dataFormatada}`;
            //Atracoes
            eventoModel.querySelector('H4').innerHTML = evento.attractions.join(', ');
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

                //Função do botão reservar do modal
                document.querySelector('.modal-window a').addEventListener('click', (e) => {
                    e.preventDefault();
                    //Seleciona os inputs/campos do modal e atribui uma variavel a eles
                    let nome = document.querySelector(`.modal-window #nomeInput`);
                    let email = document.querySelector(`.modal-window #emailInput`);
                    let qntTickets = document.querySelector(`.modal-window label > input`);
                    //Body da requisicao
                    const body = {
                        owner_name: nome.value,
                        owner_email: email.value,
                        number_tickets: qntTickets.value,
                        event_id: evento._id
                    }
                    //Detalhes da requisicao
                    const requisicao = {
                        method: 'POST',
                        body: JSON.stringify(body), //Aqui é passamos o body e convertemos em string
                        headers: {"Content-type": "application/json"}
                    }
                    //Faz a uma requisicao POST para reservar o(s) ticket(s)
                    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
                        .then(response => response.json())
                        .then(result => {
                            //Emite um erro se retornar algum statuscode de erro
                            //Ao emitir o erro, ele interrompe o .then e cai no .catch
                            if(result.error) {
                                throw new Error(result.details.body[0].message);
                            }

                            alert('Reservado com sucesso!');

                            //Fecha o modal
                            modal.style.display = 'none';
                        })
                        .catch(error => {
                            //Mostra um alerta informando erro e printa no console o erro
                            alert('Algo saiu errado, tente novamente :C');
                            console.error('error: ', error.message);
                        })
                        .finally(() => {
                            //A funcao finally sempre é rodada apos o then ou catch, independente de erro
                            //Limpa os campos do modal apos a requisicao
                            nome.value = "";
                            email.value = "";
                            qntTickets.value = 1;
                        })
                })
            })
            //Apos preparar nosso elementro HTML com as informacoes desse evento
            //Entao usamos um append para adiciona-lo na pagina
            //No HTML peguei a Div que guarda os elementos e dei um id 'boxEventos' para ela
            document.getElementById('boxEventos').append(eventoModel);
        });
    })

} catch (error) {
    //Cai aqui no catch e mostra um erro no console se o try falhar
    console.log(error);
}
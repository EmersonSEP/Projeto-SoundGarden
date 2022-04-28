const eventoNome = document.getElementById("nome");
const eventoBanner = document.getElementById("banner");
const eventoAtracoes = document.getElementById("atracoes");
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");

const btnEnviar = document.querySelector("button.btn.btn-primary");

const eventoId = (new URL(document.location)).searchParams.get("id");

fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json()) 
    .then(eventos => { 
        eventos.forEach(evento => { 
            if(evento._id == eventoId) { 

                const dataN = new Date(evento.scheduled);
                const dataFormatada = dataN.toLocaleDateString();

                eventoNome.value = evento.name;
                eventoBanner.value = evento.poster;
                eventoAtracoes.value = evento.attractions.join(', ');
                eventoDescricao.value = evento.description;
                eventoDataHora.value = evento.scheduled.substring(0, evento.scheduled.length-1);
                eventoLotacao.value = evento.number_tickets;
            }
        });
    })
    .catch(err => console.error(err));

btnEnviar.addEventListener("click", async (event) => {
  
    event.preventDefault();

    const eventoBody = {
      "name": eventoNome.value,
      "poster": eventoBanner.value,
      "attractions": eventoAtracoes.value.split(","),
      "description": eventoDescricao.value,
      "scheduled": eventoDataHora.value,
      "number_tickets": eventoLotacao.value,
    };  

    if (eventoId) {

        try {
          fetch(`${API_URL}/${eventoId}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventoBody),
          })
            .then(() => {
              alert("Evento atualizado com sucesso");
              window.location.replace("admin.html");
            })   
        }  catch (error) {
          alert("Falha ao editar as informações do evento.");;
      }

    }
  });
const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

const eventoNome = document.getElementById("nome");
const eventoAtracoes = document.getElementById("atracoes");
const novasAtracoes = eventoAtracoes.value.split(",");
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");

const btnEnviar = document.querySelector("button.btn.btn-primary");

const eventoId = (new URL(document.location)).searchParams.get("id");

btnEnviar.addEventListener("click", async (event) => {
  
    event.preventDefault();

    const eventoBody = {
      "name": eventoNome.value,
      "poster": "https://picsum.photos/300",
      "attractions": novasAtracoes,
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
          console.log(error.message);
      }

    }
  });
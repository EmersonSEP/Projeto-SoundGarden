

const eventoNome = document.getElementById("nome");
const eventoBanner = document.getElementById("banner");
const eventoAtracoes = document.getElementById("atracoes");
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");

const btnEnviar = document.querySelector("button.btn.btn-primary");

const eventoId = (new URL(document.location)).searchParams.get("id");

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
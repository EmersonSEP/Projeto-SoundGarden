
// Tratar da questão do formulário em branco...

const API_URL = "https://xp41-soundgarden-api.herokuapp.com/events";

const eventoNome = document.getElementById("nome");
const eventoAtracoes = document.getElementById("atracoes");
const novasAtracoes = eventoAtracoes.value.split(",");
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");


const btnEnviar = document.querySelector("button.btn.btn-primary");

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
  
  try {

    const header = {
      method: "POST",
      body: JSON.stringify(eventoBody),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
   //console.log(await fetch(`${API_URL}`, header));
   window.alert("Novo evento adicionado.");
    
    } catch (error) {
      window.alert("Falha ao cadastrar evento.");
    }

  });

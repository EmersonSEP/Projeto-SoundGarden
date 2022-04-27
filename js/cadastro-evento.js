
const eventoNome = document.getElementById("nome");
const eventoAtracoes = document.getElementById("atracoes"); 
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");

const btnEnviar = document.querySelector("button.btn.btn-primary");

btnEnviar.addEventListener("click", async (event) => {
  
  event.preventDefault();

  const eventoBody = {
    "name": eventoNome.value,
    "poster": "https://picsum.photos/300",
    "attractions": eventoAtracoes.value.split(","),
    "description": eventoDescricao.value,
    "scheduled": eventoDataHora.value,
    "number_tickets": eventoLotacao.value,
  };  
  
  try {

    const header = {
      method: "POST",
      body: JSON.stringify(eventoBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  
   await fetch(`${API_URL}`, header);
   window.alert("Novo evento adicionado.");
   window.location.replace("admin.html");
    
    } catch (error) {
      window.alert("Falha ao cadastrar evento.");
    }

  });

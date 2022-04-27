
const eventoNome = document.getElementById("nome");
const eventoAtracoes = document.getElementById("atracoes");
const novasAtracoes = eventoAtracoes.value.split(",");
const eventoDescricao = document.getElementById("descricao");
const eventoDataHora = document.getElementById("data");
const eventoLotacao = document.getElementById("lotacao");

const btnExcluir = document.querySelector("button.btn.btn-danger");

const eventoId = (new URL(document.location)).searchParams.get("id");

btnExcluir.addEventListener("click", async (event) => {

  event.preventDefault();

  if (eventoId) {

    try {
      await fetch(`${API_URL}/${eventoId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      alert("O evento foi deletado de forma permanente.");
      window.location.replace("admin.html");

    } catch (error) {
      alert("Erro ao deletar o evento.");
    }
  }
});

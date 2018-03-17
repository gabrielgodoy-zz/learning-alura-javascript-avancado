function $(selector) {
  return document.querySelector(selector);
}

const campos = [$("#data"), $("#quantidade"), $("#valor")];

function cleanForm() {
  campos[0].value = "";
  campos[1].value = 1;
  campos[2].value = 0;

  campos[0].focus();
}

function createTableRow(campos) {
  const tr = document.createElement("tr");

  campos.forEach(campo => {
    const td = document.createElement("td");
    td.textContent = campo.value;

    tr.appendChild(td);
  });

  const tdVolume = document.createElement("td");
  tdVolume.textContent = campos[1].value * campos[2].value;

  tr.appendChild(tdVolume);

  const tbody = $("tbody");
  tbody.appendChild(tr);

  clearForm();
}

$(".form").addEventListener("submit", event => {
  event.preventDefault();
  createTableRow(campos);
});

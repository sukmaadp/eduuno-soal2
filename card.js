function getID() {
  const url = new URL(window.location.href);
  return url.searchParams.get("id"); 
}

const id = getID();

if (!id) {
  showError("ID tidak ditemukan!");
}

let file = "";

if (id.startsWith("action")) file = "action.json";
else if (id.startsWith("luck")) file = "luck.json";
else if (id.startsWith("funfact")) file = "funfact.json";
else showError("ID tidak valid!");

fetch(file)
  .then(res => res.json())
  .then(data => {
    if (!data[id]) {
      showError("Data kartu tidak ditemukan!");
      return;
    }

    document.getElementById("kategori").innerText = data[id].kategori;
    document.getElementById("isi").innerText = data[id].isi;

  });

function showError(msg) {
  document.body.innerHTML = `<h2 style='text-align:center;color:red;'>${msg}</h2>`;
}

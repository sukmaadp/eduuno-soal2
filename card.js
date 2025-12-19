function getID() {
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
}

const id = getID();

if (!id) {
  showError("ID tidak ditemukan!");
  throw new Error("ID not found");
}

let file = "";

// Tentukan file JSON
if (id.startsWith("action")) file = "action.json";
else if (id.startsWith("luck")) file = "luck.json";
else if (id.startsWith("funfact")) file = "funfact.json";
else {
  showError("ID tidak valid!");
  throw new Error("Invalid ID format");
}

// Ambil JSON
fetch(file)
  .then(res => {
    if (!res.ok) throw new Error("File JSON tidak ditemukan!");
    return res.json();
  })
  .then(data => {
    if (!data[id]) {
      showError("Data kartu tidak ditemukan!");
      return;
    }

    // Tampilkan isi kartu
    document.getElementById("kategori").innerText = data[id].kategori;
    document.getElementById("isi").innerText = data[id].isi;
  })
  .catch(err => {
    showError("Terjadi kesalahan saat memuat data!");
    console.error(err);
  });

function showError(msg) {
  document.body.innerHTML = `
    <div style="
      text-align:center;
      margin-top:40px;
      color:red;
      font-size:22px;
      font-weight:bold;">
      ${msg}
    </div>
  `;
}

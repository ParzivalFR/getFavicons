let currentFaviconUrl = "";

document.addEventListener("DOMContentLoaded", () => {
  const getFaviconBtn = document.getElementById("getFaviconBtn");
  getFaviconBtn.addEventListener("click", getFavicon);
});

async function getFavicon() {
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value;
  if (!url) {
    alert("Veuillez entrer une URL valide");
    return;
  }

  // Utiliser un proxy pour contourner les restrictions CORS
  currentFaviconUrl = `https://cors-anywhere.herokuapp.com/https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url
  )}&sz=64`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
        <img src="${currentFaviconUrl}" alt="Favicon" id="faviconImage">
        <div class="result-infos">
          <a href="${currentFaviconUrl}" target="_blank">${currentFaviconUrl}</a>
        </div>
        <button onclick="downloadFavicon()" class="download-btn">Télécharger le Favicon</button>
    `;
}

function downloadFavicon() {
  if (!currentFaviconUrl) {
    alert("Veuillez d'abord récupérer un favicon");
    return;
  }

  const img = document.getElementById("faviconImage");
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "favicon.png";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }, "image/png");
}

function reset() {
  document.getElementById("result").innerHTML = "";
  currentFaviconUrl = "";
}

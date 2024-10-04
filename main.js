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

  currentFaviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url
  )}&sz=64`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <img src="${currentFaviconUrl}" alt="Favicon" id="faviconImage">
    <div class="result-infos">
      <a href="${currentFaviconUrl}" target="_blank">${currentFaviconUrl}</a>
    </div>
    <button onclick="prepareFaviconDownload()" class="download-btn">Télécharger le Favicon</button>
  `;

  // Pré-charger l'image pour la conversion
  const img = document.getElementById("faviconImage");
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    img.dataset.loaded = "true";
  };
}

function prepareFaviconDownload() {
  if (!currentFaviconUrl) {
    alert("Veuillez d'abord récupérer un favicon");
    return;
  }

  const img = document.getElementById("faviconImage");
  if (img.dataset.loaded !== "true") {
    alert(
      "L'image est en cours de chargement. Veuillez réessayer dans un instant."
    );
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  try {
    const dataUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = "favicon.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Erreur lors de la conversion de l'image:", error);
    alert(
      "Impossible de télécharger l'image. Veuillez réessayer ou vérifier la console pour plus de détails."
    );
  }
}

function reset() {
  document.getElementById("result").innerHTML = "";
  currentFaviconUrl = "";
}

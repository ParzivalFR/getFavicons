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
          <a href="${currentFaviconUrl}" download="favicon.png" target="_blank">Télécharger le Favicon</a>
        </div>
    `;
}

async function downloadFavicon() {
  if (!currentFaviconUrl) {
    alert("Veuillez d'abord récupérer un favicon");
    return;
  }

  try {
    const response = await fetch(currentFaviconUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "favicon.png";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Erreur lors du téléchargement du favicon");
    console.error("Erreur:", error);
  }
}

async function reset() {
  document.getElementById("result").innerHTML = "";
  currentFaviconUrl = "";
}

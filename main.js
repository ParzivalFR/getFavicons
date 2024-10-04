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

// async function downloadFavicon() {
//   if (!currentFaviconUrl) {
//     alert("Veuillez d'abord récupérer un favicon");
//     return;
//   }

//   const img = new Image();
//   img.crossOrigin = "anonymous"; // Important pour contourner certaines restrictions CORS
//   img.src = currentFaviconUrl;

//   img.onload = () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     canvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = url;
//       a.download = "favicon.png";
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }, "image/png");
//   };

//   img.onerror = () => {
//     alert("Erreur lors du téléchargement de l'image.");
//   };
// }

async function getDownloadFaviconBtn() {
  if (!currentFaviconUrl) {
    alert("Veuillez d'abord récupérer un favicon");
    return;
  }

  // Créer un élément <a> pour forcer le téléchargement
  const a = document.createElement("a");
  a.href = currentFaviconUrl;
  a.download = "favicon.png"; // Nom du fichier à télécharger
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a); // Supprimer l'élément après le clic
}

async function reset() {
  document.getElementById("result").innerHTML = "";
  currentFaviconUrl = "";
}

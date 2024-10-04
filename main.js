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

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    url
  )}&sz=64`;
  currentFaviconUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    faviconUrl
  )}`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <img src="${currentFaviconUrl}" alt="Favicon" id="faviconImage" crossorigin="anonymous">
    <div class="result-infos">
      <a href="${faviconUrl}" target="_blank">${faviconUrl}</a>
    </div>
    <button onclick="downloadFavicon()" class="download-btn">Télécharger le Favicon</button>
  `;
}

async function downloadFavicon() {
  if (!currentFaviconUrl) {
    alert("Veuillez d'abord récupérer un favicon");
    return;
  }

  try {
    const response = await fetch(currentFaviconUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type") || "";
    const blob = await response.blob();

    let extension = "ico"; // Extension par défaut
    if (contentType.includes("png")) {
      extension = "png";
    } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
      extension = "jpg";
    } else if (contentType.includes("svg")) {
      extension = "svg";
    } else if (contentType.includes("gif")) {
      extension = "gif";
    } else if (contentType.includes("x-icon")) {
      extension = "ico";
    } else if (contentType.includes("webp")) {
      extension = "webp";
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `favicon.${extension}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors du téléchargement du favicon:", error);
    alert("Erreur lors du téléchargement. Veuillez réessayer.");
  }
}

function reset() {
  document.getElementById("result").innerHTML = "";
  currentFaviconUrl = "";
}

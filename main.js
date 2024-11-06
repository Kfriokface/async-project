import './style.css'

const searchPhotos = (keyword, color) => {
  document.querySelector("#container").innerHTML = "";
  fetch(
    `https://api.unsplash.com/search/photos?client_id=Y8oAt_roiMdXG5on9dAZrMCAzmctmkKKgMHtNhPiuHU&query=${keyword}`
  )
    .then((res) => res.json())
    .then((res) => {
      printPhotos(res.results);
    });
};

const printPhotos = (photos) => {
  const container = document.querySelector("#container");

  for (const photo of photos) {
    container.innerHTML += `
    <img src="${photo.urls.regular}" alt="${photo.alt_description}" loading="lazy" />
    `;
  }
};

document.querySelector("#searchBtn").addEventListener("click", () => {
  searchPhotos(document.querySelector("#searchInput").value);
});
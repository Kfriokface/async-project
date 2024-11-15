import './style.css';

import { headerContent } from './components/Header/Header';
import { filters, applyFilters } from './components/Filters/Filters';
import { gallery } from './components/Gallery/Gallery';

const container = document.querySelector(".masonry");
const apiKey = "Y8oAt_roiMdXG5on9dAZrMCAzmctmkKKgMHtNhPiuHU";
// const apiKey = process.env.VITE_UNSPLASH_ACCESS_KEY;

export const searchPhotos = (keyword) => {
  container.innerHTML = "";
  fetch(
    `https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=30&lang=es&query=${keyword}`
  )
  .then((res) => res.json())
  .then((res) => {
    gallery(res.results);
    //printPhotos(res.results);
    //return res.results;
  })
  .catch(error => console.error("Error:", error))
  ;
};

const header = document.querySelector("header");
header.innerHTML = headerContent();

const filtersWrapper = document.querySelector("#filters");
filtersWrapper.innerHTML = filters();

// para recover el valor del formulario
const form = document.querySelector('#searchPhotos');
const input = document.querySelector('#searchPhotos > input');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  searchPhotos(input.value);
  //input.value = '';
});

// Escucha el evento de clic en el botón "Aplicar filtros"
const applyfiltersBtn = document.querySelector('#apply-filters');
console.log(applyfiltersBtn);
applyfiltersBtn.addEventListener('click', applyFilters);


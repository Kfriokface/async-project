import './style.css';

import { Header } from './components/Header/Header';
import { Filters, applyFilters } from './components/Filters/Filters';
import { Gallery, galleryPhotos } from './components/Gallery/Gallery';

Header();
Filters();
Gallery();


//const container = document.querySelector(".masonry");

// export const searchPhotos = (keyword, options) => {
//   container.innerHTML = "";
//   fetch(
//     `https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=30&lang=es&query=${keyword}`
//   )
//   .then((res) => res.json())
//   .then((res) => {
//     gallery(res.results);
//     //printPhotos(res.results);
//     //return res.results;
//   })
//   .catch(error => console.error("Error:", error))
//   ;
// };

// const searchPhotos = async (keyword, options) => {
//   const data = await fetch(
//     `https://api.unsplash.com/search/photos?client_id=${apiKey}&per_page=30&lang=es&query=${keyword}`
//   );
//   const res = await data.json();
//   Gallery(res.results);
// }

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const imageContainer = document.querySelector('#image-container');
const loading = document.querySelector('#loading');
const searchForm = document.querySelector('#searchPhotos');
const input = document.querySelector('#searchPhotos input');

let page = 1; // Página inicial
const perPage = 20; // Número de imágenes por página
let currentQuery = ''; // Consulta actual

function buildApiUrl(query, page) {
  if (query) {
    return `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&page=${page}&per_page=${perPage}`;
  }
  return `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}&per_page=${perPage}`;
}

async function searchPhotos(keyword = '') {
  const apiUrl = buildApiUrl(keyword, page);
  try {
    loading.style.display = 'block'; // Mostrar "Cargando..."
    const response = await fetch(`${apiUrl}&query=${keyword}&page=${page}`);
    const data = await response.json();
    galleryPhotos(imageContainer, data.results);
    page++;
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
  } finally {
    loading.style.display = 'none'; // Ocultar "Cargando..."
  }
}

// Recoge el valor del formulario
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  currentQuery = input.value.trim(); // Obtener el término de búsqueda y lo almacena
  page = 1; // Reiniciar a la primera página
  searchPhotos(currentQuery);
  input.value = '';
});

// Función para manejar el scroll infinito
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    searchPhotos(currentQuery);
  }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', handleScroll);






// Escucha el evento de clic en el botón "Aplicar filtros"
const applyfiltersBtn = document.querySelector('#apply-filters');
console.log(applyfiltersBtn);
applyfiltersBtn.addEventListener('click', applyFilters);


import './style.css';

import { Header } from './components/Header/Header';
import { Filters } from './components/Filters/Filters';
import { Gallery, loadedImageIds, galleryPhotos } from './components/Gallery/Gallery';

Header();
Filters();
Gallery();

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const imageContainer = document.querySelector('#image-container');
const loading = document.querySelector('#loading');
const searchForm = document.querySelector('#searchPhotos');
const input = document.querySelector('#searchPhotos input');
const filtersContainer = document.querySelector('#filters');
const orientationSelect = document.querySelector('#orientation');
const colorSelect = document.querySelector('#color');
const applyFiltersButton = document.querySelector('#applyFilters');

let page = 1; // Página inicial
const perPage = 20; // Número de imágenes por página
let currentQuery = ''; // Consulta actual
let currentOrientation = ''; // Orientación seleccionada
let currentColor = ''; // Color seleccionado

// Función para construir la URL de la API
const buildApiUrl = (query, page) => {
  let apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${query}&page=${page}&per_page=${perPage}`;
  // Añadir filtros si están seleccionados
  if (currentOrientation) {
    apiUrl += `&orientation=${currentOrientation}`;
  }
  if (currentColor) {
    apiUrl += `&color=${currentColor}`;
  }
  return apiUrl;
}

const searchPhotos = async (keyword, reset = false) => {
  const apiUrl = buildApiUrl(keyword, page);
  try {
    loading.style.display = 'block';
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (reset) {
      imageContainer.innerHTML = '';
      loadedImageIds.clear(); // Limpiar el conjunto de IDs cargados
    }
    
    // Se mandan los resultados al constructor de la galería
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
  currentOrientation = ''; // Reiniciar orientación
  currentColor = ''; // Reiniciar color
  page = 1; // Reiniciar a la primera página

  searchPhotos(currentQuery, true); //Carga imágenes iniciales con el keyword
  filtersContainer.style.display = 'block'; // Mostrar los filtros después de buscar
  input.value = '';
});

// Evento para manejar la aplicación de filtros
applyFiltersButton.addEventListener('click', () => {
  currentOrientation = orientationSelect.value; // Obtener orientación seleccionada
  currentColor = colorSelect.value; // Obtener color seleccionado
  page = 1; // Reiniciar a la primera página

  searchPhotos(currentQuery, true); // Cargar imágenes con filtros aplicados
});

// Función para manejar el scroll infinito
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    searchPhotos(currentQuery);
  }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', handleScroll);



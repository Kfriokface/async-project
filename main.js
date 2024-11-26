import './style.css';

import { Header } from './components/Header/Header';
import { Filters } from './components/Filters/Filters';
import { Gallery, loadedImageIds, galleryPhotos, showModal } from './components/Gallery/Gallery';
import { Footer } from './components/Footer/Footer';

Header();
Filters();
Gallery();
Footer();

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const imageContainer = document.querySelector('#galleryContainer');
const loading = document.querySelector('#loading');
const searchForm = document.querySelector('#searchPhotos');
const input = document.querySelector('#searchPhotos input');
const filtersBtn = document.querySelector('#filterBtn');
const filtersContainer = document.querySelector('#filters');
const orientationSelect = document.querySelector('#orientation');
const colorSelect = document.querySelector('#color');
const applyFiltersBtn = document.querySelector('#applyFilters');


let page = 1; // Página inicial
const perPage = 20; // Número de imágenes por página
const maxPages = 3; // Número de imágenes por página
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
  const messageContainer = document.querySelector('#messageContainer');
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.results);
    const remainingCalls = response.headers.get('x-ratelimit-remaining');
    localStorage.setItem('remaining', remainingCalls);
    updateRemainingCallsDisplay(remainingCalls);

    if (!data.results.length) {
      messageContainer.style.display = 'block';
      messageContainer.innerHTML = `<p>Lo sentimos no hay resultados para <strong>${keyword}</strong> (y no me extraña).</p>
      <p>Busca otra cosa por favor.</p>`;
    }
    else {
      messageContainer.style.display = 'none';
      loading.style.display = 'block';
      document.body.classList.add('gallery-on');
      if (reset) {
        imageContainer.innerHTML = '';
        loadedImageIds.clear(); // Limpiar el conjunto de IDs cargados
      }  
      // Se mandan los resultados al constructor de la galería
      galleryPhotos(imageContainer, data.results);
      showModal();
      filtersBtn.style.display = 'flex'; // Mostrar los filtros después de buscar
      document.body.classList.add('filters-on');

      if (data.total_pages >  1) {
        page++;
      }
    }
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
  } finally {
    loading.style.display = 'none'; // Ocultar "Cargando..."
  }
}

const updateRemainingCallsDisplay = (remainingCalls) => {
  const displayElement = document.querySelector('#remaining');
  if (remainingCalls !== null) {
    displayElement.textContent = `Llamadas restantes: ${remainingCalls}`;
  } else {
    displayElement.textContent = 'Error al obtener el número de llamadas restantes.';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const remainingCalls = localStorage.getItem('remaining')? localStorage.getItem('remaining'): '50';
  updateRemainingCallsDisplay(remainingCalls);
});

// Recoge el valor del formulario
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  imageContainer.innerHTML = '';
  currentQuery = input.value.trim();  // Obtener el término de búsqueda y lo almacena
  currentOrientation = ''; // Reiniciar orientación
  currentColor = ''; // Reiniciar color
  page = 1; // Reiniciar a la primera página

  searchPhotos(currentQuery, true); //Carga imágenes iniciales con el keyword
  input.value = '';
});

// Muestra los filtros
filtersBtn.addEventListener('click', () => {
  filtersContainer.classList.toggle("d-flex");
});

// Evento para manejar la aplicación de filtros
applyFiltersBtn.addEventListener('click', () => {
  currentOrientation = orientationSelect.value; // Obtener orientación seleccionada
  currentColor = colorSelect.value; // Obtener color seleccionado
  page = 1; // Reiniciar a la primera página

  searchPhotos(currentQuery, true); // Cargar imágenes con filtros aplicados
});

// Función para manejar el scroll infinito
const handleScroll = () => {
  if (page > maxPages) {
    return;
  }
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    document.querySelector('#loading').style.display = 'block';
    searchPhotos(currentQuery);
  }
}

window.addEventListener('scroll', handleScroll);
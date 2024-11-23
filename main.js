import './style.css';

import { Header } from './components/Header/Header';
import { Filters } from './components/Filters/Filters';
import { Gallery, loadedImageIds, galleryPhotos } from './components/Gallery/Gallery';
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
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data.results.length) {
      console.log("Busca otra cosa por favor");
    }
    else {
      loading.style.display = 'block';
      if (reset) {
        imageContainer.innerHTML = '';
        loadedImageIds.clear(); // Limpiar el conjunto de IDs cargados
      }  
      // Se mandan los resultados al constructor de la galería
      galleryPhotos(imageContainer, data.results);
      filtersBtn.style.display = 'flex'; // Mostrar los filtros después de buscar
      document.body.classList.add('filters-on');
      page++;
    }
  } catch (error) {
    console.error('Error al cargar imágenes:', error);
  } finally {
    loading.style.display = 'none'; // Ocultar "Cargando..."
  }
}

const fetchRemainingCalls = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${apiKey}`, {
      headers: {
        Authorization: apiKey,
      }
    });
    console.log(response.headers);
    console.log('Consultas restantes:', response.headers.get('X-Ratelimit-Remaining'));
    const remainingCalls = response.headers.get('X-Ratelimit-Remaining');
    return remainingCalls;
  } catch (error) {
    console.error('Error al obtener las llamadas restantes:', error);
    return null;
  }
}

const updateRemainingCallsDisplay = (remainingCalls) => {
  const displayElement = document.querySelector('#remainingCalls');
  if (remainingCalls !== null) {
    displayElement.textContent = `Llamadas restantes: ${remainingCalls}`;
  } else {
    displayElement.textContent = 'Error al obtener el número de llamadas restantes.';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Obtén el número de llamadas restantes
  const remainingCalls = await fetchRemainingCalls();

  // Actualiza el componente con el valor obtenido
  updateRemainingCallsDisplay(remainingCalls);
});


// Recoge el valor del formulario
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  currentQuery = input.value.trim();  // Obtener el término de búsqueda y lo almacena
  currentOrientation = ''; // Reiniciar orientación
  currentColor = ''; // Reiniciar color
  page = 1; // Reiniciar a la primera página

  searchPhotos(currentQuery, true); //Carga imágenes iniciales con el keyword
  input.value = '';
});

// muestra los filtrod
filtersBtn.addEventListener('click', () => {
  filtersContainer.style.display = 'flex';
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
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    searchPhotos(currentQuery);
  }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', handleScroll);

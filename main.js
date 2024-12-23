import './style.css';
import lazySizes from 'lazysizes';

import { Header } from './components/Header/Header';
import { Filters } from './components/Filters/Filters';
import { Gallery, loadedImageIds, galleryPhotos, showModal, closeModal } from './components/Gallery/Gallery';
import { Footer } from './components/Footer/Footer';

Header();
Filters();
Gallery();
Footer();

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

//settings inciales
const body = document.body;
const imageContainer = document.querySelector('#galleryContainer');
const loading = document.querySelector('#loading');
const searchForm = document.querySelector('#searchPhotos');
const input = document.querySelector('#searchPhotos input');
const filtersBtn = document.querySelector('#filterBtn');
const orientationSelect = document.querySelector('#orientation');
const colorSelect = document.querySelector('#color');
const pagesInput = document.querySelector('#pages');
const orderBy = document.querySelector('#order');
const applyFiltersBtn = document.querySelector('#applyFilters');
const messageContainer = document.querySelector('#messageContainer');

let page = 1; // Página inicial
let totalPages; // Límite de páginas
const perPage = 20; // Número de imágenes por página
let maxPages = 3; // Número de páginas por búsqueda (cada página consume una consulta)
let currentQuery = ''; // Consulta actual
let currentOrientation = ''; // Orientación seleccionada
let currentOrientationText = ''; // Orientación seleccionada
let currentColor = ''; // Color seleccionado
let currentColorText = ''; // Color seleccionado
let currentOrder = ''; // Color seleccionado


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
  if (currentOrder) {
    apiUrl += `&order_by=${currentOrder}`;
  }
  console.log(apiUrl);
  return apiUrl;
}

/*
 * Función para buscar de imágenes
 * param keyword: término de búsqueda
 * param reset: vacia la información previa
 */
const searchPhotos = async (keyword, reset = false, event) => {
  const apiUrl = buildApiUrl(keyword, page);
  const messageContainer = document.querySelector('#messageContainer');
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.results);
    const remainingCalls = response.headers.get('X-Ratelimit-Remaining');
    localStorage.setItem('remaining', remainingCalls);
    updateRemainingCallsDisplay(remainingCalls);

    if ( !data.results.length ) {
      if (reset) {
        imageContainer.innerHTML = '';
        loadedImageIds.clear();
      }
      if ( body.classList.contains('gallery-on') ) {
        body.classList.remove('gallery-on');
      }
      messageContainer.style.display = 'block';
      messageContainer.innerHTML = `<p>Lo sentimos no hay resultados para <strong>${keyword} ${currentOrientationText} ${currentColorText}</strong> (y no me extraña).</p>
      <p>Busca otra cosa por favor.</p>`;
    }
    else {
      messageContainer.style.display = 'none';
      loading.style.display = 'block';
      body.classList.add('gallery-on');

      if (reset) {
        imageContainer.innerHTML = '';
        loadedImageIds.clear();
      }  
      // Se mandan los resultados al constructor de la galería
      galleryPhotos(imageContainer, data.results);
      showModal();
      filtersBtn.style.display = 'flex';

      totalPages = data.total_pages;
      if (totalPages >  1) {
        page++;
      }
    }
  } catch (error) {
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `<p>En este momento no podemos mostrar imágenes, inténtalo de nuevo un poco más tarde. Gracias.</p>`;
    console.error('Error al cargar imágenes:', error);
  } finally {
    loading.style.display = 'none'; //Se oculta el loading cada llamada del scroll infinito.
  }
}

// Función para copiar la altura
const headerHeigth = () => {
  const originHeigth = document.body.querySelector('header').offsetHeight + 'px';
  document.body.querySelector('main').style.marginTop = originHeigth;
}


// Añado las funciones para cerrar el modal
closeModal(document.querySelector('#modal'));
closeModal(document.querySelector('#closeModal'));

// Recoge el valor del formulario
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  body.classList.remove(...body.classList);
  filtersBtn.style.display = 'none';
  imageContainer.innerHTML = '';
  currentQuery = input.value.trim();
  currentOrientation = '';
  currentColor = '';
  page = 1; //

  searchPhotos(currentQuery, true);
  input.value = '';
});

// Muestra los filtros
filtersBtn.addEventListener('click', () => {
  body.classList.toggle('filters-on');
  headerHeigth();
});

// Validar filtros
pagesInput.addEventListener('input', () => {
  const valor = parseInt(pagesInput.value, 10);
  const min = parseInt(pagesInput.min, 10);
  const max = parseInt(pagesInput.max, 10);

  if (valor < min || valor > max) {
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = `El valor debe estar entre ${min} y ${max}.`;
  } else {
    messageContainer.style.display = 'none';
    messageContainer.innerHTML = '';
  }
});

// Evento para manejar la aplicación de filtros
applyFiltersBtn.addEventListener('click', (event) => {
  currentOrientation = orientationSelect.value;
  currentOrientationText = orientationSelect.selectedOptions[0].innerHTML;
  currentColor = colorSelect.value;
  currentColorText = colorSelect.selectedOptions[0].innerHTML;
  currentOrder = orderBy.value;
  maxPages = parseInt(pagesInput.value);
  page = 1;
  searchPhotos(currentQuery, true, event);
});

/*
 * Se actualizan las consultas restantes sobre el total 
 * El sistema no da información del intervalo de tiempo para resetear los contadores cada hora
 * Creo que la API debe tener algún sistema de caché que hace que las respuestas de las cabeceras a veces no sean correctas
 */
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

// Función para manejar el scroll infinito
const handleScroll = () => {
  if (!currentQuery) {
    return;
  }
  if (page > maxPages || totalPages <= 1) {
    return;
  }
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 30) {
    document.querySelector('#loading').style.display = 'block';
    searchPhotos(currentQuery);
  }
}

window.addEventListener('resize', headerHeigth);
window.addEventListener('scroll', handleScroll);

headerHeigth();

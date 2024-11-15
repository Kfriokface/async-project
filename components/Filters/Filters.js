import './Filters.css';

export const filters = () =>
 `<div id="filters">
    <select id="orientation-filter">
      <option value="">Cualquier orientación</option>
      <option value="landscape">Paisaje</option>
      <option value="portrait">Retrato</option>
    </select>

    <select id="color-filter">
      <option value="">Cualquier color</option>
      <option value="black_and_white">Blanco y negro</option>
      <option value="black">Negro</option>
      <option value="white">Blanco</option>
      <option value="yellow">Amarillo</option>
      <option value="orange">Naranja</option>
      <option value="red">Rojo</option>
      <option value="purple">Púrpura</option>
      <option value="magenta">Magenta</option>
      <option value="green">Verde</option>
      <option value="teal">Turquesa</option>
      <option value="blue">Azul</option>
    </select>

    <button id="apply-filters">Aplicar filtros</button>
  </div>`
;

// Función para aplicar filtros
export const applyFilters = () => {
  const selectedOrientation = orientationFilter.value;
  const selectedColor = colorFilter.value;

  let filteredPhotos = photos;

  // Filtra por orientación si se selecciona una
  if (selectedOrientation) {
    filteredPhotos = filteredPhotos.filter(photo => photo.width > photo.height && selectedOrientation === 'landscape' || 
      photo.height > photo.width && selectedOrientation === 'portrait');
  }

  // Filtra por color si se selecciona uno
  if (selectedColor) {
    filteredPhotos = filteredPhotos.filter(photo => photo.color === selectedColor);
  }

  renderPhotos(filteredPhotos); // Renderiza las fotos filtradas
}


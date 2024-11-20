import './Filters.css';

const filtersIcon = () => `
  <i class="fa-solid fa-filter"></i>
`;

const filtersContents = () =>
 `
    <label for="orientation">Orientación:</label>
      <select id="orientation">
        <option value="">Cualquier orientación</option>
        <option value="landscape">Horizontal</option>
        <option value="portrait">Vertical</option>
        <option value="squarish">Cuadrada</option>
      </select>
      <label for="color">Color:</label>
      <select id="color">
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
      <button id="applyFilters">Aplicar Filtros</button>
`;

export const Filters = () => {
  //añado el icono al header
  const filterIcon = document.createElement('button');
  filterIcon.id = 'filter-icon';
  filterIcon.innerHTML = filtersIcon();
  document.querySelector(".header__wrapper").append(filterIcon);
  //contenedor de filtros
  const filter = document.createElement('section');
  filter.id = 'filters';
  filter.style.display = 'none';
  filter.innerHTML = filtersContents();
  document.querySelector("header").append(filter);
}



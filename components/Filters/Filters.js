import './Filters.css';

const filtersIcon = () => `
  Filtros <span class="material-icons">filter_list</span>
`;

const filtersContents = () =>`
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
  <label for="pages">Límite de páginas:</label>
  <input type="number" id="pages" name="pages" min="1" max="10" value="3" />
  <button id="applyFilters">Aplicar Filtros</button>
`;

export const Filters = () => {
  //añado el icono al header
  const filterBtn = document.createElement('button');
  filterBtn.id = 'filterBtn';
  filterBtn.style.display = 'none';
  filterBtn.innerHTML = filtersIcon();
  document.querySelector(".header__search").append(filterBtn);
  //contenedor de filtros
  const filter = document.createElement('section');
  filter.id = 'filters';
  filter.innerHTML = filtersContents();
  document.querySelector("header").append(filter);
}

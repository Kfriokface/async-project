import './Header.css';

const headerContent = () => `
  <section class="header__wrapper">
    <figure class="logo">FotomaTown</figure>
    <form id="searchPhotos" class="search" method="get" role="search" aria-label="Encuentra imágenes PhotoMaTown" action="/s">
      <div class="search__wrapper">
        <input type="search" name="searchKeyword" placeholder="Buscar fotos e ilustraciones" title="Buscar en PhotoMaTown" class="search__input" required value="">
        <button title="Buscar en PhotoMaTown" class="search__btn" type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>   
      </div>
    </form>
  </section>
`;

export const Header = () => {
  document.querySelector("header").innerHTML = headerContent();
}
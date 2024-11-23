import './Header.css';

const headerContent = () => `
  <div class="header__wrapper">
    <figure class="header__logo">
      <picture>
        <source srcset="../../assets/images/fotomatown.svg" media="(min-width: 481px)" />
        <img src="../../assets/images/fotomatown_sm.svg" alt="Fotomatown"/>
      </picture>
    </figure>
    <div class="header__search">
      <form id="searchPhotos" method="get" role="search" aria-label="Encuentra imágenes PhotoMaTown" action="/s">
        <div class="header__search-wrapper">
          <input type="search" name="searchKeyword" placeholder="Ej: Darth Vader" title="Buscar en PhotoMaTown" class="header__search-input" required value="">
          <button title="Buscar en PhotoMaTown" class="header__search-btn" type="submit">
            <span class="material-icons">search</span>
          </button>   
        </div>
      </form>
    </div>
  </div>
`;

export const Header = () => {
  document.querySelector("header").innerHTML = headerContent();
}
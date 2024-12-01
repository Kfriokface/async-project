import "./Footer.css";

const Year = new Date().getFullYear();

const footerContent = (calls) => `
  <div class="footer__pattern"></div>
  <div class="footer__text">  
    <p>Para mostrar el contenido, esta página hace uso de la conexión gratuita a la API de Unsplash, la cual permite hacer 50 llamadas cada hora</p>
    <p id="remaining"></p>
    <figure class="footer__logo">
      <img src="/images/fotomatown.svg" alt="Fotomatown"/>
    </figure>
    <p>©${Year} Alberto Sancho</p>
  </div>
`;

export const Footer = () => {
  const footer = document.createElement('footer');
  footer.id = 'footer';
  footer.classList.add('footer');
  footer.innerHTML = footerContent();
  document.body.append(footer);
}
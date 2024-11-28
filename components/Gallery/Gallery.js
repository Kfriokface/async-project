import './Gallery.css';

export const Gallery = () => {
  const main = document.querySelector('main');
  // Creo en contenedor para las imágenes
  const gallery = document.createElement('div');
  gallery.id = 'galleryContainer';
  gallery.classList.add('gallery');
  main.appendChild(gallery);
  // Creo el contenedor para mostrar la info de carga
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.classList.add('gallery-loading');
  loading.style.display= 'none';
  loading.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-3x"></i>`;
  main.appendChild(loading);
  // Creo el contenedor para el modal
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal__wrapper">
      <span id="modalClose" class="modal__close"><i class="fa-solid fa-xmark"></i></span>
      <img id="modalImg" class="modal__img">
      <div id="modalCaption" class="modal__caption"></div>
    </div>
  `;
  main.appendChild(modal);
};

export const loadedImageIds = new Set();

export const galleryPhotos = (container, photos) => {
  photos.forEach(photo => {
    if (!loadedImageIds.has(photo.id)) {
      const photoDiv = document.createElement('div');
      photoDiv.classList.add('gallery-item');

      //img
      const img = document.createElement('img');
      //datos necesarios para salida.
      img.src = photo.urls.small;
      img.alt = photo.alt_description || 'Sin descripción';
      img.classList.add('lazyload');
      //para el modal los almaceno en data attributes. De este modo no es necesario consumir otra consulta a posteriori.
      img.setAttribute('data-autor', photo.user.name);
      img.setAttribute('data-img', photo.urls.regular);
      img.setAttribute('data-created', photo.created_at);
      img.setAttribute('data-color', photo.color);
      
      photoDiv.appendChild(img);

      //likes
      const likes = document.createElement('span');
      likes.classList.add('likes');
      likes.innerHTML = `<i class="fa-regular fa-heart"></i>${photo.likes}`;
      photoDiv.appendChild(likes);

      container.appendChild(photoDiv);
      loadedImageIds.add(photo.id);
    }
  });
}

export const showModal = () => {
  // Selección de elementos
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const modal = document.querySelector('#modal');
  const modalImage = document.querySelector('#modalImg');
  const closeModal = document.querySelector('#modalClose');

  // Añadir evento a cada imagen
  galleryImages.forEach(img => {
    img.addEventListener('click', (event) => {
      event.preventDefault();
      modal.style.display = 'block';
      document.body.classList.add('modal-on');
      const caption = (img.alt)? img.alt.trim().charAt(0).toUpperCase() + img.alt.trim().slice(1): 'Sin descripción';
      modal.innerHTML = `
        <div class="modal__wrapper" style="background-color: ${img.dataset.color}">
          <figure class="modal__image">
            <img src=${img.dataset.img} alt="${caption}" >
            <figcaption>${caption}</figcaption>
          </figure>
          <div class="modal__autor">
            <p>Autor: ${img.dataset.autor}</p>
            <p>Creada: ${img.dataset.created}</p>
          </div>
        </div>
      `;
    });
  });

  // Cerrar el modal al hacer clic en la 'X'
  closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    document.body.classList.remove('modal-on');
  });

  // Cerrar el modal al hacer clic fuera de la imagen
  modal.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-on');
    }
  });
}

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
      <span class="modal__close" id="closeModal"><i class="fa-solid fa-xmark"></i></span>
      <img src="" alt="" >  
      <div class="modal__info">
        <p class="caption"></p>
        <p class="autor"></p>
        <p class="creado"></p>
      </div>
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
  const galleryImages = document.querySelectorAll('.gallery-item img');
  galleryImages.forEach(img => {
    img.addEventListener('click', (event) => {
      event.preventDefault();
      buildModal(img);
    });
  });
}

// Construye el contenido del modal
const buildModal = (img) => {
  const modalImg = document.querySelector('#modal img');
  const modalCaption = document.querySelector('#modal .caption');
  const modalAuthor = document.querySelector('#modal .autor');
  const modalCreated = document.querySelector('#modal .creado');
  const caption = (img.alt)? img.alt.trim().charAt(0).toUpperCase() + img.alt.trim().slice(1): 'Sin descripción';
  modalImg.src = img.dataset.img;
  modalImg.alt = caption;
  modalCaption.innerHTML = caption;
  modalAuthor.innerHTML = img.dataset.autor;
  modalCreated.innerHTML = img.dataset.created;

  modal.style.display = 'block';
  document.body.classList.add('modal-on');
}

export const closeModal = (selector) => {
  selector.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    document.body.classList.remove('modal-on');
  });
}

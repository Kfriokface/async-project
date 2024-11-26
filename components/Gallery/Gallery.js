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
    <span id="modalClose" class="modal__close"><i class="fa-solid fa-xmark"></i></span>
    <img id="modalImg">
    <div id="modalCaption" class="modal__caption"></div>
  `;
  main.appendChild(modal);
};

export const loadedImageIds = new Set();

export const galleryPhotos = (container, photos) => {
  photos.forEach(photo => {
    if (!loadedImageIds.has(photo.id)) {
      const photoDiv = document.createElement('div');
      photoDiv.classList.add('gallery-item');
      const img = document.createElement('img');
      img.src = photo.urls.small;
      img.alt = photo.alt_description || 'Unsplash Image';
      img.setAttribute('data-id', photo.id);
      img.setAttribute('data-img-raw', photo.urls.small);
      img.setAttribute('loading', 'lazy');
      photoDiv.appendChild(img);
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
  const caption = document.querySelector('#modalCaption');
  const closeModal = document.querySelector('#modalClose');

  // Añadir evento a cada imagen
  galleryImages.forEach(img => {
    img.addEventListener('click', (event) => {
      event.preventDefault();
      modal.style.display = 'block';
      modalImage.src = img.dataset.imgRaw;
      caption.textContent = img.alt || 'Sin descripción';
    });
  });

  // Cerrar el modal al hacer clic en la 'X'
  closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
  });

  // Cerrar el modal al hacer clic fuera de la imagen
  modal.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

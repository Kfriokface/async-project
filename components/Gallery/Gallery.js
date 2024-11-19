import './Gallery.css';

// export const printPhotos = (photos) => {
//   for (const photo of photos) {
//     masonryContainer.innerHTML += `
//     <img src="${photo.urls.regular}" alt="${photo.alt_description}" loading="lazy" />
//     `;
//   }
// };

export const Gallery = () => {
  const main = document.querySelector('main');
  // Creo en contenedor para las imágenes
  const gallery = document.createElement('div');
  gallery.id = 'image-container';
  gallery.classList.add('image-container', 'masonry');
  main.appendChild(gallery);
  // Creo el contenedor para mostrar la info de carga
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.classList.add('loading');
  loading.style.display= 'none';
  loading.innerHTML = "Cargando más imágenes...";
  main.appendChild(loading);
};

export const galleryPhotos = (container, photos) => {
  photos.forEach(photo => {
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('masonry-item');
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || 'Unsplash Image';
    img.setAttribute('loading', 'lazy');
    photoDiv.appendChild(img);
    container.appendChild(photoDiv);
  });
}

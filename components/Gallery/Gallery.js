import './Gallery.css';

// export const printPhotos = (photos) => {
//   for (const photo of photos) {
//     masonryContainer.innerHTML += `
//     <img src="${photo.urls.regular}" alt="${photo.alt_description}" loading="lazy" />
//     `;
//   }
// };

export const gallery = (photos) => {
  const gallery = document.createElement('section');
  gallery.classList.add('masonry');
  document.querySelector('main').appendChild(gallery);

  photos.forEach(photo => {
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('masonry-item');

    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || 'Unsplash Image';
    img.setAttribute('loading', 'lazy');

    photoDiv.appendChild(img);
    gallery.appendChild(photoDiv);
  });
}
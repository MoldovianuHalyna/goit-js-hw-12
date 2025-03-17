import SimpleLightbox from 'simplelightbox';

// functions that renders the markup

export const createGalleryMarkup = function ({
  webformatURL: smallIMG,
  largeImageURL: largeIMG,
  tags: alt,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeIMG}">
      <img
        class="gallery-image"
        src="${smallIMG}"
        alt="${alt}"
      />
    </a>
   
    <ul class = "description-list">
        <li class="description"><span>Likes</span> ${likes}</li>
        <li class="description"><span>Views</span> ${views}</li>
        <li class="description"><span>Comments</span> ${comments}</li>
        <li class="description"><span>Downloads</span> ${downloads}</li>
        </ul>
      
  </li>`;
};

export const createLightBox = function () {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
};

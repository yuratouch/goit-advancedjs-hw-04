import SimpleLightbox from 'simplelightbox';
import fetchApiData from './js/pixabay-api';
import generateGalleryMarkup from './js/render-functions';

const formElement = document.querySelector('.js-form'),
  loaderElement = document.querySelector('.js-loader'),
  galleryContainer = document.querySelector('.js-gallery'),
  simpleLightboxInstance = new SimpleLightbox('.js-gallery a.gallery-link', {
    captionDelay: 250,
    overlayOpacity: 0.8,
  }),
  submitHandler = event => {
    event.preventDefault();
    loaderElement.style.display = 'flex';

    fetchApiData(event.target.elements['user-query'].value)
      .then(images => {
        galleryContainer.innerHTML = generateGalleryMarkup(images);
        simpleLightboxInstance.refresh();
      })
      .finally(() => {
        formElement.reset();
        loaderElement.style.display = 'none';
      });
  };

formElement.addEventListener('submit', submitHandler);

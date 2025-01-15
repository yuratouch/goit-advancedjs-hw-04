import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import fetchApiData from './js/pixabay-api';
import generateGalleryMarkup from './js/render-functions';

let pageNumber, savedQueryValue;

const simpleLightboxInstance = new SimpleLightbox('a.gallery-link', {
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const DOM = {
  form: document.querySelector('.js-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
  loadMore: document.querySelector('.js-load-more-btn'),
  lastPage: document.querySelector('.js-last-page-message'),
};

DOM.form.addEventListener('submit', submitHandler);
DOM.loadMore.addEventListener('click', loadMoreImages);

async function submitHandler(event) {
  event.preventDefault();
  const queryValue = event.target.elements['user-query'].value.trim();

  if (queryValue) {
    showElement(DOM.loader);
    savedQueryValue = queryValue;

    const { images, isNext } = await fetchApiData(queryValue);

    if (images?.length) {
      DOM.gallery.innerHTML = generateGalleryMarkup(images);
      simpleLightboxInstance.refresh();

      isNext && showElement(DOM.loadMore);
      hideElement(DOM.loader);

      pageNumber = 2;
      DOM.form.reset();
    } else {
      iziToastMessageHandler(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideElement(DOM.loader);
      return;
    }
  } else {
    iziToastMessageHandler('Search query cannot be empty.');
    return;
  }
}

async function loadMoreImages() {
  showElement(DOM.loader);
  hideElement(DOM.loadMore);

  const { images, isNext } = await fetchApiData(savedQueryValue, pageNumber);

  if (images?.length === 0) {
    showElement(DOM.lastPage);

  } else if (images?.length) {
    DOM.gallery.insertAdjacentHTML('beforeend', generateGalleryMarkup(images));
    simpleLightboxInstance.refresh();
    isNext ? showElement(DOM.loadMore) : showElement(DOM.lastPage);

    smoothScroll();
    pageNumber++;
  }

  hideElement(DOM.loader);
}

function smoothScroll() {
  const card = document.querySelector('.gallery-card');
  const height = card.getBoundingClientRect().height + 24;

  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
}

function iziToastMessageHandler(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
  });
}

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}

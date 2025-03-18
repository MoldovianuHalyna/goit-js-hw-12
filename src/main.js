import iziToast from 'izitoast';
import { getPhotoFromServer } from './js/pixabay-api';
import { createGalleryMarkup, lightbox } from './js/render-functions';
import icon from './img/icon.svg';
//selecting the elements
const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};
// Function to show the loader
const showLoader = () => {
  refs.loader.classList.remove('is-hidden');
};

// Function to hide the loader
const hideLoader = () => {
  refs.loader.classList.add('is-hidden');
};
//function to delet the load button
const loadBtnShow = () => refs.loadMoreBtn.classList.remove('is-hidden');

//to show the button
const loadBtnHide = () => refs.loadMoreBtn.classList.add('is-hidden');
//getting data from server and creating a gallery
hideLoader();
3;
let page = 1;
let dataName = '';
let totalPages = 0;

const searchInputHandeling = async function (event) {
  event.preventDefault();
  dataName = event.currentTarget.elements['search-text'].value.trim();

  if (dataName === '') {
    alert('Please enter a valid data');
    loadBtnHide();
    return;
  }
  page = 1;
  loadBtnHide();

  showLoader();

  try {
    const { hits, totalHits } = await getPhotoFromServer(dataName, page);
    if (hits.length === 0) {
      iziToast.error({
        messageColor: '#fff',
        close: false,
        iconUrl: icon,
        backgroundColor: '#ef4040',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        timeout: 10000,
      });

      loadBtnHide();
      refs.form.reset();
      refs.gallery.innerHTML = '';
      return;
    }

    const galleryTemplate = hits.map(img => createGalleryMarkup(img)).join('');
    refs.gallery.innerHTML = galleryTemplate;

    lightbox.refresh();

    totalPages = Math.ceil(totalHits / 15);
    if (totalPages > 1) {
      refs.form.reset();

      loadBtnShow();
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
    }
  } catch (error) {
    iziToast.error({
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 10000,
    });
  } finally {
    hideLoader();
  }
};

///////pagination

const onLoadMoreBtn = async function () {
  try {
    page++;

    if (totalPages === page) {
      loadBtnHide();
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results`,
      });
    }

    const { hits } = await getPhotoFromServer(dataName, page);
    const galleryTemplate = hits.map(img => createGalleryMarkup(img)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate);
    const itemHeight = refs.gallery.children[0].getBoundingClientRect().height;

    window.scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
    lightbox.refresh();

    showLoader();
  } catch (error) {
    iziToast.error({
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 10000,
    });
  } finally {
    hideLoader();
  }
};
refs.form.addEventListener('submit', searchInputHandeling);

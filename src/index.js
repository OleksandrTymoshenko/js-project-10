import './sass/main.scss';
import './js/auth-modal.js';
import { debounce, throttle } from 'lodash';
import ApiService from './js/ApiService';
import RenderService from './js/RenderService';
import Auth from './js/Auth';
import { propFirebase } from './js/Auth';
import './js/loader.js';
import footerModal from './js/footerModal';
import { openModal as openAuthModal } from './js/auth-modal';
const apiService = new ApiService();
const renderService = new RenderService();
import Notiflix from 'notiflix';
import './js/btn-up.js';
import { removeFilm, addToLibrary, getFilmsFromLibrary } from './js/serviceFirebase';

const refs = {
  input: document.querySelector('.input'),
  list: document.querySelector('.list'),
  modal: document.querySelector('[data-modal]'),
  naviListMain: document.querySelector('.navi__list[data-action="main"]'),
  naviListLib: document.querySelector('.navi__list[data-action="library"]'),
  headerMain: document.querySelector('header[data-action="main"]'),
  headerLib: document.querySelector('header[data-action="library"]'),
  footerBtnModal: document.querySelector('.footer__team-button'),
};

const Uid = propFirebase;

refs.headerLib.style.display = 'none';
refs.naviListMain.addEventListener('click', onNaviListClick);
refs.naviListLib.addEventListener('click', onNaviListClick);

function getPopular() {
  apiService.getPopularFilms().then(films => {
    renderService.renderAllFilms(films);
    window.addEventListener('scroll', debounce(onScroll, 1500));
  });
}

function onScroll() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    apiService.getPopularFilms().then(films => {
      renderService.renderAllFilms(films);
    });
  }

  window.removeEventListener('scroll', debounce(onScroll, 1500));
}

function closeModal() {
  refs.modal.classList.add('hidden');
  renderService.clearList();
}

const openModal = id => {
  refs.modal.classList.remove('hidden');

  apiService.getFilmDetails(id).then(data => {
    renderService.renderFilmDetails(data);

    const addToLibBtn = document.querySelector('[data-action="addToLib"]');
    const addToQueBtn = document.querySelector('[data-action="addToQue"]');

    addToLibBtn.addEventListener('click', () => {
      if (Uid.logIn !== true) {
        openAuthModal();
        return;
      }

      const filmElem = document.querySelector('.film-details');

      const obj = {
        id: filmElem.id,
        title: filmElem.querySelector('.about__title').innerText,
        overview: filmElem.querySelector('.about__description--text').innerText,
        path: filmElem.querySelector('.film-details__path').getAttribute('src'),
        popularity: filmElem.querySelector('.popularity').innerText,
      };

      addToLibrary(obj);
    });

    addToQueBtn.addEventListener('click', () => {
      removeFilm(id);
    });
  });

  function EscCloseModal(e) {
    if (e.code === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', EscCloseModal);
    }
  }

  window.addEventListener('keydown', EscCloseModal);

  refs.modal.addEventListener('click', e => {
    if (e.target.dataset.action === 'close') {
      closeModal();
    }

    // if (e.target.dataset.action === 'addToLib') {
    //   if (Uid.logIn !== true) {
    //     openAuthModal();
    //     return;
    //   }

    //   const filmElem = document.querySelector('.film-details');

    //   const obj = {
    //     id: filmElem.id,
    //     title: filmElem.querySelector('.about__title').innerText,
    //     overview: filmElem.querySelector('.about__description--text').innerText,
    //     path: filmElem.querySelector('.film-details__path').getAttribute('src'),
    //     popularity: filmElem.querySelector('.popularity').innerText,
    //   };
    //   object = obj;
    //   addToLibrary(object);
    //   // addFilmToLibrary(obj);
    //   // writeUserData(object);
    //   // console.log(Uid.uid);
    // }

    // if (e.target.dataset.action === 'addToQue') {
    //   if (Uid.logIn !== true) {
    //     openAuthModal();
    //     return;
    //   }

    //   const filmElem = document.querySelector('.film-details');

    //   const obj = {
    //     id: filmElem.id,
    //     title: filmElem.querySelector('.about__title').innerText,
    //     overview: filmElem.querySelector('.about__description--text').innerText,
    //     path: filmElem.querySelector('.film-details__path').getAttribute('src'),
    //     popularity: filmElem.querySelector('.popularity').innerText,
    //   };
    //   queue = obj;

    //   getFilmsFromLibrary();
    //   // writeUserData(queue);
    //   // console.log(Uid);
    // }
  });
};

const getDetails = e => {
  if (e.target.nodeName === 'IMG') {
    const { id } = e.target.parentNode;
    openModal(id);
  }
};

const findFilm = debounce(() => {
  apiService.query = refs.input.value.trim();

  if (apiService.query.length >= 2) {
    apiService.getFilmsByName().then(filmsArr => {
      if (filmsArr.length === 0) {
        return Notiflix.Notify.warning(
          'Search result not successful. Enter the correct movie name',
        );
      }

      renderService.renderAllFilms(filmsArr);
    });
  }
}, 500);

function getMembers() {
  refs.modal.classList.remove('hidden');
  renderService.renderMembers();
  const list = document.querySelector('.member-list');
}

function onNaviListClick(e) {
  if (e.target.textContent === 'Home') {
    refs.headerMain.style.display = 'block';
    refs.headerLib.style.display = 'none';
  }
  if (e.target.textContent === 'My library' && Uid.logIn === true) {
    refs.headerMain.style.display = 'none';
    refs.headerLib.style.display = 'block';
  }
}

function onNaviHomeClick() {
  refs.headerMain.style.display = 'none';
  refs.headerLib.style.display = 'block';
}

window.addEventListener('load', getPopular);
refs.list.addEventListener('click', getDetails);
refs.input.addEventListener('input', findFilm);
refs.footerBtnModal.addEventListener('click', getMembers);

export { onNaviHomeClick };

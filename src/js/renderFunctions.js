import './auth-modal.js';
import { debounce } from 'lodash';
import ApiService from './ApiService';
import RenderService from './RenderService';
import { propFirebase } from './Auth';
import './loader.js';
import { openModal as openAuthModal } from './auth-modal';
const apiService = new ApiService();
const renderService = new RenderService();
import Notiflix from 'notiflix';
import './btn-up.js';
import { addToLibrary, getArrayFromLibrary } from './serviceFirebase';

const refs = {
  input: document.querySelector('.input'),
  inputButton: document.querySelector('.button__search'),
  list: document.querySelector('.list'),
  modal: document.querySelector('[data-modal]'),
  naviListMain: document.querySelector('.navi__list[data-action="main"]'),
  naviListLib: document.querySelector('.navi__list[data-action="library"]'),
  headerMain: document.querySelector('header[data-action="main"]'),
  headerLib: document.querySelector('header[data-action="library"]'),
  footer: document.querySelector('.footer__wrapper'),
  footerBtnModal: document.querySelector('.footer__team-button'),
  naviLogoButtonMain: document.querySelector('.button-logo[data-action="main"]'),
  naviLogoButtonLibrary: document.querySelector('.button-logo[data-action="library"]'),

  btnThemeMode: document.querySelector('.theme__switcher'),
  btnBackToTop: document.querySelector('.back_to_top'),
};

const Uid = propFirebase;

// функция для запуска Infiniti Scroll
const onScroll = debounce(function () {
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
}, 1200);

//Отрисрвка популярных фильмов
export function getPopular() {
  apiService.getPopularFilms().then(films => {
    renderService.renderAllFilms(films);
    window.addEventListener('scroll', onScroll);
  });
}

export function renderMyFilms() {
  getArrayFromLibrary().then(renderService.renderFromLibrary);
}

// Функция поиска фильма в хедере
export function findFilm() {
  apiService.query = refs.input.value.trim();

  if (apiService.query.length >= 2) {
    window.removeEventListener('scroll', onScroll);
    apiService.getFilmsByName().then(filmsArr => {
      if (filmsArr.length === 0) {
        return Notiflix.Notify.warning(
          'Search result not successful. Enter the correct movie name',
        );
      }

      renderService.renderFinders(filmsArr);
    });
  }
}

// Отрисовка карточек героев в футере
export function getMembers() {
  refs.modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  renderService.renderMembers();
}

// Получение карточки фильма и открытие в модалке
export const getDetails = e => {
  if (e.target.nodeName === 'IMG') {
    const { id } = e.target.parentNode;
    openModal(id);
  }
};

export function closeModal() {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  refs.modal.classList.add('hidden');

  renderService.clearList();
}

export function openModal(id) {
  refs.modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';

  apiService.getFilmDetails(id).then(data => {
    renderService.renderFilmDetails(data);

    const addToLibBtn = document.querySelector('[data-action="addToLib"]');
    const addToQueBtn = document.querySelector('[data-action="addToQue"]');

    // Кнопка Library в модалке
    addToLibBtn.addEventListener('click', () => {
      if (Uid.logIn !== true) {
        openAuthModal();
        return;
      }

      const filmElem = document.querySelector('.film-details');

      const obj = {
        id: filmElem.id,
        title: filmElem.querySelector('.about__title').innerText,
        path: filmElem.querySelector('.film-details__path').getAttribute('src'),
        genres: filmElem.querySelector('.genres').innerText,
      };

      addToLibrary(obj);
    });

    // Кнопка Queue в модалке
    addToQueBtn.addEventListener('click', () => {
      if (Uid.logIn !== true) {
        openAuthModal();
        return;
      }
      getArrayFromLibrary().then(console.log);
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
  });
}

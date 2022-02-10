import { debounce } from 'lodash';
import ApiService from './ApiService';
import RenderService from './RenderService';
import { propFirebase } from './Auth';
import './loader.js';
import { openModal as openAuthModal } from './auth-modal';
import LocalSaver from './localSaver';
const localSaver = new LocalSaver();
const apiService = new ApiService();
const renderService = new RenderService();
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('.input'),
  inputButton: document.querySelector('.button__search'),
  list: document.querySelector('.list'),
  modal: document.querySelector('[data-modal]'),
  headerMain: document.querySelector('header[data-action="main"]'),
  headerLib: document.querySelector('header[data-action="library"]'),
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
  const films = localSaver.getWatched();
  window.removeEventListener('scroll', onScroll);
  renderService.renderFromLibrary(films);
}

export function renderMyQueue() {
  const films = localSaver.getQueue();
  window.removeEventListener('scroll', onScroll);
  const queue = films.reverse();
  renderService.renderFromLibrary(queue);
}

// Функция поиска фильма в хедере
export function findFilm() {
  apiService.query = refs.input.value.trim();

  if (apiService.query.length >= 2) {
    window.removeEventListener('scroll', onScroll);
    apiService.getFilmsByName().then(filmsArr => {
      if (filmsArr.length === 0) {
        Notiflix.Notify.warning('Search result not successful. Enter the correct movie name');
        Notiflix.Notify.merge({
          position: 'center-top',
        });

        return;
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
export function getDetails(e) {
   if (e.target.nodeName === 'IMG') {
    const { id } = e.target.parentNode;
    openModal(id);
  }
}

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

    let idsArr = localSaver.getWatchedIds();
    if (!idsArr) {
      idsArr = [];
    }
    let queueIdsArr = localSaver.getQueueIds();
    if (!queueIdsArr) {
      queueIdsArr = [];
    }

    if (idsArr.includes(id)) {
      addToLibBtn.textContent = 'DELETE FROM WATCHED';
      return;
    } else {
      addToLibBtn.textContent = 'ADD TO WATCHED';
    }

    if (queueIdsArr.includes(id)) {
      addToQueBtn.textContent = 'DELETE FROM QUEUE';
      return;
    } else {
      addToQueBtn.textContent = 'ADD TO QUEUE';
    }

    // Кнопка Library в модалке
    addToLibBtn.addEventListener('click', () => {
      if (!localStorage.getItem('User')) {
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

      localSaver.addToWatched(obj);
      addToLibBtn.textContent = 'DELETE FROM WATCHED';
    });

    // Кнопка Queue в модалке
    addToQueBtn.addEventListener('click', () => {
      if (!localStorage.getItem('User')) {
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

      localSaver.addToQueue(obj);
      addToQueBtn.textContent = 'DELETE FROM QUEUE';
    });
  });

  window.addEventListener('keydown', EscCloseModal);

  refs.modal.addEventListener('click', e => {
    if (e.target.dataset.action === 'close') {
      closeModal();
    }
  });

  refs.modal.addEventListener('click', backdropClick);

  function backdropClick(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }
}

export function EscCloseModal(e) {
  if (e.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', EscCloseModal);
  }
}

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
    inputButton: document.querySelector('.button__search'),
    list: document.querySelector('.list'),
    modal: document.querySelector('[data-modal]'),
    naviListMain: document.querySelector('.navi__list[data-action="main"]'),
    naviListLib: document.querySelector('.navi__list[data-action="library"]'),
    headerMain: document.querySelector('header[data-action="main"]'),
    headerLib: document.querySelector('header[data-action="library"]'),
    footerBtnModal: document.querySelector('.footer__team-button'),
    naviLogoButtonMain: document.querySelector('.button-logo[data-action="main"]'),
    naviLogoButtonLibrary: document.querySelector('.button-logo[data-action="library"]'),
}

const Uid = propFirebase;

refs.headerLib.style.display = "none";
refs.naviListMain.addEventListener('click', onNaviListClick) 
refs.naviListLib.addEventListener('click', onNaviListClick) 


refs.headerLib.style.display = 'none';

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
function getPopular() {
  apiService.getPopularFilms().then(films => {
    renderService.renderAllFilms(films);
    window.addEventListener('scroll', onScroll);
  });
}

// Функция поиска фильма в хедере
function findFilm() {
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
function getMembers() {
  refs.modal.classList.remove('hidden');
  renderService.renderMembers();
  const list = document.querySelector('.member-list');
}

function closeModal() {
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  refs.modal.classList.add('hidden');
  
  renderService.clearList();
}

function openModal(id) {
  refs.modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'
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
        overview: filmElem.querySelector('.about__description--text').innerText,
        path: filmElem.querySelector('.film-details__path').getAttribute('src'),
        popularity: filmElem.querySelector('.popularity').innerText,
      };

      addToLibrary(obj);
    });

    // Кнопка Queue в модалке
      addToQueBtn.addEventListener('click', () => {
              if (Uid.logIn !== true) {
        openAuthModal();
        return;
      }
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
  });
}

// Получение карточки фильма и открытие в модалке
const getDetails = e => {
  if (e.target.nodeName === 'IMG') {
    const { id } = e.target.parentNode;
    openModal(id);
  }
};


// Переключение стилей хедера
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

export { onNaviHomeClick };

window.addEventListener('load', getPopular);
refs.list.addEventListener('click', getDetails);
refs.input.addEventListener('input', debounce(findFilm, 1200));
refs.footerBtnModal.addEventListener('click', getMembers);
refs.naviListMain.addEventListener('click', onNaviListClick);
refs.naviListLib.addEventListener('click', onNaviListClick);
refs.naviLogoButtonMain.addEventListener('click', onNaviLogoButtonClick);
refs.naviLogoButtonLibrary.addEventListener('click', onNaviLogoButtonClick)

function onNaviLogoButtonClick (e) {
    e.preventDefault;
    refs.list.innerHTML ='';
    refs.input.value = ''; 
    apiService.resetPage()
    apiService.getPopularFilms().then(renderService.renderAllFilms)
     refs.headerMain.style.display = "block";
    refs.headerLib.style.display = "none";
}


import './sass/main.scss';
import './js/auth-modal.js';
import { debounce } from 'lodash';
import ApiService from './js/ApiService';
import RenderService from './js/RenderService';
import { propFirebase } from './js/Auth';
import './js/loader.js';
const apiService = new ApiService();
const renderService = new RenderService();
import './js/btn-up.js';
import { getPopular, findFilm, getMembers, getDetails, renderMyFilms } from './js/renderFunctions';

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
  watchedBtn: document.querySelector('.watched'),
};

const Uid = propFirebase;

refs.headerLib.style.display = 'none';
let itemTitle = '';
refs.naviListMain.addEventListener('click', onNaviListClick);
refs.naviListLib.addEventListener('click', onNaviListClick);

refs.headerLib.style.display = 'none';

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
refs.naviLogoButtonLibrary.addEventListener('click', onNaviLogoButtonClick);
refs.watchedBtn.addEventListener('click', renderMyFilms);

function onNaviLogoButtonClick(e) {
  e.preventDefault;
  refs.list.innerHTML = '';
  refs.input.value = '';
  apiService.resetPage();
  getPopular();
  refs.headerMain.style.display = 'block';
  refs.headerLib.style.display = 'none';
}

function onbtnThemeModeClick() {
  itemTitle = document.querySelectorAll('.item__title');

  if (refs.btnThemeMode.dataset.theme === 'dark') {
    refs.btnThemeMode.dataset.theme = 'light';
    refs.btnThemeMode.textContent = 'Daymode';
    document.body.style.backgroundColor = '#ffffff';
    for (const item of itemTitle) {
      item.style.color = 'black';
    }
    refs.btnBackToTop.style.backgroundColor = '#ffffff';
    refs.footer.style.backgroundColor = '#ffffff';
    refs.footer.style.color = 'black';
  } else if (refs.btnThemeMode.dataset.theme === 'light') {
    refs.btnThemeMode.dataset.theme = 'dark';
    refs.btnThemeMode.textContent = 'Nightmode';
    document.body.style.backgroundColor = '#1f2026';
    for (const item of itemTitle) {
      item.style.color = 'white';
    }
    refs.btnBackToTop.style.backgroundColor = '#1f2026';
    refs.footer.style.backgroundColor = '#1f2026';
    refs.footer.style.color = 'white';
  }
}

refs.btnThemeMode.addEventListener('click', onbtnThemeModeClick);

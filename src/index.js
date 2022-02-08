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
    body: document.querySelector('body'),
    

}

refs.headerLib.style.display = "none";
let itemTitle = '';
refs.naviListMain.addEventListener('click', onNaviListClick) 
refs.naviListLib.addEventListener('click', onNaviListClick)




function onNaviListClick(e) {
  if (e.target.textContent === 'Home') {
    refs.headerMain.style.display = 'block';
    refs.headerLib.style.display = 'none';
  }
  if (e.target.textContent === 'My library' && isOnlain.logIn === true) {
    refs.headerMain.style.display = 'none';
    refs.headerLib.style.display = 'block';
  }
}

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
      console.log(refs.btnThemeMode.dataset.theme)
      if (refs.btnThemeMode.dataset.theme === 'dark') { 
        itemTitle = document.querySelectorAll('.item__title')       
        for (const item of itemTitle) {
          item.style.color = 'white'      
          
        }
       /*  refs.itemTitle.style.color= 'pink' */
      
    }
    });
  }
 
  window.removeEventListener('scroll', debounce(onScroll, 1500));
}

function closeModal() {
  refs.modal.classList.add('hidden');
  renderService.clearList();
}

function writeUserData(object) {
  const db = getDatabase();
  set(ref(db, `${Uid.uid}`), {
    wathed: object,
  });
  // console.log(propFirebase.uid)
}

function writeUserData(queue) {
  const db = getDatabase();
  set(ref(db, `${Uid.uid}`), {
    queue: queue,
  });
}

function EscCloseModal(e) {
  if (e.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', EscCloseModal);
  }
}

const openModal = (id, object, queue) => {
  refs.modal.classList.remove('hidden');

  apiService.getFilmDetails(id).then(renderService.renderFilmDetails);

  window.addEventListener('keydown', EscCloseModal);

  refs.modal.addEventListener('click', e => {
    if (e.target.dataset.action === 'close') {
      closeModal();
    }

    if (e.target.dataset.action === 'addToLib') {
      if (Uid.uid !== true) {
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
      object = obj;

      writeUserData(object);
      console.log(Uid.uid);
    }

    if (e.target.dataset.action === 'addToQue') {
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
      queue = obj;

      writeUserData(queue);
      console.log(Uid);
    }
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
    refs.list.innerHTML ='';
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

window.addEventListener('load', getPopular);
refs.list.addEventListener('click', getDetails);
refs.input.addEventListener('input', findFilm); 
refs.inputButton.addEventListener('click', findFilm);

refs.footerBtnModal.addEventListener('click', getMembers);

function onNaviHomeClick() {
  refs.headerMain.style.display = 'none';
  refs.headerLib.style.display = 'block';
}

export { onNaviHomeClick };

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

function onbtnThemeModeClick () {
 
 itemTitle = document.querySelectorAll('.item__title')
 
  if (refs.btnThemeMode.dataset.theme === 'dark') {
      refs.btnThemeMode.dataset.theme = 'light';
      refs.btnThemeMode.textContent = 'Daymode';
      refs.body.style.backgroundColor = '#ffffff';
      for (const item of itemTitle) {
        item.style.color = 'black';        
      }
      refs.btnBackToTop.style.backgroundColor = '#ffffff'
      refs.footer.style.backgroundColor = '#ffffff'
      refs.footer.style.color = 'black'
     
     
  } else if (refs.btnThemeMode.dataset.theme === 'light') {
      refs.btnThemeMode.dataset.theme = 'dark';
      refs.btnThemeMode.textContent = 'Nightmode';
      refs.body.style.backgroundColor = '#1f2026';
      for (const item of itemTitle) {
        item.style.color = 'white'         
      }
      refs.btnBackToTop.style.backgroundColor = '#1f2026'
      refs.footer.style.backgroundColor = '#1f2026';
      refs.footer.style.color = 'white';
     
     
    
  }

}


refs.btnThemeMode.addEventListener('click', onbtnThemeModeClick);



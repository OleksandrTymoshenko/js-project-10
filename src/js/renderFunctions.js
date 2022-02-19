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
   
  if (localStorage.getItem('watched')) {
    const films = localSaver.getWatched();
  window.removeEventListener('scroll', onScroll);
  return renderService.renderFromLibrary(films);
  }
  // return refs.list.innerHTML = ''
  
}

export function renderMyQueue() {
  if (localStorage.getItem('Que')) {
    const filmsQue = localSaver.getQueue();
  window.removeEventListener('scroll', onScroll);
  const queue = filmsQue.reverse();
  renderService.renderFromLibrary(queue);
  }
  return;
  
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
  window.addEventListener('keydown', EscCloseModal);
  
 

  apiService.getFilmDetails(id).then(data => {
    renderService.renderFilmDetails(data);
    const addToWatchBtn = document.querySelector('[data-action="addToLib"]');
    const removeBtnWatch = document.querySelector('[data-action="removeToLib"]');
    const addToQueBtn = document.querySelector('[data-action="addToQue"]');
    const removeBtnQue = document.querySelector('[data-action="removeToQue"]');
    const filmElemDel = document.querySelector('.film-details');
    addToQueBtn.addEventListener('click', addToLibQue)
    removeBtnQue.addEventListener('click', removeWitcQue)
    function addToLibQue() {
      addToQue();
      addToQueBtn.classList.add('vis');
      removeBtnQue.classList.remove('vis')
      
      addToQueBtn.removeEventListener('click', addToQue)
      }
    
    const arrFromLocalQue = JSON.parse(localStorage.getItem('Que'))
    if (arrFromLocalQue) {
      arrFromLocalQue.map((data) => {
      if (data.id === id) {
        addToQueBtn.classList.add('vis');
      removeBtnQue.classList.remove('vis')
        return;
      }
      return data.id;
    })
    }
    const arrFromLocal = JSON.parse(localStorage.getItem('watched'))
    if (arrFromLocal) {
      arrFromLocal.map((data) => {
      if (data.id === id) {
        addToWatchBtn.classList.add('vis');
      removeBtnWatch.classList.remove('vis')
        return;
      }
      return data.id;
    })
    }
    
    removeBtnWatch.addEventListener('click', removeWitchWatched)
    addToWatchBtn.addEventListener('click', addToWatch);
    function addToWatch() {
      addToLib();
      removeBtnWatch.addEventListener('click', removeWitchWatched)
      addToWatchBtn.removeEventListener('click', addToWatch)
      addToWatchBtn.classList.add('vis');
      removeBtnWatch.classList.remove('vis')
      
  
    }

    function removeWitcQue() {
      // const filmElemDel = document.querySelector('.film-details');

      const objDelQue = {
        id: filmElemDel.id,
        title: filmElemDel.querySelector('.about__title').innerText,
        path: filmElemDel.querySelector('.film-details__path').getAttribute('src'),
        genres: filmElemDel.querySelector('.genres').innerText,
      };
      const arrWithLocalQue = JSON.parse(localStorage.getItem('Que'));
      const toLibQue = arrWithLocalQue.filter(value => value.id !== objDelQue.id)
      localStorage.setItem('Que', JSON.stringify(toLibQue))
      localSaver.removeQue(objDelQue)
      renderService.renderFromLibrary(toLibQue)
      removeBtnQue.removeEventListener('click', removeWitchWatched)
      addToQueBtn.addEventListener('click', addToLibQue);
      addToQueBtn.classList.remove('vis');
      removeBtnQue.classList.add('vis');
    }
    
    function removeWitchWatched(e) {
      // const filmElemDel = document.querySelector('.film-details');

      const objDel = {
        id: filmElemDel.id,
        title: filmElemDel.querySelector('.about__title').innerText,
        path: filmElemDel.querySelector('.film-details__path').getAttribute('src'),
        genres: filmElemDel.querySelector('.genres').innerText,
      };
      const arrWithLocal = JSON.parse(localStorage.getItem('watched'));
      const toLib = arrWithLocal.filter(value => value.id !== objDel.id)
      localStorage.setItem('watched', JSON.stringify(toLib))
      localSaver.removeWatched(objDel)
      renderService.renderFromLibrary(toLib)
      removeBtnWatch.removeEventListener('click', removeWitchWatched)
      addToWatchBtn.addEventListener('click', addToWatch);
      addToWatchBtn.classList.remove('vis');
      removeBtnWatch.classList.add('vis')
      
    }

    let idsArr = localSaver.getWatchedIds();
    if (!idsArr) {
      idsArr = [];
    }
    let queueIdsArr = localSaver.getQueueIds();
    if (!queueIdsArr) {
      queueIdsArr = [];
    }
    if (idsArr.includes(id)) {
      return;
    } else {
      addToWatchBtn.textContent = 'ADD TO WATCHED';
    }
  })



}

    function addToQue() {
      if (!localStorage.getItem('User')) {
        openAuthModal();

        return;
      }


      const filmElemQue = document.querySelector('.film-details');

      const obj = {
        id: filmElemQue.id,
        title: filmElemQue.querySelector('.about__title').innerText,
        path: filmElemQue.querySelector('.film-details__path').getAttribute('src'),
        genres: filmElemQue.querySelector('.genres').innerText,
      };

      const arrFromLocalQue = JSON.parse(localStorage.getItem('Que'))
      if (arrFromLocalQue === null) {
        localSaver.addToQueue(obj);
        return;
      }
      

      const findIdFilmQue = arrFromLocalQue.find(value => value.id === obj.id)

      if (findIdFilmQue !== undefined) {
        return;
      }

      localSaver.addToQueue(obj);
      
    }
    
    function addToLib() {
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

      const arrFromLocal = JSON.parse(localStorage.getItem('watched'))
      if (arrFromLocal === null) {
        localSaver.addToWatched(obj);
        return;
      }
      

      const findIdFilm = arrFromLocal.find(value => value.id === obj.id)

      if (findIdFilm !== undefined) {
        return;
      }

      localSaver.addToWatched(obj);
      
    }

//     // Кнопка Queue в модалке
//     // addToQueBtn.addEventListener('click', () => {
//       if (!localStorage.getItem('User')) {
//         openAuthModal();
//         return;
//       }

//       const filmElem = document.querySelector('.film-details');

//       const obj = {
//         id: filmElem.id,
//         title: filmElem.querySelector('.about__title').innerText,
//         path: filmElem.querySelector('.film-details__path').getAttribute('src'),
//         genres: filmElem.querySelector('.genres').innerText,
//       };

//       localSaver.addToQueue(obj);
//       addToQueBtn.textContent = 'DELETE FROM QUEUE';
//     });
//   });

  

  // refs.modal.addEventListener('click', e => {
  //   if (e.target.dataset.action === 'close') {
  //     closeModal();
  //   }
  // });

  refs.modal.addEventListener('click', backdropClick);

  function backdropClick(e) {
    if (e.currentTarget === e.target) {
      closeModal();
      return;
    }
    if (e.target.dataset.action === 'close') {
      closeModal();
      return;
    }
  }
// }

export function EscCloseModal(e) {
  if (e.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', EscCloseModal);
  }
}

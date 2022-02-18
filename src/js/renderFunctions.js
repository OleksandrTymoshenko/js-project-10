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
  addToQueBtn: document.querySelector('[data-action="addToQue"]'),
  removeBtnQue: document.querySelector('[data-action="removeToQue"]'),
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
    const addToWatchBtn = document.querySelector('[data-action="addToLib"]');
    const removeBtnWatch = document.querySelector('[data-action="removeToLib"]');
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
    
    function removeWitchWatched(e) {
      const filmElemDel = document.querySelector('.film-details');

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
      // console.log(toLib)
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
      
    
    

    // function removeWitchWatched(e) {
    //   const filmElemDel = document.querySelector('.film-details');

    //   const objDel = {
    //     id: filmElemDel.id,
    //     title: filmElemDel.querySelector('.about__title').innerText,
    //     path: filmElemDel.querySelector('.film-details__path').getAttribute('src'),
    //     genres: filmElemDel.querySelector('.genres').innerText,
    //   };
    //   const arrWithLocal = JSON.parse(localStorage.getItem('watched'));
    //   const toLib = arrWithLocal.filter(value => value.id !== objDel.id)
    //   localStorage.setItem('watched', JSON.stringify(toLib))
    //   // console.log(toLib)
    //   renderService.renderFromLibrary(toLib)
    // }

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

//   window.addEventListener('keydown', EscCloseModal);

//   refs.modal.addEventListener('click', e => {
//     if (e.target.dataset.action === 'close') {
//       closeModal();
//     }
//   });

//   refs.modal.addEventListener('click', backdropClick);

//   function backdropClick(e) {
//     if (e.currentTarget === e.target) {
//       closeModal();
//     }
//   }
// }

// export function EscCloseModal(e) {
//   if (e.code === 'Escape') {
//     closeModal();
//     window.removeEventListener('keydown', EscCloseModal);
//   }
// }

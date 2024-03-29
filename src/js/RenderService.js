const list = document.querySelector('.list');
const modal = document.querySelector('[data-modal]');
const btnThemeMode = document.querySelector('.theme__switcher');

import { getGenres } from './genresInfo';
import { memberInfo } from './memberInfo';
import noPoster from '../partials/img/no_poster.jpg';
import { refs } from './auth-modal';

export default class RenderService {
  constructor() {}

  renderFromLibrary(filmsArr) {
// console.log(filmsArr)
    list.innerHTML = '';
      const markup = filmsArr
      .map(({ id, title, path, genres }) => {
        return `
                    <li class="list__item" id=${id}>
                        
                        <img class="item__img" src=${path} alt="poster" width="396"> 
                        <div class = "box__title">
                        <p class="item__title">${title}</p>
                        <p class="item__genre">${genres}</p>
                        </div>
                    </li>
                `;
      })
      .join('');

     list.insertAdjacentHTML( 'beforeend', markup);
    
    return;
    
    
  }

  renderFinders(filmArray) {
    list.innerHTML = '';
    const markup = filmArray
      .map(({ id, title, poster_path, genre_ids, release_date }) => {
        const imagePath =
          poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`;
        const upperTitle = title.toUpperCase();
        const generesFilmArray = getGenres(genre_ids);
        const date = release_date.slice(0, 4);

        return `
                    <li class="list__item" id=${id}>
                        
                        <img class="item__img" src=${imagePath} alt="poster" width="396"> 
                         <div class = "box__title">
                        <p class="item__title">${upperTitle}</p>
                        <p class="item__genre">${generesFilmArray} | ${date}</p>
                        </div>
                    </li>
                `;
      })
      .join('');

    list.insertAdjacentHTML('afterbegin', markup);
  }

  renderAllFilms(filmArray) {
    const markup = filmArray
      .map(({ id, title, poster_path, genre_ids, release_date }) => {
        const imagePath =
          poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`;
        const upperTitle = title.toUpperCase();
        const generesFilmArray = getGenres(genre_ids);
        const date = release_date.slice(0, 4);

        return `
                    <li class="list__item" id=${id}>
                        
                        <img class="item__img" src=${imagePath} alt="poster" width="396"> 
                        <div class = "box__title">
                        <p class="item__title">${upperTitle}</p>
                        <p class="item__genre">${generesFilmArray} | ${date}</p>
                        </div>
                    </li>
                `;
      })
      .join('');

    list.insertAdjacentHTML('beforeend', markup);
  }

  renderFilmDetails(film) {
    modal.innerHTML = '';
    const { id, poster_path, title, popularity, genres, overview, vote_average, vote_count } = film;
    const imagePath =
      poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const upperTitle = title.toUpperCase();
    const genresFilm = genres.map(genre => genre.name).join(', ');

    const markup = `
            <div class="film-details" id=${id}>

                <div class="img-thumb" id=${id}>
                    <img class="film-details__path" src=${imagePath} alt="poster" width="500">
                </div>

                <div class="about">
                    <p class="about__title">${upperTitle}</p>

                    <div class="details">
                        <div class="details__names-col">
                            <p class="details__value">Vote / Votes<p>
                            <p class="details__value">Popularity<p>
                            <p class="details__value">Original Title<p>
                            <p class="details__value">Genre<p>
                        </div>
                        
                        <div class="values-col">
                            <p class="details__name"><span class="vote">${vote_average}</span> / ${vote_count}<p>
                            <p class="details__name popularity">${popularity}<p>
                            <p class="details__name">${upperTitle}<p>
                            <p class="details__name genres">${genresFilm}<p>
                        </div>
                    </div>

                    <div class="about__description">
                        <p class="about__description--title" >ABOUT</p>

                        <p class="about__description--text">${overview}</p>
                    </div>

                    <div class="btn-block">
                        <button class="about__btn lib" data-action="addToLib">add to watched</button>
                        <button class="about__btn lib vis" data-action="removeToLib">remove from watched</button>
                        <button class="about__btn queue" data-action="addToQue">add to queue</button>
                        <button class="about__btn queue vis" data-action="removeToQue">remove from queue</button>
                    </div>

                </div>

            <button class="close-btn" data-action="close"></button>
                
            </div>
        `;

    modal.insertAdjacentHTML('afterbegin', markup);

    backGroundColorForDarkMode();
  }

  renderMembers() {
    modal.classList.remove('modal');
    modal.classList.add('footer__modal');

    const wrapper = document.createElement('div');
    wrapper.classList.add('footer__modal-wrapper');
    // modal.innerHTML = ''
    const memberList = document.createElement('ul');
    memberList.classList.add('member-list');
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    wrapper.appendChild(memberList);
    modal.appendChild(wrapper);
    wrapper.appendChild(closeBtn);

    const markup = memberInfo
      .map(({ id, photo, name, role, linkedIn, gitHub, telegram }) => {
        return `<li class="member-item" id="${id}">
            <div class="member-card ${id}">
                <a href="${gitHub}" target="_blank">
                    <div class="member-photo">
                        <img class="photo" src="${photo}" width="250" height="250" alt="team member">
                    </div>
                </a>
                <div class="member-description">
                    <p class="member-name">${name}</p>
                    <p class="member-role">${role}</p>
                    <div class="member-socials">
                        <ul class="socials-list">
                            <li class="socials-item">
                                <a href="${linkedIn}" class="socials-linkedin" target="_blank">
                                    <img class="socials-linkedin-icon" src="https://raw.githubusercontent.com/OleksandrTymoshenko/js-project-10/92637c9267bf8d29fbf67853c521c5735d687cbb/src/partials/img/linkedin.svg" width=30 height=30>
                                </a>
                            </li>
                            <li class="socials-item">
                                <a href="${gitHub}" class="socials-github" target="_blank">
                                    <img class="socials-github-icon" src="https://raw.githubusercontent.com/OleksandrTymoshenko/js-project-10/92637c9267bf8d29fbf67853c521c5735d687cbb/src/partials/img/github.svg" width=30 height=30>
                                </a>
                            </li>
                            <li class="socials-item">
                                <a href="${telegram}" class="socials-telegram" target="_blank">
                                    <img class="socials-telegram-icon" src="https://raw.githubusercontent.com/OleksandrTymoshenko/js-project-10/92637c9267bf8d29fbf67853c521c5735d687cbb/src/partials/img/telegram.svg" width=30 height=30>
                                </a>
                            </li>
                        </ul>
                    </div> 
                </div>         
            </div>
        </li>        
            `;
      })
      .join('');

    const btn = document.querySelector('.close-btn');
    btn.addEventListener('click', () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';

      modal.classList.add('hidden');
      modal.classList.remove('footer__modal');
      modal.classList.add('modal');
      modal.innerHTML = '';
    });

    memberList.insertAdjacentHTML('afterbegin', markup);
    // цвет модалки. не удалять!!!!
    backGroundColorForDarkModeFooter();
  }
  clearList() {
    modal.innerHTML = '';
  }

  clearGalleryList() {
    list.innerHTML = '';
  }
}

// цвет модалки. не удалять!!!!
function backGroundColorForDarkMode() {
  const filmDetailsCase = document.querySelector('.film-details');

  if (btnThemeMode.dataset.theme === 'dark') {
    filmDetailsCase.style.backgroundColor = '#1f2026';
  } else if (btnThemeMode.dataset.theme === 'light') {
    filmDetailsCase.style.backgroundColor = '#ffffff';
  }
}

function backGroundColorForDarkModeFooter() {
  const footerModalCase = document.querySelector('.footer__modal-wrapper');
  if (btnThemeMode.dataset.theme === 'dark') {
    footerModalCase.style.backgroundColor = '#1f2026';
  } else if (btnThemeMode.dataset.theme === 'light') {
    footerModalCase.style.backgroundColor = '#ffffff';
  }
}

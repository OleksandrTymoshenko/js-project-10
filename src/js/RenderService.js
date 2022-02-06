const list = document.querySelector('.list')
const modal = document.querySelector('[data-modal]')

import { getGenres } from './genresInfo'
import { memberInfo } from './memberInfo'
import noPoster from '../partials/img/no_poster.jpg'
import { refs } from './auth-modal'

export default class RenderService {
    constructor() {
    
    }

    renderAllFilms(filmArray) {
        const markup = filmArray.map(({id, title, poster_path, genre_ids, release_date}) => {
           
            const imagePath = poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`
            const upperTitle = title.toUpperCase();
            const generesFilmArray = getGenres(genre_ids)
            const date = release_date.slice(0, 4)

            return `
                    <li class="list__item" id=${id}>
                        
                        <img class="item__img" src=${imagePath} alt="poster" width="396"> 
        
                        <p class="item__title">${upperTitle}</p>
                        <p class="item__genre">${generesFilmArray} | ${date}</p>
                    </li>
                `
        }).join('')

        list.insertAdjacentHTML('afterbegin', markup)
    }

    renderFilmDetails(film) {
        modal.innerHTML = ''
        const {id, poster_path, title, popularity, genres, overview, vote_average, vote_count} = film
        const imagePath = poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`
        const upperTitle = title.toUpperCase()
        const genresFilm = genres.map(genre => genre.name).join(', ')       

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
                            <p class="details__name">${genresFilm}<p>
                        </div>
                    </div>

                    <div class="about__description">
                        <p class="about__description--title" >ABOUT</p>

                        <p class="about__description--text">${overview}</p>
                    </div>

                    <div class="btn-block">
                        <button class="about__btn lib" data-action="addToLib">add to watched</button>
                        <button class="about__btn queue" data-action="addToQue">add to queue</button>
                    </div>

                </div>

            <button class="close-btn" data-action="close"></button>
                
            </div>
        `

        modal.insertAdjacentHTML('afterbegin', markup)
    }

    renderMembers() {

        modal.classList.remove('modal')
        modal.classList.add('footer__modal')

        const wrapper = document.createElement('div')
        wrapper.classList.add('footer__modal-wrapper')    
        // modal.innerHTML = ''
        const memberList = document.createElement('ul')
        memberList.classList.add('member-list')
        const closeBtn = document.createElement('button')
        closeBtn.classList.add('close-btn')
        wrapper.appendChild(memberList)
        modal.appendChild(wrapper)
        wrapper.appendChild(closeBtn)
        
        const markup = memberInfo.map(({ id, photo, name, role, linkedIn, gitHub, telegram }) => {
            return  `<li class="member-item" id="${id}">
            <div class="member-card">
                <a href="${gitHub}" target="_blank">
                    <div class="member-photo">
                        <img class="photo" src="${photo}" width="250" height="250" alt="team member">
                    </div>
                </a>
                <div class="member-description">
                    <p class="member-name">${name}</p>
                    <p class="member-role">${role}</p>
                </div>
                <div class="member-socials">
                    <ul class="socials-list">
                        <li class="socials-item">
                            <a href="${linkedIn}" class="socials-linkedin" target="_blank">LinkedIn</a>
                        </li>
                        <li class="socials-item">
                            <a href="${gitHub}" class="socials-github" target="_blank"> GitHub</a>
                        </li>
                        <li class="socials-item">
                            <a href="${telegram}" class="socials-telegram" target="_blank">Telegram</a>
                        </li>
                    </ul>
                </div>          
            </div>
        </li>        
            `
            }).join("");

            const btn = document.querySelector('.close-btn')
            btn.addEventListener('click', () => {
                modal.classList.add('hidden')
                modal.classList.remove('footer__modal')
                modal.classList.add('modal')
                modal.innerHTML = ''
            })

            memberList.insertAdjacentHTML('afterbegin', markup)
    }
    clearList() {
        modal.innerHTML = ""
    }
}
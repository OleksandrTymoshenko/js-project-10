const list = document.querySelector('.list')
const modal = document.querySelector('[data-modal]')

import { memberInfo } from './memberInfo'


import noPoster from '../partials/img/no_poster.jpg'

const generes = [
    {id: 28, name: "Action"},
{id: 12, name: "Adventure"},
{id: 16, name: "Animation"},
{id: 35, name: "Comedy"},
{id: 80, name: "Crime"},
{id: 99, name: "Documentary"},
{id: 18, name: "Drama"},
{id: 10751, name: "Family"},
{id: 14, name: "Fantasy"},
{id: 36, name: "History"},
{id: 27, name: "Horror"},
{id: 10402, name: "Music"},
{id: 9648, name: "Mystery"},
{id: 10749, name: "Romance"},
{id: 878, name: "Science Fiction"},
{id: 10770, name: "TV Movie"},
{id: 53, name: "Thriller"},
{id: 10752, name: "War"},
{id: 37, name: "Western"},
]


function generesForRender (a) {
    let generesArray = [];
    a.map((element) => generesArray.push(generes.find(gener => gener.id === element).name))
    return generesArray.splice(0, 2).join(", ")
}

export default class RenderService {
    constructor() {
       
    }

    renderAllFilms(filmArray) {
        const markup = filmArray.map(({id, title, poster_path, genre_ids}) => {
           
            const imagePath = poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`
            
            const upperTitle = title.toUpperCase();
            const generesFilmArray = generesForRender(genre_ids);

            return `
                    <li class="list__item" id=${id}>
                        
                        <img class="item__img" src=${imagePath} alt="poster" width="396"> 
        
                        <p class="item__title">${upperTitle}</p>
                        <p class="item__genre">${generesFilmArray} | 2020</p>
                    </li>
                `
        }).join('')

        list.insertAdjacentHTML('afterbegin', markup)
    }

    renderFilmDetails(film) {
        modal.innerHTML = ''
        const {id, poster_path, title, popularity, genres, overview, vote_average, vote_count, genre_ids} = film
        const imagePath = poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`
        const upperTitle = title.toUpperCase()
        
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
                            <p class="details__name">Action<p>
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
        
        modal.innerHTML = ''
        const memberList = document.createElement('ul')
        memberList.classList.add('member-list')
        modal.appendChild(memberList)
        
        const markup = memberInfo.map(({ id, photo, name, role, linkedIn, gitHub, telegram }) => {
            return  `<li class="member-item" id="${id}">
            <div class="member-card">
                        <div class="member-photo">
                            <img class="photo" src="${photo}" width="292" height="292" alt="team member">
                        </div>
                        <div class="member-description">
                            <p class="member-name">${name}</p>
                            <p class="member-role">${role}</p>
                        </div>
                        <div class="member-socials">
                            <ul class="socials-list">
                                <li class="socials-item">
                                    <a href="${linkedIn}">LinkedIn</a>
                                </li>
                                <li class="socials-item">
                                    <a href="${gitHub}"> GitHub</a>
                                </li>
                                <li class="socials-item">
                                    <a href="${telegram}">Telegram</a>
                                </li>
                            </ul>
                        </div>          
                    </div>
                </li>        
            `
            }).join("");

            memberList.insertAdjacentHTML('afterbegin', markup)
    }



}
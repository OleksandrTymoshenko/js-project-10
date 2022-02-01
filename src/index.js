import './sass/main.scss';
import './js/auth-modal.js';
import {debounce, throttle } from 'lodash'
import ApiService from './js/ApiService';
import RenderService from './js/RenderService';
import Auth from './js/Auth'

import footerModal from './js/footerModal';
 

const apiService = new ApiService()
const renderService = new RenderService()

import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('.input'),
    list: document.querySelector('.list'),
    modal: document.querySelector('[data-modal]'),
    naviListMain: document.querySelector('.navi__list[data-action="main"]'),
    naviListLib: document.querySelector('.navi__list[data-action="library"]'),
    headerMain: document.querySelector('header[data-action="main"]'),
    headerLib: document.querySelector('header[data-action="library"]'),
    footerBtnModal: document.querySelector('.footer__team-button')    
}

refs.headerLib.style.display = "none";

function onNaviListClick(e) {
    if(e.target.textContent === 'Home'){
        refs.headerMain.style.display = "block";
        refs.headerLib.style.display = "none";
    }
    if(e.target.textContent === 'My library'){
        refs.headerMain.style.display = "none";
        refs.headerLib.style.display = "block";
    }
}

refs.naviListMain.addEventListener('click', onNaviListClick) 
refs.naviListLib.addEventListener('click', onNaviListClick) 

const getPopular = () => {
    apiService.getPopularFilms().then(renderService.renderAllFilms)
}

const closeModal = () => {
    refs.modal.classList.add('hidden')  
}

const openModal = (id) => {
    
    refs.modal.classList.remove('hidden')

    apiService.getFilmDetails(id).then(renderService.renderFilmDetails)

    refs.modal.addEventListener('click', e => {
        if (e.target.dataset.action === 'close') {
            closeModal()
        }

        if (e.target.dataset.action === 'addToLib') {
           const filmElem = document.querySelector('.film-details')
           
            const obj = {
                id: filmElem.id,
                title: filmElem.querySelector('.about__title').innerText,
                overview: filmElem.querySelector('.about__description--text').innerText,
                path: filmElem.querySelector('.film-details__path').getAttribute('src'),
                popularity: filmElem.querySelector('.popularity').innerText,
            }
           

           localStorageService.addToLibrary(obj)
        }
   })
}  

const getDetails = (e) => {

    if (e.target.nodeName === 'IMG') {
            const { id } = e.target.parentNode
            openModal(id)
        }
}

const findFilm = debounce(() => {
    apiService.query = refs.input.value.trim()
    
    if (apiService.query.length >= 2) {
        apiService.getFilmsByName().then(filmsArr => {
            if (filmsArr.length === 0) {
               return Notiflix.Notify.warning('Search result not successful. Enter the correct movie name')
            }

            renderService.renderAllFilms(filmsArr)
        })
    }
    
}, 500)

function getMembers () {
    refs.modal.classList.remove('hidden')
    renderService.renderMembers()
    const list = document.querySelector('.member-list')
    list.addEventListener('click', closeModal)
}

window.addEventListener('load', getPopular)
refs.list.addEventListener('click', getDetails)
refs.input.addEventListener('input',  findFilm)
refs.footerBtnModal.addEventListener('click', getMembers)

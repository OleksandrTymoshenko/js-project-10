import './sass/main.scss';
import ApiService from './js/ApiService';
import RenderService from './js/RenderService';
import LocalStorageService from './js/LocalStorageService';

const apiService = new ApiService()
const renderService = new RenderService()
const localStorageService = new LocalStorageService()

const refs = {
    input: document.querySelector('.search-block__input'),
    list: document.querySelector('.list'),
    modal: document.querySelector('[data-modal]'),
    naviListMain: document.querySelector('.navi__list[data-action="main"]'),
    naviListLib: document.querySelector('.navi__list[data-action="library"]'),
    headerMain: document.querySelector('header[data-action="main"]'),
    headerLib: document.querySelector('header[data-action="library"]'),
    
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

        if (e.target.dataset.action === 'saveToLibrary') {
           const filmElem = e.target.parentNode
           
            const obj = {
                id: filmElem.id,
                title: filmElem.querySelector('.title').textContent,
                overview: filmElem.querySelector('.overview').textContent,
                path: filmElem.querySelector('.path').getAttribute('src')
            }
           

           localStorageService.setFilm(obj)
        }
   })
}  


const getDetails = (e) => {

    if (e.target.nodeName === 'IMG') {
            const { id } = e.target.parentNode
            openModal(id)
        }
    }

window.addEventListener('load', getPopular)
refs.list.addEventListener('click', getDetails)
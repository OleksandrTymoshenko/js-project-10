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
}

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

window.addEventListener('load', getPopular)
refs.list.addEventListener('click', getDetails)
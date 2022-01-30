const list = document.querySelector('.list')
const modal = document.querySelector('[data-modal]')
const library = document.querySelector('[data-lib]')

export default class RenderService {
    constructor() {

    }

    renderAllFilms(filmArray) {
        const markup = filmArray.map(({id, title, poster_path}) => {

            const imagePath = `https://image.tmdb.org/t/p/w500/${poster_path}`
            const upperTitle = title.toUpperCase()

            return `
                    <li class="list__item" id=${id}>      
                        <img class="item__img" src=${imagePath} alt="poster"> 
                        
                        <p class="item__title">${upperTitle}</p>
                        <p class="item__genre">Drama, Action | 2020</p>
                    </li>
                `
        }).join('')

        list.insertAdjacentHTML('afterbegin', markup)
    }

    renderFilmDetails(film) {
        modal.innerHTML = ''

        const {id, poster_path, title, popularity, genres, overview} = film
        const imagePath = `https://image.tmdb.org/t/p/w400/${poster_path}`
        const upperTitle = title.toUpperCase()
        
        const markup = `
            <div class="film-details">

                <div class="img-thumb" id=${id}>
                    <img src=${imagePath} alt="poster" width="396">
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
                            <p class="details__name">7.3 / 1260<p>
                            <p class="details__name">${popularity}<p>
                            <p class="details__name">${upperTitle}<p>
                            <p class="details__name">Western<p>
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

                <button class="close-btn" data-action="close">x</button>

                
            
            </div>
        `

        modal.insertAdjacentHTML('afterbegin', markup)
    }

}
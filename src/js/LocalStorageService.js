export default class LocalStorageService {
    constructor() {
      this.filmArray = []
    }

    addToLibrary(obj) {
        const data = localStorage.getItem('myFilms')
        const filmArray = JSON.parse(data)

        if (filmArray) {
            filmArray.forEach(film => {
                console.log(film.id)
            })
        }

        // this.filmsArr = [...this.filmsArr, JSON.stringify(film)]
        // localStorage.setItem('myArr', this.filmsArr)
    }

    getAllFilms() {
        const data = localStorage.getItem('myFilms')
        const parsedData = JSON.parse(data)
        return parsedData
    }

    


}
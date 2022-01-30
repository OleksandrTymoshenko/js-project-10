export default class LocalStorageService {
    constructor() {
      this.filmsArray = []
    }

    addToLibrary(obj) {
        const data = localStorage.getItem('myFilms')
        const filmArray = JSON.parse(data)

        if (filmArray) {
            filmArray.forEach(film => {
                console.log(film.id)
            })
        }

        // this.filmsArray = [...this.filmsArr, JSON.stringify(film)]
        // localStorage.setItem('myArr', this.filmsArray)
    }

    getAllFilms() {
        const data = localStorage.getItem('myFilms')
        const parsedData = JSON.parse(data)
        return parsedData
    }

    


}
export default class LocalStorageService {
    constructor() {
      this.filmsArray = []
    }

    addToLibrary(obj) {
        // const data = localStorage.getItem('myFilms')
        // const filmArray = JSON.parse(data)

        // if (filmArray) {
        //     filmArray.forEach(film => {
        //         console.log(film.id)
        //     })
        // }

        this.filmsArray.push(obj)
        const stringified = JSON.stringify(this.filmsArray)
        localStorage.setItem('myArr', stringified)
    }

    getAllFilms() {
        const data = localStorage.getItem('myArr')
        const parsedData = JSON.parse(data)
        return parsedData
    }

    


}
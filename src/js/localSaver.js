export default class LocalSaver {
  constructor() {
    this.watched = JSON.parse(localStorage.getItem('watched')) ? JSON.parse(localStorage.getItem('watched')) : [];
    this.queue = JSON.parse(localStorage.getItem('Que')) ? JSON.parse(localStorage.getItem('Que')) : [];
  }

  get watchedArr() {
    return this.watched;
  }

  setWatchedArr(newArr) {
    this.watched.push(newArr);
  }

  get queueArr() {
    return this.queue;
  }

  setQueueArr(newArr) {
    this.queue.push(newArr);
  }

  addToWatched(obj) {
    this.setWatchedArr(obj)
    localStorage.setItem('watched', JSON.stringify(this.watched));
  }

  removeWatched(obj) {
    const newArr = this.watched.filter(value => value.id !== obj.id)
    this.watched = newArr;
  }

  addToQueue(obj) {
    this.setQueueArr(obj);
    localStorage.setItem('Que', JSON.stringify(this.queue));
  }

  removeQue(obj) {
    const newArrQue = this.queue.filter(value => value.id !== obj.id)
    this.queue = newArrQue;
  }

  getWatched() {
    let data = localStorage.getItem('watched');
    let parsedData = JSON.parse(data);
    return parsedData;
  }

  getQueue() {
    let data = localStorage.getItem('Que');
    let parsedData = JSON.parse(data);
    return parsedData;
  }

  getWatchedIds() {
    let idsArr = [];
    let data = localStorage.getItem('watched');
    let parsedData = JSON.parse(data);
    if (!parsedData) {
      return;
    }

    parsedData.map(film => {
      idsArr.push(film.id);
    });

    return idsArr;
  }

  getQueueIds() {
    let idsArr = [];
    let data = localStorage.getItem('queue');
    let parsedData = JSON.parse(data);
    if (!parsedData) {
      return;
    }

    parsedData.map(film => {
      idsArr.push(film.id);
    });

    return idsArr;
  }
}

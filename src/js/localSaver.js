export default class LocalSaver {
  constructor() {
    this.watched = [];
    this.queue = [];
  }

  get watchedArr() {
    return this.watched;
  }

  set watchedArr(newArr) {
    this.watched = newArr;
  }

  get queueArr() {
    return this.queue;
  }

  set queueArr(newArr) {
    this.queue = newArr;
  }

  addToWatched(obj) {
    this.watched.push(obj);
    localStorage.setItem('watched', JSON.stringify(this.watched));
  }

  addToQueue(obj) {
    this.queue.push(obj);
    localStorage.setItem('queue', JSON.stringify(this.queue));
  }

  getWatched() {
    let data = localStorage.getItem('watched');
    let parsedData = JSON.parse(data);
    return parsedData;
  }

  getQueue() {
    let data = localStorage.getItem('queue');
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

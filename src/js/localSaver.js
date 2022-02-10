// export function addToWatched(obj) {
//   const data = localStorage.getItem('watched');
//   let watchedArr = JSON.parse(data);
//   if (!data) {
//     watchedArr = [];
//   }

//   watchedArr.push(obj);
//   localStorage.setItem('watched', JSON.stringify(watchedArr));
// }

// export function addToQueue(obj) {
//   const data = localStorage.getItem('queue');
//   let queueArr = JSON.parse(data);
//   if (!data) {
//     queueArr = [];
//   }

//   queueArr.push(obj);
//   localStorage.setItem('queue', JSON.stringify(queueArr));
// }

// export function getWatched() {
//   const data = localStorage.getItem('watched');
//   const parsedData = JSON.parse(data);
//   return parsedData;
// }

// export function getQueue() {
//   const data = localStorage.getItem('queue');
//   const parsedData = JSON.parse(data);
//   return parsedData;
// }

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
    let watchedIds = this.getWatchedIds() ?? [];
    if (watchedIds.includes(obj.id)) {
      return;
    }

    this.watched.push(obj);
    localStorage.setItem('watched', JSON.stringify(this.watched));
  }

  addToQueue(obj) {
    let queuedIds = this.getQueueIds() ?? [];
    if (queuedIds.includes(obj.id)) {
      return;
    }

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

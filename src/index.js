import './sass/main.scss';
import './js/auth-modal.js';
import { debounce, throttle } from 'lodash';
import ApiService from './js/ApiService';
import RenderService from './js/RenderService';
import Auth from './js/Auth';
import { propFirebase } from './js/Auth';
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved,push,set,get,child,onValue,remove,upadate} from "firebase/database";
import footerModal from './js/footerModal';
 const apiService = new ApiService()
// const propFirebase = new FirebaseClass;
const renderService = new RenderService()
const Uid = propFirebase
import Notiflix from 'notiflix';
const qwe = [];
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
refs.naviListMain.addEventListener('click', onNaviListClick) 
refs.naviListLib.addEventListener('click', onNaviListClick) 

function onNaviListClick(e) {
    if (e.target.textContent === 'Home') {
        refs.headerMain.style.display = "block";
        refs.headerLib.style.display = "none";
    }
    if (e.target.textContent === 'My library' && Uid.logIn === true) {
        refs.headerMain.style.display = "none";
        refs.headerLib.style.display = "block";
    }
}

const getPopular = () => {
    apiService.getPopularFilms().then(renderService.renderAllFilms)
}

const closeModal = () => {
    refs.modal.classList.add('hidden')  
}

async function writeUserWatched(object) {
    const db = getDatabase();
    let mit = []
    const commentsRef = ref(db, 'watched/' +Uid.uid);
    const newPostRef = push(commentsRef);
   
    onValue(newPostRef, (snapshot) => {
        const data = snapshot.val();
        
     //   console.log(Object.values(data))
        if (data === null ){
            set(newPostRef,object)
            return;
        }
        mit.push(data)
        // console.log(data)
        // console.log(mit)
        // console.log(Uid.uid)
        console.log(mit)
        const pip = mit.map(({id} ) => {
            console.log(id)
            if (id === object.id ) {
                Notiflix.Notify.info("Ты дурак")
                return;
                
            }
            else{
            set(newPostRef, object)
            }
        })
        console.log(pip)
      });
    
    
    
    }// const vbn = []
    // const dataBasa = getDatabase();
    // const starCountRef = ref(db, 'watched/' + Uid.Uid);
    // // const newPostRef = push(starCountRef);
    // onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     if (data === null) {
    //         set(starCountRef, object)
    //         console.log(starCountRef._path.pieces_)
    //         return;
    //     }
        // else if (Object.keys(data)[0].id === newPostRef._path.pieces_[2]) {
        //    return Notiflix.Notify.info('Вы уже добавляли этот фильм')
        // }
        // else { 
        //     const newPostRef = push(commentsRef);
        //     set(newPostRef,object)
        // }
//     })
// }
    // set(starCountRef, object);
//   const dfg =  onChildAdded(starCountRef, (data) => {
//         addCommentElement(postElement, data.key, data.val().text, data.val().author);
//     //   console.log(data)
// });
// onChildChanged(starCountRef, (data) => {
//     setCommentValues(postElement, data.key, data.val().text, data.val().author);
//   console.log(data)
// });
// onChildRemoved(starCountRef, (data) => {
//     deleteComment(postElement, data.key);
//     console.log(data)
// });
//     console.log(dfg)
    // console.log(vbn)
    // onValue(starCountRef, (snapshot) => {
    // const data = snapshot.val();
    //     console.log(data.val())
    //     set(starCountRef,object)
        // console.log(Object.keys(data)[0])
        // console.log(newPostRef._path.pieces_[2])
//         if (data === null || Object.keys(data)[0] !== newPostRef._path.pieces_[2]) { 
//             set(newPostRef, object);
//             console.log("Ya loh")
//         }
//    else     {
//        //     console.log("Ya ebal eto v 6 ytra delat")
//             remove(newPostRef, object);
//             console.log("Ti loh")
//         }
        //   })
//    console.log(newPostRef._path.pieces_[2])
    // onChildAdded(commentsRef, (data) => {
    //     console.log(data)
    //     addCommentElement(object, data.key, data.val().text, data.val().author);
    // });
    // );
// onChildChanged(commentsRef, (data) => {
//   setCommentValues(postElement, data.object, data.val().object.title, data.val().object.overview,data.val().object.path,data.val().object.popularity);
// });
// onChildRemoved(commentsRef, (data) => {
//   deleteComment(postElement, data.object);
// });
//   push(ref(db, ${Uid.Uid}), {
//       watched: object
//   });
//     set(ref(db, ${object.id}), {
//       watched: object,
//   });
// function writeNewPost(Uid,object) {
//   const db = getDatabase();
//   // A post entry.
//   const postData = {
//     uid: Uid.Uid,
//     watched: object,
//   };
//   // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), 'posts')).key;
//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + Uid + '/' + newPostKey] = postData;
//   return update(ref(db), updates);
// }
// function writeUserData(queue) {
//   const db = getDatabase();
//   set(ref(db,  ${Uid.uid}), {
//       queue: queue,
//   });
// }
// function writeUserQueue(fgh) {
//     const db = getDatabase();
//     const commentsRef = ref(db, 'queue/'+Uid.Uid);
//     const newPostRef = push(commentsRef);
//     // console.log(newPostRef)
//     set(newPostRef, fgh);
// }

// function read(object) { 

// }
const openModal = (id,object,fgh) => {
    
    refs.modal.classList.remove('hidden')

    apiService.getFilmDetails(id).then(renderService.renderFilmDetails)

    refs.modal.addEventListener('click', e => {
        if (e.target.dataset.action === 'close') {
            closeModal()
            return;
        }
        if (e.target.dataset.action === 'addToLib') {
            const filmElem = document.querySelector('.film-details')
           
            const obj = {
                id: filmElem.id,
                overview: filmElem.querySelector('.about__description--text').innerText,
                path: filmElem.querySelector('.film-details__path').getAttribute('src'),
                popularity: filmElem.querySelector('.popularity').innerText,
                title: filmElem.querySelector('.about__title').innerText,
                
                
            }
            object = obj;
            writeUserWatched(object)

        }
        // console.log(e)

            // qwe.push(obj)
            // console.log(obj.id.includes(id))
            // let asd = qwe.map(({ id }) => { 
            //     if (obj.id.includes(id)) {
            //     return console.log("ты лох")

            //     }
            //     else { 
            //   return  qwe.push(obj)

            //     }
            //     })
            
            
            // console.log(asd)
            // if () {
            //     return
            // }
            // else {
            
    // if (data === null) {
    //     writeUserWatched(object)
    //     // console.log(Object.keys(data))
    //     console.log(object)
    //     return;
    // }
    // // console.log(Object.values(data)[0].id)
    // // console.log(object)
    // else if (Object.values(data)[0].id === object.id) {
    //     console.log(Object.keys(data))
    //     console.log(object)
    //     return;
    // }
    // else { 
    //     console.log(Object.keys(data))
    //     console.log(object)
    //     writeUserWatched(object)
    // }
    // });
            // }
            // writeNewPost(Uid,object)
        // }
     })
       refs.modal.addEventListener('click', e => {
        if (e.target.dataset.action === 'close') {
            closeModal()
        }

        if (e.target.dataset.action === 'addToQue') {
           const filmElem = document.querySelector('.film-details')
           
            const obj = {
                id: filmElem.id,
                title: filmElem.querySelector('.about__title').innerText,
                overview: filmElem.querySelector('.about__description--text').innerText,
                path: filmElem.querySelector('.film-details__path').getAttribute('src'),
                popularity: filmElem.querySelector('.popularity').innerText,
            }
            fgh = obj;
            
            writeUserQueue(fgh)
            read(object)

            // console.log(Uid)
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


function onNaviHomeClick() {
        refs.headerMain.style.display = "none";
    refs.headerLib.style.display = "block";
    
}

export { onNaviHomeClick };
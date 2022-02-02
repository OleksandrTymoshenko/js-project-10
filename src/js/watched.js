import { initializeApp } from "firebase/app";
import FirebaseClass from "./firebaseApi";
import { getDatabase, ref, set } from "firebase/database";
import RenderService from "./RenderService";
const propFirebase = new FirebaseClass;
const watchedRender = new RenderService
// const wathedButton = document.querySelector('.btn-block')
// const queueButton = document.querySelector('.lib[data-action="addToQue"]')
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    
  });
}

function writeFromBack() {
    console.log(watchedRender.renderFilmDetails.film)
}





// wathedButton.addEventListener('click',writeFromBack)
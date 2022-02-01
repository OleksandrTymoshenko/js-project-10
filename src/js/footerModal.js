// import {memberInfo} from './memberInfo';

// const footerBtnModal = document.querySelector('.footer__team-button')
// const modal = document.querySelector('[data-modal]')
// const footerModal = document.querySelector('.member-list')


// function onClickModalOpen() {
    
//     modal.classList.remove('hidden')
//     renderTeam();
// }

// function createMarkup(memberInfo) {
//     return memberInfo.map(({ id, photo, name, role, linkedIn, gitHub, telegram }) => {
//       return `<li class="member-item" id="${id}">
//                 <div class="member-card">
//                     <div class="member-photo">
//                         <img class="photo" src="${photo}" width="292" height="292" alt="team member">
//                     </div>
//                     <div class="member-description">
//                         <p class="member-name">${name}</p>
//                         <p class="member-role">${role}</p>
//                     </div>
//                     <div class="member-socials">
//                         <ul class="socials-list">
//                             <li class="socials-item">
//                                 <a href="${linkedIn}">LinkedIn</a>
//                             </li>
//                             <li class="socials-item">
//                                 <a href="${gitHub}"> GitHub</a>
//                             </li>
//                             <li class="socials-item">
//                                 <a href="${telegram}">Telegram</a>
//                             </li>
//                         </ul>
//                     </div>          
//                 </div>        
//             </li>`
//     }).join("");
// }

// function renderTeam() {
//     footerModal.insertAdjacentHTML('beforeend', createMarkup(memberInfo))
// }      

// footerBtnModal.addEventListener('click', onClickModalOpen)
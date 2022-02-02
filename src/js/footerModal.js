import {memberInfo} from './memberInfo';

const footerBtnModal = document.querySelector('.footer__team-button')
const closeModal = document.querySelector('.close-btn')
const modal = document.querySelector('[data-modal]')
const footerModal = document.querySelector('.member-list')

footerBtnModal.addEventListener('click', onClickModalOpen)
closeModal.addEventListener('click', onClickModalClose)

function onClickModalOpen() {
    modal.classList.remove('hidden')
    modal.classList.remove('modal')
    modal.classList.add('footer__modal')
    createMarkup(memberInfo);
}

function createMarkup(memberInfo) {
   const markup = memberInfo.map(({ id, photo, name, role, linkedIn, gitHub, telegram }) => {
      return `<li class="member-item" id="${id}">
                <div class="member-card">
                    <div class="member-photo">
                        <img class="photo" src="${photo}" width="200" height="200" alt="team member">
                    </div>
                    <div class="member-description">
                        <p class="member-name">${name}</p>
                        <p class="member-role">${role}</p>
                    </div>
                    <div class="member-socials">
                        <ul class="socials-list">
                            <li class="socials-item">
                                <a class="socials-linkedin" href="${linkedIn}">LinkedIn</a>
                            </li>
                            <li class="socials-item">
                                <a class="socials-github" href="${gitHub}">GitHub</a>
                            </li>
                            <li class="socials-item">
                                <a class="socials-telegram" href="${telegram}">Telegram</a>
                            </li>
                        </ul>
                    </div>          
                </div>        
            </li>`
    }).join("");
    footerModal.insertAdjacentHTML('beforeend', markup)
}     


function onClickModalClose() {
    modal.classList.add('hidden')
    modal.classList.remove('footer__modal')
    modal.classList.add('modal')
    footerModal.innerHTML = ''
}

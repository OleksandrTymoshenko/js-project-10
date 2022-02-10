import { ref } from "firebase/database";
import { EscCloseModal as EscCloseFilmModal } from './renderFunctions';
// import { refs as themeRefs } from './header-theme-toggler';

const refs = {
  openModalBtn: document.querySelector('[data-auth-modal-open]'),
  closeModalBtn: document.querySelectorAll('[data-auth-modal-close]'),
  modal: document.querySelector('[data-auth-modal]'),
  openSignInFormBtn: document.querySelector('[data-auth-modal-signin]'),
  openRegFormBtn: document.querySelector('[data-auth-modal-reg]'),
  signInForm: document.querySelector('[data-auth-modal-signin-form]'),
  regForm: document.querySelector('[data-auth-modal-reg-form]'),
  signWithGoogle: document.querySelector('.auth-modal__google'),

  eyeBtnSignPassword: document.querySelector('.auth-modal__form-sign-eye'),
  eyeBtnRegPassword: document.querySelector('.auth-modal__form-reg-eye'),
  signWithGoogleReg: document.querySelector('.auth-modal__google-reg'),

  inputEmailSignin: document.querySelector('[data-auth-modal-signin-form] [name="email"]'),

  inputPasswordSignin: document.querySelector('[name="passwordSign"]'),
  submitBtnSignin: document.querySelector('[data-auth-modal-signin-form] [type="submit"]'),

  inputEmailReg: document.querySelector('[data-auth-modal-reg-form] [name="email"]'),
  inputPasswordReg: document.querySelector('[name="passwordReg"]'),
  submitBtnReg: document.querySelector('[data-auth-modal-reg-form] [type="submit"]'),
  inputCheckboxReg: document.querySelector('[data-auth-modal-reg-form] [name="checkbox"]'), 
  termsLink: document.querySelector('.auth-modal__trems-link'),
  termsModal: document.querySelector('.terms-modal__backdrop'),  
  closeTermsBtn: document.querySelector('.terms-modal .close-btn'),  
  authModalWindow: document.querySelector('.auth-modal'),  
};

refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.forEach(el => el.addEventListener('click', closeModal));
refs.openSignInFormBtn.addEventListener('click', openSignInForm);
refs.openRegFormBtn.addEventListener('click', openRegForm);
refs.modal.addEventListener('click', onBackDropClick);

refs.inputEmailSignin.addEventListener('input', updateSubmitBtnSignin);
refs.inputPasswordSignin.addEventListener('input', updateSubmitBtnSignin);

refs.inputEmailReg.addEventListener('input', updateSubmitBtnReg);
refs.inputPasswordReg.addEventListener('input', updateSubmitBtnReg);
refs.inputCheckboxReg.addEventListener('change', updateSubmitBtnReg);

refs.termsLink.addEventListener('click', showTerms);
refs.closeTermsBtn.addEventListener('click', closeTerms);
refs.termsModal.addEventListener('click', onTermsBackdropClick);

function openModal() {
  refs.modal.classList.remove('visually-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  document.querySelector('body').classList.add('modal-open');
  window.removeEventListener('keydown', EscCloseFilmModal);
}

function closeModal() {
  refs.modal.classList.add('visually-hidden');  
  window.removeEventListener('keydown', onEscKeyPress);
  document.querySelector('body').classList.remove('modal-open');
  window.addEventListener('keydown', EscCloseFilmModal);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function openSignInForm() {
  refs.signInForm.classList.remove('hide');
  refs.regForm.classList.add('hide');

  if (document.querySelector('.theme__switcher').dataset.theme === 'light') {
  refs.openSignInFormBtn.classList.add('active');
  refs.openRegFormBtn.classList.remove('active');
  } else if (document.querySelector('.theme__switcher').dataset.theme === 'dark') {
  refs.openSignInFormBtn.classList.add('dark--active');
  refs.openRegFormBtn.classList.remove('dark--active');
  }
}

function openRegForm() {
  refs.regForm.classList.remove('hide');
  refs.signInForm.classList.add('hide');  

  if (document.querySelector('.theme__switcher').dataset.theme === 'light') {
  refs.openSignInFormBtn.classList.remove('active');
  refs.openRegFormBtn.classList.add('active');
  } else if (document.querySelector('.theme__switcher').dataset.theme === 'dark') {
  refs.openSignInFormBtn.classList.remove('dark--active');
  refs.openRegFormBtn.classList.add('dark--active');
  }
  
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}

function updateSubmitBtnSignin() {
  const email = refs.inputEmailSignin.value.trim();
  const password = refs.inputPasswordSignin.value.trim();
  
  if (email && password) {
    refs.submitBtnSignin.removeAttribute('disabled');
  } else {
    refs.submitBtnSignin.setAttribute('disabled', 'disabled');
  }
}

function updateSubmitBtnReg() {
  const email = refs.inputEmailReg.value.trim();
  const password = refs.inputPasswordReg.value.trim();
  const isTermsAgree = refs.inputCheckboxReg.checked;
  
  if (email && password && isTermsAgree){
    refs.submitBtnReg.removeAttribute('disabled');
  } else {
    refs.submitBtnReg.setAttribute('disabled', 'disabled');
  }
}

function showTerms(e) {
  e.preventDefault();
  refs.termsModal.classList.remove('visually-hidden');
  refs.modal.removeEventListener('click', onBackDropClick);
  window.addEventListener('keydown', onEscKeyPressTerms);
  window.removeEventListener('keydown', onEscKeyPress);

}

function closeTerms() {
  refs.termsModal.classList.add('visually-hidden');
  refs.modal.addEventListener('click', onBackDropClick);
  window.removeEventListener('keydown', onEscKeyPressTerms);
  window.addEventListener('keydown', onEscKeyPress);
}

function onTermsBackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeTerms();
  }
}

function onEscKeyPressTerms(e) {
  if (e.code === 'Escape') {
    closeTerms();
  }
}

export { refs, openModal, openSignInForm, closeModal};

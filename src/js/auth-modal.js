import { ref } from "firebase/database";

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
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.forEach(el => el.addEventListener('click', toggleModal));
refs.openSignInFormBtn.addEventListener('click', openSignInForm);
refs.openRegFormBtn.addEventListener('click', openRegForm);
refs.modal.addEventListener('click', onBackDropClick);

refs.inputEmailSignin.addEventListener('input', updateSubmitBtnSignin);
refs.inputPasswordSignin.addEventListener('input', updateSubmitBtnSignin);

refs.inputEmailReg.addEventListener('input', updateSubmitBtnReg);
refs.inputPasswordReg.addEventListener('input', updateSubmitBtnReg);
refs.inputCheckboxReg.addEventListener('change', updateSubmitBtnReg);

function toggleModal() {
  refs.modal.classList.toggle('visually-hidden');
}


function openSignInForm() {
  refs.signInForm.classList.remove('hide');
  refs.regForm.classList.add('hide');
  refs.openSignInFormBtn.classList.add('active');
  refs.openRegFormBtn.classList.remove('active');
}

function openRegForm() {
  refs.regForm.classList.remove('hide');
  refs.signInForm.classList.add('hide');    
  refs.openSignInFormBtn.classList.remove('active');
  refs.openRegFormBtn.classList.add('active');
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    toggleModal();
  }
}

export { refs, toggleModal, openSignInForm};

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

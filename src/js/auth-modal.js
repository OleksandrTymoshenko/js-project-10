const refs = {
  openModalBtn: document.querySelector('[data-auth-modal-open]'),
  closeModalBtn: document.querySelectorAll('[data-auth-modal-close]'),
  modal: document.querySelector('[data-auth-modal]'),
  openSignInFormBtn: document.querySelector('[data-auth-modal-signin]'),
  openRegFormBtn: document.querySelector('[data-auth-modal-reg]'),
  signInForm: document.querySelector('[data-auth-modal-signin-form]'),
  regForm: document.querySelector('[data-auth-modal-reg-form]'),
};
  

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.forEach(el => el.addEventListener('click', toggleModal));
refs.openSignInFormBtn.addEventListener('click', openSignInForm);
refs.openRegFormBtn.addEventListener('click', openRegForm);
refs.modal.addEventListener('click', onBackDropClick);


function toggleModal(e) {
  e.preventDefault();
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

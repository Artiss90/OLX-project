import  { API_OLX } from './url';
import { fetchRegistration } from './fetch/fetchRegistration';
import { fetchAuthenticationLogin } from './fetch/fetchAuthenticationLogin';
import { fetchAuthenGoogle } from './fetch/fetchAuthenGoogle';
import { save } from './localStorage';

const authRefs = {
regestryBtn: document.querySelector(`[data-modal-open-registration]`),
sideNavRegBtn: document.querySelector(`[data-sidenav-open-registration]`),
authModal: document.querySelector('[data-auth-modal]'),
overlay: document.querySelector('.auth-overlay'),
 closeModalBtn: document.querySelector('[data-auth-modal-close]'),
 authForm: document.querySelector('.auth-form'),
 emailInput: document.getElementById('Email'),
 emailError: document.querySelector('.email-error'),
 passwordInput: document.getElementById('Password'),
 passwordError: document.querySelector('.password-error'),
 signInBtn: document.querySelector('.signin'),
 signUpBtn: document.querySelector('.signup'),
 googleBtn: document.querySelector('.button-google'),
};

// Змінює класс .is-login 
export const isLogInRefs = document.querySelectorAll('.is-login');
export function changeElem() {
    isLogInRefs.forEach(el => { el.classList.toggle('is-login') });
}
if (localStorage.getItem('key') === null)
{changeElem();}

// Відкрити і закрити модальне вікно!
authRefs.regestryBtn.addEventListener('click', openModal);
authRefs.sideNavRegBtn.addEventListener('click', openModal);
authRefs.authModal.addEventListener('click', closeModal);
export function openModal() {
    authRefs.authModal.classList.remove('is-hidden');
    document.addEventListener('keyup', closeModal);
};
function closeModal(e) {
     if (
    e.target == authRefs.closeModalBtn ||
    e.target == authRefs.overlay ||
    e.keyCode == 27
     ) {
         authRefs.authModal.classList.add('is-hidden');
         document.removeEventListener('keyup', closeModal);
         resetForm();
     }
};
export function resetForm() {
authRefs.authForm.reset();
         authRefs.passwordError.textContent = '';
         authRefs.emailError.textContent = '';
         authRefs.emailInput.style.borderColor = '';
         authRefs.passwordInput.style.borderColor = '';
};
// Валідація емейла

authRefs.emailInput.addEventListener('input', checkEmail);
function validateEmail(value) {
    const validEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return validEmail.test(value);
}
function checkEmail(e) {
    if (validateEmail(e.target.value)) {
        authRefs.emailInput.style.borderColor = 'green';
        authRefs.emailError.textContent = '';
        enableSubmitBtn();
    } else {
        authRefs.emailInput.style.borderColor = 'red';
        authRefs.emailError.textContent = ('Введіть коректний email!');
    }
}
// Валдація паролю
authRefs.passwordInput.addEventListener('input', checkPassword);
function validatePassword(value) {
    const validPassw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return validPassw.test(value);
}
function checkPassword(e) {
    if (validatePassword(e.target.value)) {
        authRefs.passwordInput.style.borderColor = 'green';
        authRefs.passwordError.textContent = '';
        enableSubmitBtn();
    } else {
        authRefs.passwordInput.style.borderColor = 'red';
        authRefs.passwordError.textContent = ('Мінімум 6 символів: велика і мала літери, цифра!');
    }
}
// Відключає  кнопки форми <button type="submit">
function disableSubmitBtn() {
    authRefs.signUpBtn.disabled = true;
    authRefs.signInBtn.disabled = true;
};
function enableSubmitBtn() {
    authRefs.signUpBtn.disabled = false;
    authRefs.signInBtn.disabled = false;
};
disableSubmitBtn();

// Відправлення форми
authRefs.authForm.addEventListener('submit', e => {e.preventDefault();} );

function getFormData () {
    const form  = authRefs.authForm ;
    const formData = new FormData(form);
    const body = {};

    formData.forEach((value, key) => {
        body[key] = value;
    });
    return body;
};
// Log In! (записує accessToken в localStorage )
authRefs.signInBtn.addEventListener('click', onLogInClick);
function onLogInClick() {
    
    fetchAuthenticationLogin(API_OLX, getFormData()).then(response => {
/**сохранение данных логина в Localstorage */
        save('key', response.accessToken)
        save('refreshToken', response.refreshToken)
        save('sid', response.sid)
        save('UserToken', response)
        if (response.accessToken) {
            changeElem();
            authRefs.authModal.classList.add('is-hidden');
        }
        else authRefs.emailError.textContent = (response.message);
    });
};
// Реєстрація ( після успішної реєстрації виконує Log In)
authRefs.signUpBtn.addEventListener('click', onRegistryClick);

function onRegistryClick() {
    fetchRegistration(API_OLX, getFormData())
        .then(response => { 
            if (response.id) {
                onLogInClick();
            }
            else authRefs.emailError.textContent = (response.message);
        });
};
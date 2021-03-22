import getRefs from './refs';
import { API_OLX } from './url';
import { fetchLogout } from './fetch/fetchLogout';
import { changeElem } from './auth-modal';
import { isLogInRefs } from './auth-modal';
import { resetForm } from './auth-modal';

const refs = getRefs();

refs.openPopupBtnLogout.addEventListener('click', openPopupLogoutModal);
refs.openPopupBtnLogoutTablet.addEventListener('click', openPopupLogoutModal);
refs.closePopupBtnLogout.addEventListener('click', onTogglePopUp);
refs.cancelPopupBtnLogout.addEventListener('click', onTogglePopUp);
refs.exitAccount.addEventListener('click', onExitAccount);
refs.backdrop.addEventListener('click', onCloseBackdropClick);
refs.backdrop.addEventListener('click', onCloseBackdropClick);

function openPopupLogoutModal() {
  onTogglePopUp();
  document.addEventListener('keyup', onCloseEsc);
}
function onTogglePopUp() {
  refs.backdropPopupLogout.classList.toggle('is-hidden');
  document.removeEventListener('keyup', onCloseEsc);
}

//Выход из аккаунта
async function onExitAccount() {
  try {
    const response = await fetchLogout(API_OLX);
    onTogglePopUp();
    changeElem(isLogInRefs);
    resetForm();
  } catch (error) {
    console.log(error.message);
  }
}

//Закрытие по клику на бэкдроп и esc
function onCloseBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onTogglePopUp();
  }
}

function onCloseEsc(evt) {
  const ESC_KEY_CODE = 'Escape';
  if (evt.code === ESC_KEY_CODE) {
    onTogglePopUp();
  }
}

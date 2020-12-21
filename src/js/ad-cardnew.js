// import addCardModal from '../templates/add-card.hbs';

import validatedForm from './modal';
import { load, save, remove } from './localStorage';
import { pushError } from './pnotify';
import { API_OLX } from './url';



export default function openAddCardModal() {
  const markup = newAddCard();
  document.body.addEventListener('click', addCardModalClick, { once: true });
  return markup;
}

function addCardModalClick(event) {
  validatedForm();
  newAddCard(event);
}

function newAddCard(event) {
  event.preventDefault();
  const photoElem = document.querySelector('.create-an-ad-modal__input-file');
  const addCardForm = document.querySelector('#form-add');
  const closeBtn = document.querySelector('[data-clouse-button-create-ad]');
  const formData = new FormData();
  const myHeaders = new Headers();

  addCardForm.addEventListener('submit', addFormSubmit);
  photoElem.addEventListener('input', function () {
    formData.append('file', photoElem.files[0]);
  });

  async function addFormSubmit(e) {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const title = formElements.title.value;
    const description = formElements.description.value;
    const category = formElements.category.value;
    const price = formElements.price.value;
    const phone = formElements.phone.value;

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', Number(price));
    formData.append('phone', phone);
    myHeaders.append('Authorization', `Bearer ${load('Token').accessToken}`);
    const URL = '${API_OLX}/call';
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: formData,
    };

    const answer = await fetch(URL, requestOptions);
    if (answer.ok) {
      closeBtn.click();
      pushError('Status OK!');
    }

    const error = await answer.json();
    if (error.message) {
      pushError(error.message);
    }
  }
}


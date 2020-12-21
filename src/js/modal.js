
import addModalTempl from '../templates/add-card.hbs' ;
import { API_OLX } from './url';




// створення шаблону(div.my-cards)
function createNewModalTempl(){
    myProducts.insertAdjacentHTML('afterbegin', addModalTempl())
}

// createNewModalTempl()





// Закриття модалки
const refs = {
    closeModalBtn: document.querySelector('[data-clouse-button-create-ad]'),
    backdropAdd: document.querySelector('.backdrop-add'),
    authModal: document.querySelector('[data-auth-modal]')
};
console.log(refs.backdropAdd);
const myProducts =  document.querySelector('.my-cards');
const formAdd = document.querySelector('#form-add');
const selectProduct = formAdd.querySelector('#categori-product-add');
const productPrice = formAdd.querySelector('#price-product-add');
const tel = formAdd.querySelector('#sellers-telephone-add');
const requiredFields = formAdd.querySelectorAll('.required');

const closeModalBtn = document.querySelector('[data-clouse-button-create-ad]');
const backdropAdd = document.querySelector('.backdrop-add');

selectProduct.addEventListener('click', renderCategoriesList);

function fetchCategories() {
  return fetch(`${API_OLX}/call/categories`)
    .then(res => {
      return res.json();
    }).
    
    catch(error => console.log(error));
}
//випадаючий список
function renderCategoriesList() {
  let categoryMarkup = ``;
  fetchCategories().then((categories) => {
    for (let category of categories){
      categoryMarkup += `<option value="${category}" class="js-add-category">${category}</option> `;
    }
    addCategory.insertAdjacentHTML('beforeend', categoryMarkup);
    addCategory.removeEventListener('click', renderCategoriesList);
   })
    .catch(error => console.log(error));
}

// Валідація форми



// Коректні дані
const correctTelV =  /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/;
const correctPriceV = /\d+\.\d{2}\D{3}/;



// formAdd.addEventListener('submit', validatedForm);

export default function validatedForm(event){
    event.preventDefault();
    removeValidation();
    correctFields();
    correctTelFunc();
    correctPriceFunc();
}

function errorCreate(text){
    const error = document.createElement('div');
    error.className = 'add-form-error';
    error.innerHTML = text;
    return error;
}

function removeValidation(){
    const errors= formAdd.querySelectorAll('.add-form-error');
    for (let i = 0; i < errors.length; i+=1) {
        errors[i].remove();
    }
}

function correctFields(){
    for (let i = 0; i < requiredFields.length; i+=1) {
        if(!requiredFields[i].value){
            console.log('Необхідно заповнити', requiredFields[i]);

            const error = errorCreate('Необхідно заповнити!')
           
            form[i].parentElement.insertBefore(error, requiredFields[i]);
        }  
    }
}

function correctTelFunc(){
    if(tel.value !== ""){
        if(!correctTelV.test(tel.value)){
            console.log('невірно введений номер');
            const error = errorCreate('невірноно введений номер');
            tel.parentElement.insertBefore(error, tel);
        }
    }  
}

function correctPriceFunc(){
    if(productPrice.value !== ""){
        if(!correctPriceV.test(productPrice.value)){
            const error = errorCreate('введіть ціну згідно формату 0.00грн')
            productPrice.parentElement.insertBefore(error, productPrice);
        }
    }
}


                   // Закриття модалки

// //  через кнопку
// closeModalBtn.addEventListener('click', modalClose);
 
// //  по Esc
// document.addEventListener('keydown', modalEscClose);

// //  по оверлею
// backdropAdd.addEventListener('click', onModalBackdropClick);

// function modalClose() {
//     refs.backdropAdd.classList.toggle('is-open');
// }
// function modalEscClose(evt) {
//   if (evt.key === "Escape") {
//     modalClose();
//   }
// }
// function onModalBackdropClick(evt) {
//   if (evt.target.attributes.class.nodeValue === "backdrop-add") {
//     modalClose();
//   }
//   if (evt.target.attributes.class === undefined) {return}
// }
// import addCardModal from '../templates/add-card.hbs';
// import openModalAuth from './authorization';
// import modalLogic from './addAndEditModalLogic';
// import { load, save, remove } from './storage';
// import { pushError } from './pnotify';

// export default function openAddCardModal() {
//   if (!load('User')) return openModalAuth();
//   const markup = addCardModal();
//   document.body.addEventListener('click', addCardModalClick, { once: true });
//   return markup;
// }

// function addCardModalClick(event) {
//   if (event.target.hasAttribute('data-close')) {
//     return;
//   }
//   modalLogic();
//   onOpenAddCardModal(event);
// }

// function onOpenAddCardModal(event) {
//   event.preventDefault();
//   const photoElem = document.querySelector('.create-an-ad-modal__input-file');
//   const addCardForm = document.querySelector('.add-card__form');
//   const closeBtn = document.querySelector('span[data-close]');
//   const formData = new FormData();
//   const myHeaders = new Headers();

//   addCardForm.addEventListener('submit', onFormSubmit);
//   photoElem.addEventListener('input', function () {
//     formData.append('file', photoElem.files[0]);
//   });

//   async function onFormSubmit(e) {
//     e.preventDefault();
//     const formElements = e.currentTarget.elements;
//     const title = formElements.title.value;
//     const description = formElements.description.value;
//     const category = formElements.category.value;
//     const price = formElements.price.value;
//     const phone = formElements.phone.value;

//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('price', Number(price));
//     formData.append('phone', phone);
//     myHeaders.append('Authorization', `Bearer ${load('Token').accessToken}`);
//     const URL = 'https://callboard-backend.herokuapp.com/call';
//     const requestOptions = {
//       method: 'POST',
//       redirect: 'follow',
//       headers: myHeaders,
//       body: formData,
//     };

//     const answer = await fetch(URL, requestOptions);
//     if (answer.ok) {
//       closeBtn.click();
//       pushError('Ваше оголошення успішно опубліковане');
//     }

//     const error = await answer.json();
//     if (error.message) {
//       pushError(error.message);
//     }
//   }
// }


// let newItem = {
//     "title": addName.value,
//     "description": addDescr.value,
//     "category": addCategory.value,
//     "price": Number(addPrice.value),
//     "phone": addPhone.value,
//     // "imageUrls": [
//     //     "string"
//     // ],
// };
// validateBtn.addEventListener('click', qwerty);

// function qwerty(newItem) {
//     console.log(newItem);
// }

  //Art(скорей всего ненужний)
// (() => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//   };


//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);


//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }
// })();
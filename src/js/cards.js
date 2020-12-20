
import { API_OLX } from "./url.js";
import  templateCard  from '../templates/cardset.hbs';
// import { fetchCall } from './fetch/fetchCall.js';
import { fetchGetSpecificCategory } from './fetch/fetchGetSpecificCategory';
import { fetchPostAddFavoriteID } from './fetch/fetchPostAddFavoriteID';

// we wont be used this one;
// fetchCall(API_OLX, 3).then(render => document.querySelector('.cards').innerHTML = templateCard(render.property))

// category property is rendered by default;)))
fetchGetSpecificCategory(API_OLX, 'property').then(render => document.querySelector('.cards').innerHTML = templateCard(render))
fetchGetSpecificCategory(API_OLX, 'property').then(getArray)

// here we are rendering one category we are choosing by click on category;))
const chooseCategory = document.querySelector('.sidenav-desctop');
chooseCategory.addEventListener('click', onCategoryClick)
const mobileMenuRef = document.querySelector('[data-menu]');
mobileMenuRef.addEventListener(`click`, onCategoryClick)

function onCategoryClick(e) {
    if (e.target.nodeName !== `LI`) {
        return
 }
  e.preventDefault();
  
  const category = e.target.textContent;
  
  fetchGetSpecificCategory(API_OLX, category.trim()).then(render => document.querySelector('.cards').innerHTML = templateCard(render))
  fetchGetSpecificCategory(API_OLX, category.trim()).then(getArray)
    history.pushState(null, null, e.target.dataset.category);
  setTimeout(() =>
  { document.querySelector('.cards__title').textContent = category;
}, 150);
}

let value;
function getArray(val) {
     value = val;
}
  

 
const modal = document.querySelector('[data-item-modal]');
const name = document.querySelector('[data-item-modal-title]');
const code = document.querySelector('[data-item-modal-code]');
const imgBig = document.querySelector('[data-item-modal-imagebig]');
const description = document.querySelector('[data-item-modal-description]');
const price = document.querySelector('[data-item-modal-price]');




// when we click on zoom, we will receive a modal with data about whole card:))
// but it is not still working correct:((;

  const openModal = document.querySelector('.cards')
  openModal.addEventListener('click', onExpandClick);

  function onExpandClick(e) {
    e.preventDefault();
    const target = e.target.dataset.id;
    
    if (e.target.attributes[0].nodeName === 'data-open') {

      for (const item of value) {

      if (item._id === target) {
        showModal(item)
      }
    }
    
   }
  }

function showModal(item) {
  modal.classList.add('isActive');
  name.textContent = item.title;
  price.textContent = item.price + '.00 грн';
  description.textContent = item.description;
  imgBig.src = item.imageUrls[0];
  code.textContent = "Код товару | "+item._id;
}


// This function is used by click on Like;
openModal.addEventListener('click', onLikeClick);

function onLikeClick(e) {
  e.preventDefault()
  const target = e.target.dataset.id;
  if (e.target.attributes[0].nodeName === 'data-like') {
    for (const item of value) {

      if (item._id === target) {
        fetchPostAddFavoriteID(API_OLX, item._id).then(console.log);
      }
    }
  }
}

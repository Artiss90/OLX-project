import { API_OLX } from './url';
import { fetchCall } from './fetch/fetchCall';
import { fetchFavouritesDelete } from './fetchFavouritesDelete';
import { fetchGetFavorites } from './fetch/fetchGetFavorites';
import { fetchPostAddFavoriteID } from './fetch/fetchPostAddFavoriteID';
import { fetchGetUserID } from './fetch/fetchGetUserID';
import { renderFavourites } from './dropdowm-menu';

const modal = document.querySelector('[data-item-modal]');
const name = document.querySelector('[data-item-modal-title]');
const code = document.querySelector('[data-item-modal-code]');
const imgBig = document.querySelector('[data-item-modal-imagebig]');
const imagesSmall = document.querySelector('[data-item-modal-image-list]');
const salerInfo = document.querySelector('[data-item-modal-salerinfo]');
const favourites = document.querySelector('[data-item-modal-favourites]');
const share = document.querySelector('[data-item-modal-share]');
const description = document.querySelector('[data-item-modal-description]');
const price = document.querySelector('[data-item-modal-price]');
const close = document.querySelector('[data-item-modal-close]');

const cardsContainer = document.querySelector('.cards');

favourites.addEventListener('click', onFavouritesClicked);
function onFavouritesClicked() {
  for (const item of favouritesList) {
    if (item === currentItem._id) {
      fetchFavouritesDelete(API_OLX, currentItem._id).then(updateFavourites);
      favourites.classList.remove('selected');
      return;
    }
  }

  fetchPostAddFavoriteID(API_OLX, currentItem._id).then(updateFavourites);
  favourites.classList.add('selected');
  fetchGetFavorites(API_OLX).then(setFavourites);
}

function updateFavourites(render) {
  if (document.querySelector('.container-my-favourites') !== null) {
    renderFavourites();
  }
  if (render === null) return;
  favouritesList = [];
  if (render.favourites !== undefined) {
    for (const item of render.favourites) {
      favouritesList.push(item._id);
    }
  } else {
    for (const item of render.newFavourites) {
      favouritesList.push(item._id);
    }
  }
}

cardsContainer.addEventListener('click', onItemClicked);

function onItemClicked(event) {
  fetchGetFavorites(API_OLX).then(setFavourites);
  let image = event.target.querySelector('[data-id]');
  if (image === null) {
    image = event.target.parentNode;
  }

  if (image === null || image.classList.contains('edit')) return;

  if (image.dataset.like === '') {
    for (const item of itemsData) {
      if (item._id.toString() === image.dataset.id) {
        currentItem = item;
        onFavouritesClicked();
        return;
      }
    }
  }

  for (const item of itemsData) {
    if (item._id.toString() === image.dataset.id) {
      fetchGetUserID(API_OLX, item.userId)
        .then(setCurrentUser)
        .catch(console.log);
      showModal(item);
      currentItem = item;
    }
  }
}
let currentItem;
let currentUser;

function setCurrentUser(user) {
  currentUser = user;
}

document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ('key' in evt) {
    isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    closeModal();
  }
};

close.addEventListener('click', closeModal);

function closeModal() {
  if (modal.classList.contains('isActive')) {
    modal.classList.remove('isActive');
  }
  document.querySelector('body').classList.remove('scrollLocked');
  imagesSmall.innerHTML = '';
  imagesSmall.removeEventListener('click', changePhoto);
}
let favouritesList = [];
fetchGetFavorites(API_OLX).then(setFavourites);

function setFavourites(render) {
  favouritesList = [];
  for (const item of render.favourites) {
    favouritesList.push(item._id);
  }
}

fetchCall(API_OLX, 1).then(setData);
fetchCall(API_OLX, 2).then(setData);
fetchCall(API_OLX, 3).then(setData);

let itemsData = [];

function setData(render) {
  const keys = Object.keys(render);
  for (const key of keys) {
    const array = render[key];
    for (const item of array) {
      itemsData.push(item);
    }
  }
}

salerInfo.addEventListener('mouseenter', addHoverText);

function removeSalerInfoChilds() {
  salerInfo.innerHTML = '';
}

function addHoverText() {
  removeSalerInfoChilds();
  salerInfo.insertAdjacentHTML(
    'afterbegin',
    '<div class="nav-and-description-button-hovered"><p data-item-modal-salerinfo class="nav-and-description-button-hovered-bold">' +
      currentUser.email +
      '</p><p data-item-modal-salerinfo>- на OLX с ' +
      currentUser.registrationDate +
      '</p><p data-item-modal-salerinfo class="nav-and-description-button-hovered-bold">' +
      currentItem.phone +
      '</p></div>',
  );
}

salerInfo.addEventListener('mouseleave', addNonhoverText);

function addNonhoverText() {
  removeSalerInfoChilds();
  salerInfo.insertAdjacentHTML(
    'afterbegin',
    '<p class="nav-and-description-button-nonhovered">Информация о<br> продавце</p>',
  );
}

function showModal(item) {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.querySelector('body').classList.add('scrollLocked');
  modal.classList.add('isActive');
  name.textContent = item.title;
  price.textContent = item.price + '.00 грн';
  description.textContent = item.description;
  imgBig.src = item.imageUrls[0];
  code.textContent = 'Код товару | ' + item._id;
  removeSalerInfoChilds();
  salerInfo.insertAdjacentHTML(
    'afterbegin',
    '<p class="nav-and-description-button-nonhovered">Информация о<br> продавце</p>',
  );

  imagesSmall.innerHTML = '';

  for (let i = 0; i < item.imageUrls.length; i++) {
    imagesSmall.insertAdjacentHTML(
      'afterbegin',
      '<li class="image-block-small-list-item"><img class="image-block-small-list-item-img" data-item-modal-imagesmall src="' +
        item.imageUrls[i] +
        '" alt=""><div data-mobile-swiper></div></li>',
    );
  }

  divsMobile = document.querySelectorAll('[data-mobile-swiper]');
  if (divsMobile.length > 0) {
    divsMobile[0].classList.add('div-active');
  }

  photosList = item.imageUrls;
  photosSize = item.imageUrls.length;

  imagesSmall.addEventListener('click', changePhoto);

  for (const localeItem of favouritesList) {
    if (localeItem === item._id) {
      favourites.classList.add('selected');
      return;
    }
  }

  favourites.classList.remove('selected');
}

let photosList;
let currentPhotoIdx = 0;
let photosSize = 0;

function changePhoto(event) {
  if (event.target.src !== undefined && event.target.src !== null) {
    imgBig.src = event.target.src;
  }
}

modal.addEventListener('click', closeOverlay);

function closeOverlay(event) {
  if (event.target.classList.contains('overlay')) {
    closeModal();
  }
}

let divsMobile;

function swipedetect(el, callback) {
  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) {};

  touchsurface.addEventListener(
    'touchstart',
    function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = 'none';
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
    },
    false,
  );

  touchsurface.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault(); // prevent scrolling when inside DIV
    },
    false,
  );

  touchsurface.addEventListener(
    'touchend',
    function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
      e.preventDefault();
    },
    false,
  );
}

//USAGE:

swipedetect(imgBig, function (swipedir) {
  if (
    getComputedStyle(
      document.querySelector('.image-block-small-list-item-img'),
      '.image-block-small-list-item-img',
    ).visibility !== 'hidden'
  )
    return;

  if (swipedir == 'left') {
    // alert('You just swiped left!')
    currentPhotoIdx++;
    if (currentPhotoIdx === photosSize) {
      currentPhotoIdx = 0;
    }
    changePhotoSwiper();
  } else if (swipedir == 'right') {
    // alert('You just swiped right!')
    currentPhotoIdx--;
    if (currentPhotoIdx < 0) {
      currentPhotoIdx = photosSize - 1;
    }
    changePhotoSwiper();
  }
});

function changePhotoSwiper() {
  for (let item of divsMobile) {
    item.classList.remove('div-active');
  }

  divsMobile[currentPhotoIdx].classList.add('div-active');

  imgBig.src = photosList[currentPhotoIdx];
}

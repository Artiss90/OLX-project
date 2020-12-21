import { API_OLX } from './url';
import getRefs from './refs';
import templateCard from '../templates/card.hbs';
import { fetchCall } from './fetch/fetchCall';
import { fetchGetFavorites } from './fetch/fetchGetFavorites';
import { fetchGetUser } from './fetch/fetchGetUser';
import { fetchFavouritesDelete } from './fetchFavouritesDelete';
import myFavouritesCardRenderTpl from '../templates/my-favourites-card.hbs';
import myAdsCardRenderTpl from '../templates/my-ads-card.hbs';

//const showMyAd = document.querySelector("[data-dropdown-ad]");
const showMyFavourites = document.querySelector("[data-dropdown-favourites]");
let dismissBtnList;
let containerFavourites;
console.log(containerFavourites);
const refs = getRefs();

console.log(showMyFavourites);
showMyFavourites.addEventListener('click', renderFavourites);

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

let currentUser;

function setCurrentUser(user){
    currentUser = user;
    console.log(currentUser);
    renderMyAds();
}

export async function renderFavourites() {
  document.querySelector('.cards').innerHTML
  
    try { 
    const response = await fetchGetFavorites(API_OLX);
    console.log('Я респонс', response);
      if (response.favourites.length === 0) {
        console.log('Нет объявлений');
      } else {
      refs.myAds.innerHTML = myFavouritesCardRenderTpl(response.favourites);
      }
    } catch (error) {
      console.log(error.message);
    }
  
    dismissBtnList = document.querySelectorAll("[data-like-favourites]");
    containerFavourites = document.querySelector(".container-my-favourites");
    containerFavourites.addEventListener('click', dismiss);
    console.log(dismissBtnList);
  }

  function dismiss(event){
      console.log(event.target.parentElement.parentElement);
      if(event.target.parentElement.dataset.likeFavourites==="" || event.target.parentElement.parentElement.dataset.likeFavourites===""){
          if(event.target.parentElement.dataset.id!==undefined){
            fetchFavouritesDelete(API_OLX, event.target.parentElement.dataset.id).then(renderFavourites);
          }else{
            fetchFavouritesDelete(API_OLX, event.target.parentElement.parentElement.dataset.id).then(renderFavourites);
          }
 
      }
  }

  const showMyAds = document.querySelector("[data-dropdown-ad]");

  showMyAds.addEventListener('click', showAds);

  function showAds(){
    fetchGetUser(API_OLX).then(setCurrentUser).catch(console.log)
  }

async function renderMyAds() {
  document.querySelector('.cards').innerHTML
  
    try { 
    let response = [];

    for(let item of itemsData){
        if(item.userId===currentUser.id){
            response.push(item);
        }
    }

    // ДЛЯ ПРИМЕРА!!!!
    // for(let item of itemsData){
    //     if(item.userId==="5fd0b413deae5f0017e41ad5"){
    //         response.push(item);
    //     }
    // }
    // ДЛЯ ПРИМЕРА!!!!


      refs.myAds.innerHTML = myAdsCardRenderTpl(response);
    //   }
    } catch (error) {
      console.log(error.message);
    }
  
  }
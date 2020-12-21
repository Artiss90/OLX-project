import { API_OLX } from './url';

import { fetchCategory } from './fetch/fetchCategory';
import MarkupSideNavDesctop from '../templates/header-sidenav-desctop.hbs';
import MarkupSidenavMobile from '../templates/header-sidenav-mobile.hbs';
import MarkupModalCreateAnAdCategory from '../templates/header-create-an-ad-category.hbs';
import MarkupFindSearch from '../templates/my-search-card.hbs';
import { fetchGetFind } from './fetch/fetchGetFind';
import getRefs from './refs';
const refs = getRefs();

const body = document.querySelector(`body`)
const openSideNav = document.querySelector('[data-menu-button]');
const mobileMenuRef = document.querySelector('[data-menu]');
const clouseSideNav = document.querySelector(`[data-clouse-button]`)
const openCreateAnAd = document.querySelector(`[data-create-an-ad-btn-open]`)
const modalCreateAnAd = document.querySelector(`[data-create-ad]`)
const clouseModalCreateAnAd = document.querySelector(`[data-clouse-button-create-ad]`)
const sideNavDesctop = document.querySelector(`#sidenav-desctop`)
const changeCategoryForCreateAnAd = document.querySelector(`#categori-product-add-list`)
const sidenavModalRegistrartion = document.querySelector(`[data-sidenav-open-registration]`)
const modalSerch = document.querySelector(`.js-modal-search`)
const fieldSerch = document.querySelector(`.search-field`)
const btnOpenModalSerch = document.querySelector(`.js-btn-open-modal-serch`)
const containerModalSerch = document.querySelector(`.modal-search__container`)
const btnClouseModalSerch = document.querySelector(`.js-btn-clouse-modal-serch`)
const btnSearchInput = document.querySelector(`.search__button`)
const btnOpenCreateAnAdMobile = document.querySelector(`.js-create-an-ad-modal-mobile`)
const btnClearFilter = document.querySelector(`.header-navigation__clear-filter`)
const btnLogo = document.querySelector(`.header-navigation_logo`)
const sideNavContainerRef = document.querySelector(`.sidenav__link`)
// const openModalRegistrartion = document.querySelector(`[data-modal-open-registration]`)
// const modalRegistration = document.querySelector(`[data-menu-registration]`)
// const clouseModalRegistration = document.querySelector(` [data-clouse-button-modal-registration]`)

// открытие - закрытие модалок Хедера
function controlModalWindow(modal) {
        modal.classList.toggle(`is-open`)
        body.classList.toggle(`is-open-modal`)
}


function onOpenModalHeader(btn, modal) {
        btn.addEventListener(`click`, openModal)
        function openModal() {
               controlModalWindow(modal)
        }
}

modalSerch.addEventListener(`click`, closeBackDropSerch)
modalCreateAnAd.addEventListener(`click`, closeBackDropSerch)
window.addEventListener(`keydown`, closeBackDropSerch)
function closeBackDropSerch(evt) {
        if (modalSerch.classList.contains(`is-open`)) {
                if (evt.target.className === `modal-search__overlay` || evt.keyCode === 27) {
                controlModalWindow(modalSerch)
        }    }
        if (modalCreateAnAd.classList.contains(`is-open`)) {
                if(evt.target.classList.contains(`create-an-ad-modal`) || evt.keyCode === 27)
               controlModalWindow(modalCreateAnAd)
       }
}
sideNavContainerRef.addEventListener(`click`, clouseMobileSideNav)
function clouseMobileSideNav(evt) {
                if (evt.target.className === `sidenav__ref` || evt.target.className === `sidenav__dropdawn-content--text`) {
                controlModalWindow(mobileMenuRef)
        } 
}
onOpenModalHeader(openSideNav, mobileMenuRef)
onOpenModalHeader(clouseSideNav, mobileMenuRef)
onOpenModalHeader(openCreateAnAd, modalCreateAnAd)
onOpenModalHeader(btnOpenCreateAnAdMobile, modalCreateAnAd)
onOpenModalHeader(clouseModalCreateAnAd, modalCreateAnAd)
onOpenModalHeader(btnOpenModalSerch, modalSerch)
onOpenModalHeader(btnClouseModalSerch, modalSerch)
onOpenModalHeader(btnSearchInput, modalSerch)

// onOpenModalHeader(openModalRegistrartion, modalRegistration)
// onOpenModalHeader(clouseModalRegistration, modalRegistration)
// onOpenModalHeader(sidenavModalRegistrartion,modalRegistration)

/** модалка поиска */
containerModalSerch.addEventListener('submit', inGetFind)
function inGetFind(e) {
        e.preventDefault()
        if (e.currentTarget.elements.query.value === '') {return}
        const find = e.currentTarget.elements.query.value;
        history.pushState(null, null, `find?search=${find}`)
        console.log(find);
        fetchGetFind(API_OLX, find).then(response => {refs.myAds.innerHTML = MarkupFindSearch(response)})
};

 // sidenav(Desctop) рендер категорий
fetchCategory(API_OLX).then(responce => appendSideNavDesctop(responce))
function appendSideNavDesctop(cat) {
        
        sideNavDesctop.innerHTML = MarkupSideNavDesctop(cat)
}
// sidenav(mobile-tablet) рендрер категорий
fetchCategory(API_OLX).then(responce => appendSideNavMobile(responce))
function appendSideNavMobile(cat) {
        mobileMenuRef.firstElementChild.insertAdjacentHTML(`beforeend`, MarkupSidenavMobile(cat))
}

//Создать обьявление рендер категорий
fetchCategory(API_OLX).then(responce => appendchangeCategoryForCreateAnAd(responce))
function appendchangeCategoryForCreateAnAd(cat) {
        changeCategoryForCreateAnAd.innerHTML = MarkupModalCreateAnAdCategory(cat)
}

clearURL(btnClearFilter)
clearURL(btnLogo)
function clearURL(btn) {
        btn.addEventListener(`click`, baseURL)
        function baseURL() {
                history.pushState(null, null, `/`)
} 
        }
        
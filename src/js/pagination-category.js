import { API_OLX } from './url';
import getRefs from './refs';
import templateCard from '../templates/card.hbs';
import templateCardset from '../templates/cardset.hbs';
import templateCatSlider from '../templates/category-slider.hbs';
import templateCat from '../templates/category.hbs';
import { load, save, remove } from './localStorage';
import {fetchCategory} from './fetch/fetchCategory'; /** */
import { fetchGetSpecificCategory } from './fetch/fetchGetSpecificCategory';
import { fetchCall } from './fetch/fetchCall';
import templateHomeCard from '../templates/home-card.hbs';

const refs = {
    mainPage: document.querySelector('.first'),
    secondPage: document.querySelector('.second'),
    thirdPage: document.querySelector('.third'),
    clearFilter: document.querySelector('.header-navigation__clear-filter'),
    touchLogo: document.querySelector('.header-navigation_logo'),
};

refs.mainPage.addEventListener('click', renderFirstPage);
refs.secondPage.addEventListener('click', renderSecondPage);
refs.thirdPage.addEventListener('click', renderThirdPage);
refs.clearFilter.addEventListener('click', renderMainPage);
refs.touchLogo.addEventListener('click', renderMainPage);

// const paginationSection = document.querySelector('pages-section'); //не работает
// paginationSection.addEventListener(`click`, onCategoryClick) //не работает

fetchCall(API_OLX, 1).then(render => document.querySelector('.cards').innerHTML = templateHomeCard(render)).then(history.pushState(null, null, '/main'))

function renderMainPage(event) {
    event.preventDefault();

    refs.mainPage.classList.add('active');
    refs.secondPage.classList.remove('active');
    refs.thirdPage.classList.remove('active');

    history.pushState(null, null, '/main');

    fetchCall(API_OLX, 1).then(render => document.querySelector('.cards').innerHTML = templateHomeCard(render))
    .then(window.scrollTo({
        top: 0,
        behavior: 'smooth',
    }))
}

function renderFirstPage(event) {
    event.preventDefault();

    refs.mainPage.classList.add('active');
    refs.secondPage.classList.remove('active');
    refs.thirdPage.classList.remove('active');

    history.pushState(null, null, '/page=1');

    fetchCall(API_OLX, 1).then(render => document.querySelector('.cards').innerHTML = templateHomeCard(render))
    .then(window.scrollTo({
        top: 0,
        behavior: 'smooth',
    }))
}

function renderSecondPage(event) {
    event.preventDefault();

    refs.mainPage.classList.remove('active');
    refs.secondPage.classList.add('active');
    refs.thirdPage.classList.remove('active');

    history.pushState(null, null, '/page=2');

    fetchCall(API_OLX, 2).then(render => document.querySelector('.cards').innerHTML = templateHomeCard(render))
    .then(window.scrollTo({
        top: 0,
        behavior: 'smooth',
    }))
}

function renderThirdPage(event) {
    event.preventDefault();

    refs.mainPage.classList.remove('active');
    refs.secondPage.classList.remove('active');
    refs.thirdPage.classList.add('active');

    history.pushState(null, null, '/page=3');

    fetchCall(API_OLX, 3).then(render => document.querySelector('.cards').innerHTML = templateHomeCard(render))
    .then(window.scrollTo({
        top: 0,
        behavior: 'smooth',
    }))
}
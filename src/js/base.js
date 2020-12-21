import { API_OLX } from './url';
import getRefs from './refs';
import templateCard from '../templates/cardset.hbs';
import { load, save, remove } from './localStorage'; 
import {fetchCategory} from './fetch/fetchCategory'; /** */
import { fetchGetSpecificCategory } from './fetch/fetchGetSpecificCategory';
import { fetchRegistration } from './fetch/fetchRegistration';/** */
import {fetchAuthenticationLogin} from './fetch/fetchAuthenticationLogin';/** */
import { fetchLogout } from './fetch/fetchLogout';
import { fetchGetUser } from './fetch/fetchGetUser';
import { fetchGetUserID } from './fetch/fetchGetUserID';
import { fetchGetFavorites } from './fetch/fetchGetFavorites';
import { fetchPostAddFavoriteID } from './fetch/fetchPostAddFavoriteID';
import { fetchDeleteFavoriteID } from './fetch/fetchDeleteFavoriteID';
import { fetchGetOwn } from './fetch/fetchGetOwn'; /***мои товары */
import { fetchGetFind } from './fetch/fetchGetFind'; /**найти товар */
import { fetchAuthenGoogle } from './fetch/fetchAuthenGoogle'; /**непонятно как работает? */
import { fetchCall } from './fetch/fetchCall';
import { fetchPostCall } from './fetch/fetchPostCall'; /*ошибка сервера 500,я не могу проверить*/
import { fetchPatchCall } from './fetch/fetchPatchCall';/**немогу достучатся, скорей всего нужно применять на товаре созданым в своей учётке*/
import { fetchDeleteCallID } from './fetch/fetchDeleteCallID';
import { fetchAuthenRefresh } from './fetch/fetchAuthenRefresh';
import { cards } from './cards.js'
import slider from './sliderNew';


/***************************примеры данных для фетч */
    const dataField = {
        /** заглушка*/
  "title": "Red Shirt",
  "description": "New red shirt, made from cotton",
  "category": "Trade",
  "price": 0,
  "phone": "+380000000000",
  "imageUrls": ["string"
]
    }
const cardID = '5fd86775c298a200179c9404';
// const userId = load('UserToken').user.id;
const newUser = {
    "email": "artwis669@gmail.com",
    "password": "Qwerty2020"
};
const searchFind = 'Developer';
const myCategory = 'transport';

/********************************************** пример использования всех наших фетчей */
// fetchCategory(API_OLX).then(console.log)
// fetchRegistration(API_OLX, newUser).then(console.log)
fetchAuthenticationLogin(API_OLX, newUser).then(response => {
    save('key', response.accessToken)
    save('refreshToken', response.refreshToken)
    save('sid', response.sid)
}
    )
fetchAuthenticationLogin(API_OLX, newUser).then(response => { save('UserToken', response) }) 
// console.log(load('UserToken').user.id);
// fetchAuthenGoogle(API_OLX).then(console.log) /**ещё работает */
// fetchCall(API_OLX, 1).then(console.log)
// fetchCall(API_OLX, 2).then(console.log)
// fetchCall(API_OLX, 3).then(console.log)
// fetchPostCall(API_OLX, dataField).then(console.log)
// fetchPatchCall(API_OLX, dataField, cardID).then(console.log) /**изменяет мой товар */
// fetchDeleteCallID(API_OLX, cardID).then(console.log)
// fetchGetUser(API_OLX).then(console.log) /**дает данные user по 'key'  */
// fetchGetUserID(API_OLX, userId).then(console.log).catch(console.log) /**дает данные user по 'id'  */
// fetchGetFavorites(API_OLX).then(console.log)
// fetchPostAddFavoriteID(API_OLX,cardID).then(console.log) /*добавляет в избраное*/
// fetchDeleteFavoriteID(API_OLX,cardID).then(console.log) /*удаляет из избраного*/
// fetchGetOwn(API_OLX).then(console.log)
// fetchGetFind(API_OLX, searchFind).then(console.log)
// fetchGetSpecificCategory(API_OLX, myCategory).then(console.log) /**находит определённую категорию */
// fetchAuthenRefresh(API_OLX).then(console.log) /*обновляет 'key','refreshToken','sid'*/
// fetchAuthenRefresh(API_OLX).then(response => {
//     save('key', response.newAccessToken)
//     save('refreshToken', response.newRefreshToken)
//     save('sid', response.newSid)
// }) /*обновляет 'key','refreshToken','sid'*/
// fetchLogout(API_OLX).then(console.log) /*выход за Аккаунту и удаляет 'key'*/
// fetchCall(API_OLX, 2).then(render => document.querySelector('.cards').innerHTML = templateCard(render.trade)) /**тестовый фич для слайдера и т.д. */




/************************************************************************ ниже експерементальный код */

// прокрутка слайдов
const refs = getRefs();
refs.myAds.addEventListener('click', listenSlide);

function listenSlide (event)
{
    if (event.target.hasAttribute('data-slide')) { return slider(event) }
};


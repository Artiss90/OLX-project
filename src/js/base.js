import { API_OLX } from './url';
import getRefs from './refs';
import templateCard from '../templates/cardset.hbs';
import { load, save, remove } from './localStorage';
import { fetchCategory } from './fetch/fetchCategory'; /** */
import { fetchGetSpecificCategory } from './fetch/fetchGetSpecificCategory';
import { fetchRegistration } from './fetch/fetchRegistration'; /** */
import { fetchAuthenticationLogin } from './fetch/fetchAuthenticationLogin'; /** */
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
import { fetchPatchCall } from './fetch/fetchPatchCall'; /**немогу достучатся, скорей всего нужно применять на товаре созданым в своей учётке*/
import { fetchDeleteCallID } from './fetch/fetchDeleteCallID';
import { fetchAuthenRefresh } from './fetch/fetchAuthenRefresh';
import { cards } from './cards.js';
import slider from './sliderNew';

/***************************примеры данных для фетч */
const dataField = {
  /** заглушка*/
  title: 'Red Shirt',
  description: 'New red shirt, made from cotton',
  category: 'Trade',
  price: 0,
  phone: '+380000000000',
  imageUrls: ['string'],
};
const cardID = '5fd86775c298a200179c9404';
const newUser = {
  email: 'artwis669@gmail.com',
  password: 'Qwerty2020',
};
const searchFind = 'Developer';
const myCategory = 'transport';

fetchAuthenticationLogin(API_OLX, newUser).then(response => {
  save('refreshToken', response.refreshToken);
  save('sid', response.sid);
});
fetchAuthenticationLogin(API_OLX, newUser).then(response => {
  save('UserToken', response);
});
/************************************************************************ ниже експерементальный код */

// прокрутка слайдов
const refs = getRefs();
refs.myAds.addEventListener('click', listenSlide);

function listenSlide(event) {
  if (event.target.hasAttribute('data-slide')) {
    return slider(event);
  }
}

import { API_OLX } from './url';
import * as refs from './refs';
import templateCard from '../templates/card.hbs';
import fetchCategory from './fetch/fetchCategory';
import fetchRegistration from './fetch/fetchRegistration';
import fetchAuthenticationLogin from './fetch/fetchAuthenticationLogin';
import { fetchLogout } from './fetch/fetchLogout';

const newUser = {
    "email": "artiss@example.com",
    "password": "qwerty2020"
};
fetchCategory(API_OLX).then(console.log)
// fetchRegistration(API_OLX, newUser).then(console.log)
fetchAuthenticationLogin(API_OLX, newUser).then(response => localStorage.setItem('key', `${response.accessToken}`))
fetchAuthenticationLogin(API_OLX, newUser).then(console.log)
fetchLogout(API_OLX).then(console.log)
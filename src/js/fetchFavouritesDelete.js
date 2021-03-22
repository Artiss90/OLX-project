import { load } from './localStorage';

export async function fetchFavouritesDelete(url, id) {
  const key = load('key');
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      accept: 'application/json',
      Authorization: `${key}`,
    },
  };
  const response = await fetch(`${url}call/favourite/` + id, options);
  const responseJson = await response.json();
  return responseJson;
}

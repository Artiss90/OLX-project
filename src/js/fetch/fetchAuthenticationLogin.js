export default async function fetchAuthenticationLogin(url, dataRegistry) {
    const options = {
  method: 'POST',
  body: JSON.stringify(dataRegistry),
  headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'accept': 'application/json',
  },
}
    const response = await fetch(`${url}auth/login`,options);
    const responseJson = await response.json();
    
    return  responseJson
};
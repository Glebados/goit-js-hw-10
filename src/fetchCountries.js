export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,captail,population,flags,languages`
  )
    .then(res => res.json())
    .then(countries => {
      console.log(countries);
      return countries;
    })
    .catch(console.log)
    .finally(() => console.log('Запит звершено'));
}

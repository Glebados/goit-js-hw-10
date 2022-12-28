import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  refs.listEl.innerHTML = '';
  const country = refs.inputEl.value;
  if (country === '') {
    return;
  }

  fetchCountries(country)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.status) {
        Notify.failure('Oops, there is no country with that name');
        return;
      }
      if (countries.length == 1) {
        let languagesArr = [];

        Object.entries(countries[0].languages).forEach(el =>
          languagesArr.push(el[1])
        );

        const languages = languagesArr.join(', ');
        refs.listEl.insertAdjacentHTML(
          'beforeend',
          `
		 <li >
		 <img height="100" src="${countries[0].flags.png}"    />
		 <h2> 
		 ${countries[0].name.official}
		 </h2>
		 <h3> 
		 Capital: ${countries[0].capital}
		 </h3>
		 <h3> 
		 Population: ${countries[0].population}
		 </h3>
		 <h3> 
		 Languages: ${languages}
		 </h3>
		 </li>
		 `
        );
        return;
      }
      countries.forEach(el => {
        refs.listEl.insertAdjacentHTML(
          'beforeend',
          `
		<li class="country-item" >
		<img height="50" src="${el.flags.png}"    />
		<h2> 
		${el.name.official}
		</h2>
		</li>
		`
        );
      });
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

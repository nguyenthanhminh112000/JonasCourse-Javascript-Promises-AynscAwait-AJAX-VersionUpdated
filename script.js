'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////

function renderCountry(data) {
  const markup = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>${data.population}</span>POP people</p>
            <p class="country__row"><span>${data.languages[0].name}</span>LANG</p>
            <p class="country__row"><span>${data.currencies[0].code}</span>CUR</p>
          </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('afterbegin', markup);
}
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

function getJSON(url, errorMSG = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMSG} (${response.status})`);
    }
    return response.json();
  });
}
//////////////////////////////////////
// // ASYNCHRONOUS - CALLBACK

// function loadCountryAndNeighbor(country) {
//   // load country
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     //render country
//     renderCountry(data);
//     console.log(data);
//     //
//   });
// }
// loadCountryAndNeighbor(`vietnam`);

// // ASYNCHRONOUS - PROMISE
// function loadCountryAndNeighbor(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country cant found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       return fetch(
//         `https://restcountries.eu/rest/v2/alpha/${data[0].borders[0]}`
//       );
//     })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data);
//     })
//     .catch(err => {
//       console.error(`${err} :)))`);
//       renderError(`${err}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }

// function loadCountryAndNeighbor(country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     `Country not found`
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) throw new Error(`Doesnt have any neighbor`);
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${data[0].borders[0]}`,
//         `Country not found`
//       );
//     })
//     .then(data => {
//       renderCountry(data);
//     })
//     .catch(err => {
//       console.error(`${err} :)))`);
//       renderError(`${err} :)))`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }
// btn.addEventListener('click', function () {
//   loadCountryAndNeighbor('australia');
// });

// ////////////////////////////////////// Coding Challenge 1
// function whereAmI(latitude, longitude) {
//   fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Overload the request (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       //
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Cant find the country`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.log(`${err}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// }
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// whereAmI(`a`, `a`);

// //////////////////////////////////// THE EVENT LOOP IN PRACTICE
// console.log(`Test start`);
// setTimeout(() => {
//   console.log(`Set time out 0 second`);
// }, 0);
// Promise.resolve(`Promise 1`).then(data => {
//   console.log(data);
// });
// Promise.resolve(`Promise 2`).then(data => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(data);
// });
// console.log(`Test end`);

// //////////////////////////////////// THE EVENT LOOP IN PRACTICE
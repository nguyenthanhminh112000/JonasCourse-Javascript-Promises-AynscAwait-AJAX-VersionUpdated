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
  countriesContainer.style.opacity = 1;
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

// // //////////////////////////////////// BUILD A SIMPLE PROMISE
// setTimeout(() => {
//   console.log(`Set time out`);
// }, 0);

// const lotteryPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (Math.random() > 0.5) {
//       resolve(`You are the winner`);
//     } else {
//       reject(new Error(`You are the loser`));
//     }
//   }, 0);
// });

// lotteryPromise
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log(`I waited here at least 2 seconds`);
//     return wait(3);
//   })
//   .then(() => {
//     console.log(`I have waited here at least 3 seconds`);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// /////////////////////////// PROMISIFYING THE GEOLOCATION API
// navigator.geolocation.getCurrentPosition(
//   position => {
//     console.log(position);
//   },
//   err => {
//     console.error(err);
//   }
// );

// const getCurPosition = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         resolve(position);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// };

// function whereAmI() {
//   getCurPosition()
//     .then(position => {
//       const { latitude, longitude } = position.coords;
//       return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Overload the request (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
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
// btn.addEventListener('click', whereAmI);

///////////////////////////////// CODING CHALLENGE 2
// const wait = (seconds, node) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(node);
//     }, seconds * 1000);
//   });
// };
// const createImage = url => {
//   return new Promise((resolve, reject) => {
//     const imageNode = document.createElement('img');
//     imageNode.src = url;
//     imageNode.addEventListener('load', () => {
//       resolve(imageNode);
//     });
//     imageNode.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// const imgContainer = document.querySelector('.images');
// createImage('./img/img-1.jpg')
//   .then(imageNode => {
//     imgContainer.appendChild(imageNode);
//     return wait(2, imageNode);
//   })
//   .then(imageNode => {
//     imageNode.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(imageNode2 => {
//     imgContainer.appendChild(imageNode2);
//     return wait(2, imageNode2);
//   })
//   .then(imageNode2 => {
//     imageNode2.style.display = 'none';
//   })
//   .catch(err => {
//     console.error(err);
//   });

// ///////////////////////////////// CONSUME PROMISE WITH ASYNC-AWAIT
// const getCurPosition = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         resolve(position);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// };

// const whereAmI = async function () {
//   try {
//     const curCoordinates = await getCurPosition();
//     const { latitude: lat, longitude: long } = curCoordinates.coords;
//     const curCountryResponse = await fetch(
//       `https://geocode.xyz/${lat},${long}?geoit=json`
//     );
//     if (!curCountryResponse.ok) {
//       throw new Error(`Overload the request`);
//     }
//     const curCountryData = await curCountryResponse.json();
//     const countryResponse = await fetch(
//       `https://restcountries.eu/rest/v2/name/${curCountryData.country}`
//     );
//     if (!countryResponse.ok) {
//       throw new Error(`Country not found`);
//     }
//     const countryData = await countryResponse.json();
//     renderCountry(countryData[0]);
//     return `Im in ${curCountryData.city} city, ${curCountryData.country}`;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
// // whereAmI()
// //   .then(data => {
// //     console.log(`2 : ${data}`);
// //   })
// //   .catch(err => {
// //     console.error(`2: ${err}`);
// //   });
// console.log(`1 Begin`);
// (async function () {
//   try {
//     const data = await whereAmI();
//     console.log(`2 : ${data}`);
//   } catch (err) {
//     console.error(`2 : ${err.message}`);
//   }
// })();
// console.log(`3 End`);

// ///////////////////////////////// RUNNING PROMISES IN PARALLEL

// const whereAmI = async function (country) {
//   try {
//     const countryResponse = await fetch(
//       `https://restcountries.eu/rest/v2/name/${country}`
//     );
//     if (!countryResponse.ok) {
//       throw new Error(`Country not found`);
//     }
//     const countryData = await countryResponse.json();
//     return countryData;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
// const runPromiseInParallel = async function (c1, c2, c3) {
//   const countries = await Promise.all([
//     whereAmI(c1),
//     whereAmI(c2),
//     whereAmI(c3),
//   ]);
//   const capitals = countries.map(value => {
//     return value[0].capital;
//   });
//   console.log(capitals);
// };
// // whereAmI()
// //   .then(data => {
// //     console.log(`2 : ${data}`);
// //   })
// //   .catch(err => {
// //     console.error(`2: ${err}`);
// //   });
// console.log(`1 Begin`);
// runPromiseInParallel('Vietnam', 'China', 'Japan');
// console.log(`3 End`);

///////////////////////////////// PROMISE COMBINATORS
const whereAmI = async function (country) {
  try {
    const countryResponse = await fetch(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    if (!countryResponse.ok) {
      throw new Error(`Country not found`);
    }
    const countryData = await countryResponse.json();
    return countryData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const overtime = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long`));
    }, seconds * 1000);
  });
};
/////// Promise.race
(async function () {
  try {
    const data = await Promise.race([
      whereAmI('Vietnam'),
      whereAmI('China'),
      whereAmI('Japan'),
      overtime(0.1),
    ]);
    console.log(data[0]);
  } catch (err) {
    console.error(err);
  }
})();

///////// Promise.allSettled
(async function () {
  try {
    const result = await Promise.allSettled([
      Promise.resolve('Success'),
      Promise.reject('Error'),
      Promise.resolve('Another Success'),
    ]);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();

///////// Promise.any
(async function () {
  try {
    const result = await Promise.any([
      Promise.reject(new Error(`First Error`)),
      Promise.reject(new Error(`Second Error`)),
      Promise.resolve('Success1'),
      Promise.resolve('Success2'),
    ]);
    console.log(result);
  } catch (err) {}
})();

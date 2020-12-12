const ciudad = document.querySelector('.titulo');
const containerTitulo = document.querySelector('.container__titulo');
const fecha = document.querySelector('.fechayhora');
const containerResultadosCiudad = document.querySelector(
  '.container-resultados__datosciudad'
);

//Ubicación actual con geolocation y luego con geocode
const obtenerUbicacionActual = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err)
    );
  });
};

//Temperatura en celsius
const kelvinACelsius = function (k) {
  return Math.trunc(k - 273.15);
};

const celciusAFahrenheit = function (c) {
  return Math.trunc(k - 273.15);
};

//insertar al DOM la ciudad y la temperatura
const insertarDOM = function (data) {
  const html = `<h3 class="container-resultados__datosciudad--ciudad">${
    data.name
  }, ${data.sys.country}</h3>
      <div class="container-resultados__datosciudad--info">
        <p class="container-resultados__datosciudad--temperatura">${kelvinACelsius(
          data.main.temp
        )}ºC</p>
        
        <img class="container-resultados__datosciudad--icono" src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="">
        
        <div class="container-resultados_datosciudad--descripcion">
          <p class="container-resultados__datosciudad--descripcionclima">${
            data.weather[0].description
          }</p>
          <button class="container-resultados__datosciudad--descripcionbtn">ver en fahrenheit</button>
        </div>
      </div>
  `;
  // ciudad.textContent = `Usted está en la ciudad de ${data.name}, ${
  //   data.sys.country
  // }, la temperatura es:${kelvinACelsius(data.main.temp)} ºC`;
  containerResultadosCiudad.insertAdjacentHTML('beforeend', html);
};

//consulta clima
const clima = async function (lat, lon) {
  try {
    const resClima = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=ad226a44dedb3b77340424c5a27e237d`
    );

    if (!resClima.ok) throw new Error('Error en la busqueda del clima');
    const dataClima = await resClima.json();
    console.log(dataClima);
    insertarDOM(dataClima);
  } catch (err) {
    mostrarError(`${err.message}`);
  }
};

//Mostrar error
const mostrarError = function (msj) {
  ciudad.textContent = `${msj}`;
};

//consulta ciudad
const ciudadDondeEstoy = async function () {
  try {
    const pos = await obtenerUbicacionActual();
    const { latitude: lat, longitude: lon } = pos.coords;
    clima(lat, lon);
  } catch (err) {
    mostrarError(err);
  }
};
ciudadDondeEstoy();

//fecha hora y dia
const ahora = new Date();
const opciones = {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  year: 'numeric',
  minute: 'numeric',
};

//idioma

const idiomaLocal = navigator.language;

fecha.textContent = new Intl.DateTimeFormat(idiomaLocal, opciones).format(
  ahora
);

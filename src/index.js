import './style.scss';
import Store from './Storage/store';
import Weather from './utils/weather';
import Geofind from './utils/geocode';

const geocode = Geofind();
const weatherStore = Store.getlocation();
const weather = new Weather(weatherStore.latt, weatherStore.long);
window.geolocate = () => {
  geocode.getPositionCoord(weather);
};

document.addEventListener('DOMContentLoaded', geocode.getWeather(weather));

document.getElementById('location-search').addEventListener('submit', (e) => {
  const search = document.getElementById('search').value;
  geocode.getLocation(search, weather);


  e.preventDefault();
});

window.changeUnits = () => {
  const temp = document.querySelectorAll('.temp');
  const unitsBtn = document.querySelector('#unit-change');
  for (let i = 0, len = temp.length; i < len; i += 1) {
    const tempValue = temp[i];
    if (tempValue.textContent.indexOf('℃') !== -1) {
      const mainTemp = parseInt(tempValue.textContent.replace('℃', ''), 10);
      const sol = Math.round(((mainTemp / 5) * 9) + 32);
      tempValue.textContent = `${sol}°F`;
      unitsBtn.innerHTML = '<span class="text-secondary">℃</span> / <span>°F</span>';
    } else {
      const mainTemp = parseInt(tempValue.textContent.replace('°F', ''), 10);
      const sol = Math.round(((mainTemp - 32) / 9) * 5);
      tempValue.textContent = `${sol}℃`;
      unitsBtn.innerHTML = '<span>℃</span> / <span class="text-secondary">°F</span> ';
    }
  }
};
import axios from 'axios';
import Store from '../Storage/store';
import UI from '../UI/ui';

export default function Geofind() {
  const key = '04d4d495e39f2311c4acd1148b6e2130';

  const getWeather = (weather) => {
    weather.getWeather()
      .then((results) => {
        UI.displayWeather(results);
        UI.backgroundCheck(results);
      })
      .catch((err) => UI.showAlert(err, 'alert-danger'));
  };

  const getLocation = (city, weather) => {
    const address = city.replace(' ', '+');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${key}`,
      )
      .then((res) => {
        weather.changeLocation(res.data.coord.lat, res.data.coord.lon);
        Store.setLocation(res.data.coord.lat, res.data.coord.lon);
        getWeather(weather);
      })
      .catch((err) => {
        if (err.response) {
          UI.showAlert(err.response.data.message, 'alert-danger');
        } else if (err.request) {
          UI.showAlert('Connectivity Error', 'alert-danger');
        } else {
          UI.showAlert('Error', 'alert-danger');
        }
      });
  };

  const getPosition = (options) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  const getPositionCoord = (weather) => {
    getPosition()
      .then((position) => {
        weather.changeLocation(position.coords.latitude, position.coords.longitude);
        Store.setLocation(position.coords.latitude, position.coords.longitude);
        getWeather(weather);
      })
      .catch((err) => {
        UI.showAlert(err.message, 'alert-danger');
      });
  };

  return {
    getWeather,
    getLocation,
    getPositionCoord,
  };
}

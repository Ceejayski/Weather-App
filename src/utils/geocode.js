import axios from 'axios';
import Store from '../Storage/store';
import UI from '../UI/ui';

export default class Geofind {
  constructor() {
    this.key = '04d4d495e39f2311c4acd1148b6e2130';
  }

  getWeather(weather) {
    weather.getWeather()
      .then((results) => {
        UI.displayWeather(results);
        UI.backgroundCheck(results);
      })
      .catch((err) => UI.showAlert(err, 'alert-danger'));
  }


  getLocation(city, weather) {
    const address = city.replace(' ', '+');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${this.key}`,
      )
      .then((res) => {
        weather.changeLocation(res.data.coord.lat, res.data.coord.lon);
        Store.setLocation(res.data.coord.lat, res.data.coord.lon);
        this.getWeather(weather);
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
  }

  getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  getPositionCoord(weather) {
    this.getPosition()
      .then((position) => {
        weather.changeLocation(position.coords.latitude, position.coords.longitude);
        Store.setLocation(position.coords.latitude, position.coords.longitude);
        this.getWeather(weather);
      })
      .catch((err) => {
        UI.showAlert(err.message, 'alert-danger');
      });
  }
}

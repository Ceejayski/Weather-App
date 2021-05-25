import axios from "axios";
import Store from "../Storage/store";
import UI from "../UI/ui";
import Weather from "./weather";

export default class Geofind {
  constructor(city) {
    this.key = "04d4d495e39f2311c4acd1148b6e2130";
  }

  getWeather(weather) {
    weather.getWeather()
      .then(results => {
        UI.displayWeather(results);
      })
      .catch(err => console.log(err));
    }


  getLocation(city, weather) {
    const address = city.replace(" ", "+");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${this.key}`
      )
      .then((res) => {
        weather.changeLocation(res.data.coord.lat, res.data.coord.lon);
        Store.setLocation(res.data.coord.lat, res.data.coord.lon);
        this.getWeather(weather)
      })
      .catch((err) => {
          if(err.response){
              console.log(err.response.data)
              UI.showAlert(err.response.data.message, 'alert-danger')
          }else if(err.request){
              UI.showAlert('Connectivity Error', 'alert-danger')
          }else{
            UI.showAlert('Error', 'alert-danger')
            console.log(err)
          }
      });
  }

  
}

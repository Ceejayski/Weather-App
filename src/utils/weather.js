export default class Weather {
  constructor(lat, lon) {
    this.apiKey = '04d4d495e39f2311c4acd1148b6e2130';
    this.lat = lat;
    this.lon = lon;
    this.units = 'metric';
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  changeMetric() {
    if (this.units === 'metric') {
      this.units = 'imperial';
    } else {
      this.units = 'metric';
    }
  }
}

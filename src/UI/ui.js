import moment from 'moment';

export default class UI {
  static ktoC(deg) {
    return `${Math.round(deg - 273.15)}℃`;
  }


  static getIcon(icon) {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

  static getTime(timestamp) {
    const time = new Date(timestamp);

    return time.getHours();
  }

  static displayWeather(data) {
    const container = document.querySelector('.container');
    const curr = document.createElement('div');
    const current = document.createElement('div');
    current.className = 'current d-flex text-center py-4';
    const currentWeather = document.createElement('div');

    currentWeather.className = 'current-weather';
    currentWeather.innerHTML = ` 
            <h4 class="fs-3 text">${data.timezone.replace('/', ' ')}</h4>
            <p>${data.current.weather[0].main}</p>
            <p class="temp">${this.ktoC(data.current.temp)}</p>
            <div>  <img src='${this.getIcon(
    data.current.weather[0].icon,
  )}' alt='${data.current.weather[0].icon}' /> </div>
            <p> Pressure: ${data.current.pressure}  Humidity: ${
  data.current.humidity
}  </p>
        `;

    const todayhourlyWeather = document.createElement('div');
    todayhourlyWeather.className = 'hourly-weather d-flex';
    data.hourly.forEach((hour) => {
      const present = new Date().getHours();
      const time = parseInt(moment.unix(hour.dt).format('HH'), 10) === present
        ? 'Now'
        : moment.unix(hour.dt).format('HH');

      const hourWeather = document.createElement('div');
      hourWeather.className = 'px-3 hourly';
      hourWeather.innerHTML = `
            <h4 class="fs-4 text">${time}</h4>
            <p>${hour.weather[0].main}</p>
            <p class="temp">${this.ktoC(hour.temp)}</p>
            <div>  <img src='${this.getIcon(hour.weather[0].icon)}' alt='${
  hour.weather[0].icon
}' /> </div>
            `;
      todayhourlyWeather.appendChild(hourWeather);
    });
    current.appendChild(currentWeather);
    current.appendChild(todayhourlyWeather);
    curr.appendChild(current);
    const dailyCont = document.createElement('div');
    const dailyWeather = document.createElement('table');
    dailyWeather.className = 'daily-weather';
    dailyWeather.innerHTML = `<tr>
        <th>Day</th>
        <th>Weather</th>
        <th>Chance of Rain</th>
        <th>Temperature</th>
        </tr>`;

    for (let i = 1; i < data.daily.length - 1; i += 1) {
      const dayWeather = data.daily[i];
      let day = moment.unix(dayWeather.dt).format('dddd');

      if (i === 1) {
        day = 'Tomorrow';
      }

      const daily = document.createElement('tr');
      daily.className = 'daily';
      daily.innerHTML = `
                
                    <td> ${day}</td>
                    <td> <img src='${this.getIcon(
    dayWeather.weather[0].icon,
  )}' alt='${dayWeather.weather[0].icon}' /> </td>
                    <td> ${Math.round(dayWeather.pop * 100)}% </td>
                    <td class="temp"> ${this.ktoC(dayWeather.temp.day)} </td>
            `;
      dailyWeather.appendChild(daily);
    }
    dailyCont.appendChild(dailyWeather);

    container.innerHTML = curr.innerHTML + dailyCont.innerHTML;
  }

  static showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.alertTab');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

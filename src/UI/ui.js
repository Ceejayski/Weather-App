import moment from 'moment';

export default class UI {
  static ktoC(deg) {
    return `${Math.round(deg - 273.15)}℃`;
  }

  static tempCon(temp) {
    if (temp < 20) {
      return 'Cool';
    } if (temp > 20 && temp < 30) {
      return 'Warm';
    }
    return 'Hot';
  }

  static getIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  static getTime(timestamp) {
    const time = new Date(timestamp);

    return time.getHours();
  }

  static setAttributes(el, attrs) {
    for (const key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
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
            <p>${data.current.weather[0].description}</p>
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
            <p>${hour.weather[0].description}</p>
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

  static backgroundCheck(data) {
    const video = document.getElementById('myVideo');
    const bgText = document.querySelector('.bgText');
    const source = document.createElement('source');

    if (
      data.current.weather[0].main === 'Rain'
      || data.current.weather[0].main === 'Thunderstorm'
      || data.current.weather[0].main === 'Drizzle'
    ) {
      this.setAttributes(source, {
        src: 'https://res.cloudinary.com/dsxio8q2p/video/upload/v1622018970/weather/Pexels_Videos_2491284_rhjzwd.mp4',
        type: 'video/mp4',
      });
    } else if (data.current.weather[0].main === 'Snow') {
      this.setAttributes(source, {
        src: 'https://res.cloudinary.com/dsxio8q2p/video/upload/v1622018958/weather/Video_Of_Snowfall_vapo4b.mp4',
        type: 'video/mp4',
      });
    } else if (data.current.weather[0].main === 'Clear') {
      this.setAttributes(source, {
        src: 'https://res.cloudinary.com/dsxio8q2p/video/upload/v1622018951/weather/Footage_Of_Sunlight_uklrdp.mp4',
        type: 'video/mp4',
      });
    } else if (data.current.weather[0].main === 'Clouds') {
      this.setAttributes(source, {
        src: 'https://res.cloudinary.com/dsxio8q2p/video/upload/v1622018945/weather/Formation_Of_Clouds_nqtfed.mp4',
        type: 'video/mp4',
      });
    } else {
      this.setAttributes(source, {
        src: 'https://res.cloudinary.com/dsxio8q2p/video/upload/v1622022879/weather/production_ID_5176464_tdojr9.mp4',
        type: 'video/mp4',
      });
    }
    video.appendChild(source);
    const day = moment.unix(data.current.dt).format('dddd');
    const city = data.timezone.split('/')[1].replace('_', ' ');
    const pop = Math.round(data.hourly[0].pop * 100);
    bgText.innerHTML = `
      <h3> <img src='${this.getIcon(data.current.weather[0].icon)}' alt='${
  data.current.weather[0].icon
}' /> ${data.timezone.replace('/', ' ')}</h3>
      <p>
        It is a ${this.tempCon(
    data.current.temp - 273.15,
  )} ${day} here in ${city} with a temperature of ${this.ktoC(
  data.current.temp,
)} and with ${
  data.current.weather[0].description
}  weather description, ${city}'s current Humidity is ${data.current.humidity} with a wind gust and speed of ${
  data.current.wind_gust=== undefined ? 0 : data.current.wind_gust
} and ${data.current.wind_speed} respectively and a ${pop}% chance of rain in the next hour.
      </p>
    `;
  }
}

export default class Store {
  static getlocation() {
    let lat;
    let lon;
    if (localStorage.getItem('lat') === null) {
      lat = 6.429840899999999;
    } else {
      lat = localStorage.getItem('lat');
    }

    if (localStorage.getItem('lon') === null) {
      lon = 3.4600046;
    } else {
      lon = localStorage.getItem('lon');
    }

    return { latt: parseInt(lat, 10), long: parseInt(lon, 10) };
  }

  static setLocation(lat, long) {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', long);
  }
}
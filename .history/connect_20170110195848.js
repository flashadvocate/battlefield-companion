const request = require('request');

let signinURL = ''
request({
  url: 'https://www.battlefield.com/login?postAuthUri=/companion',
  maxRedirects: 5,
  followRedirect: (data) => {
    const location = data.toJSON().headers.location;
    if (location.indexOf('signin.ea.com') !== -1) {
      signinURL = location;
      return false;
    }
    return true;
  }
}, (error, response, body) => {
  console.log(response.toJSON())
})
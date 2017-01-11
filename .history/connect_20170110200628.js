const request = require('request');

function getLoginURL(cb) {
  request({
    url: 'https://www.battlefield.com/login?postAuthUri=/companion',
    maxRedirects: 5,
    followRedirect: (data) => {
      const location = data.toJSON().headers.location;
      return (location.indexOf('https://signin.ea.com/p/web/login?execution=e279826723s1') === -1)
    }
  }, (error, response, body) => {
    console.log(cb);
    if (!error) cb(response.toJSON().headers.location)
  })
}

getLoginURL((loginURL) => {
  console.log(loginURL);
  request({
    method: 'POST',
    url: loginURL,
    form: {
      '_eventId': 'submit',
      'password': '01242011aA',
      'email': 'contact@mattmcfarland.com'
    }
  }, (error, response, body) => {
    console.log(response.toJSON());
  })
})

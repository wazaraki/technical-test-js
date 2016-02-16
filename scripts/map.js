
'use strict';
(() => {

  const rev = s => s.split('').reverse().join('');
  const tokenUrl = rev('nekot/1v/moc.ppaukoreh.tsetxof//:sptth');
  const markersUrl = rev('sreffo/1v/moc.ppaukoreh.tsetxof//:sptth');
  const username = rev('xofacol');
  const password = rev('!sex#FacoL');
  const authData = new Headers({
    'Authorization': 'Basic ' + btoa(username + ':' + password),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  });
  let mapDom = document.querySelector('.map-container');
  let mapCanvas = new google.maps.Map(mapDom, {
    center: {lat: 52.516843, lng: 13.383301}, // Berlin coords
    zoom: 11
  });


  // The token is requested only once per load
  // No need to detect if the token is present
  getToken()
    .then(getMarkers)
    .then(drawMarkers);


  // Request token with Basic Authentication
  // Returns a promise that resolves to a token string
  function getToken () {
    return fetch(tokenUrl, {
      method: 'POST',
      headers: authData
    })
    .then(response => response.json())
    .then(data => data.token)
    .catch(err => console.error('Error getting token :('));
  }


  // Load the markers from server
  // Receives a token string
  // Returns a promise that resolves to a markers array
  function getMarkers (token) {
    return fetch(markersUrl, {
      method: 'POST',
      headers: authData,
      body: 'token='+token
    })
    .then(response => response.json())
    .catch(err => console.error('Error getting markers :('));
  }


  // Put the markers on the map canvas
  // Translates the marker json data into marker instances
  // and returns the resulting array
  function drawMarkers (newMarkers) {
    return newMarkers.map(({lat, long}) => new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: mapCanvas
    }));
  }

})();

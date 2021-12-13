fetch('https://api.bluelytics.com.ar/v2/latest')
      .then(response => response.json())
      .then(json => console.log(json.blue));





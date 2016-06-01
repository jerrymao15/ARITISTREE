'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
var norepeats = []

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  norepeats = [];
  res.set({
    'content-type': 'text/html',
    'charset': 'UTF-8'
  });
  res.status(200).sendFile(`/index.html`)
})



app.get('/artist/:artist', (req, res) => {
  if (norepeats.length === 0) norepeats.push(req.params.artist);
  request(`https://api.spotify.com/v1/search?q=${req.params.artist}&type=artist&limit=1`, (err, response, html) => {
    const artistID = JSON.parse(html).artists.items[0].id;
    request(`https://api.spotify.com/v1/artists/${artistID}/related-artists?q=limit=3`, (err2, response2, html2) => {
      const related = [];
      for (let i = 0; related.length < 3 && JSON.parse(html2).artists[i]; i++) {
        let musicppl = JSON.parse(html2).artists[i].name;
        if (norepeats.indexOf(musicppl)=== -1) {
          related.push({artist: musicppl, children: []});
          norepeats.push(musicppl)
        }
      }
      res.send(JSON.stringify(related))
      res.end();
    })
  })
})




app.listen(3000, () => {
  console.log('listening on 3000....');
});

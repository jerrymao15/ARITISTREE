'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require('request');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const app = express();
const PORT = 3000;
const DEVPORT = 9090;
const artistInfo = {};
const norepeats = [];

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
app.use(cors());
app.use(express.static(path.join(__dirname, './../')));



app.get('/artist/:artist', (req, res) => {
  const currentArtist = req.params.artist;
  if (norepeats.length === 0) norepeats.push(currentArtist);
  if (!artistInfo[currentArtist]) {
    artistInfo[currentArtist] = {};
    new Promise((resolve, reject) => {
      request(`https://api.spotify.com/v1/search?q=${currentArtist}&type=artist&limit=1`, (err, response, html) => resolve(html));
    })
    .then(info => {
      const spotifyInfo = JSON.parse(info).artists.items[0];
      artistInfo[currentArtist].name = spotifyInfo.name;
      artistInfo[currentArtist].id = spotifyInfo.id;
      artistInfo[currentArtist].genres = spotifyInfo.genres;
      artistInfo[currentArtist].imageURL = spotifyInfo.images[0].url;
      return getRelated(artistInfo[currentArtist].id);
    }, rej => { throw new Error(`Cannot find aritst ${currentArtist}!`); })
    .then(fufill => {
      artistInfo[currentArtist].related = fufill;
      res.send(JSON.stringify(artistInfo[currentArtist]));
      res.end();
    });
  } else {
    res.send(JSON.stringify(artistInfo[currentArtist]));
    res.end();
  }
});

// app.get('info/:artist', (req, res) => {
//   request(`http://api.spotify.com/v1/search/${}/`)
// })

app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(path.join(__dirname, '/client/app.js'));
  } else {
    res.redirect(`//localhost:${DEVPORT}/client/app.js`);
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(path.join(__dirname, '/client/style.css'));
  } else {
    res.redirect(`//localhost:${DEVPORT}/client/style.css`);
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
  // res.sendFile(__dirname + '/index.html');
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(DEVPORT, 'localhost', (err, result) => {
  if (err) console.log(err);
  console.log('webpack dev server started');
});

function getRelated(id) {
  return new Promise((resolve, reject) => {
    request(`https://api.spotify.com/v1/artists/${id}/related-artists`, (err, res, html) => resolve(JSON.parse(html).artists.map(ele => ele.name)));
  });
}

function formatData(arr) {
  const related = [];
  for (let i = 0; related.length < 3 && i < arr.length; i++) {
    const current = arr[i];
    if (norepeats.indexOf(current) === -1) {
      related.push({ artist: current, children: [] });
      norepeats.push(current);
    }
  }
  return related;
}
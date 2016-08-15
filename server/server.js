'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require('request');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
import { Artist, Album, Track } from './classes';

const app = express();
const PORT = 3000;
const DEVPORT = 9090;
const artistInfo = {};

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
app.use(cors());
app.use(express.static(path.join(__dirname, './../')));



app.get('/artist/:artist', (req, res) => {
  const currentArtist = req.params.artist.toLowerCase();
  if (!artistInfo[currentArtist]) {
    new Promise((resolve, reject) => {
      request(`https://api.spotify.com/v1/search?q=${currentArtist}&type=artist&limit=1`, (err, response, html) => resolve(html));
    })
    .then(info => {
      artistInfo[currentArtist] = new Artist(JSON.parse(info).artists.items[0]);
      return getRelated(artistInfo[currentArtist].id);
    }, rej => { throw new Error(`Cannot find artist ${currentArtist}!`); })
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

app.get('/info/:artist', (req, res) => {
  const artistID = artistInfo[req.params.artist.toLowerCase()].id;
  console.log(artistID, 'artistId');
  Promise.all([getAlbums(artistID), getTopTracks(artistID)])
  .then(fufill => {
    res.send(JSON.stringify(fufill));
    res.end();
  });
});

app.get('/src/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(path.join(__dirname, '/src/bundle/app.js'));
  } else {
    res.redirect(`//localhost:${DEVPORT}/src/bundle/app.js`);
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

function getAlbums(id) {
  return new Promise((resolve, reject) => {
    request(`https://api.spotify.com/v1/artists/${id}/albums?market=US`, (err, res, html) => resolve(JSON.parse(html).items.map(ele => new Album(ele))));
  });
}

function getTopTracks(id) {
  return new Promise((resolve, reject) => {
    request(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`, (err, res, html) => resolve(JSON.parse(html).tracks.map(ele => new Track(ele))));
  })
}

// class Spotify {
  
// }

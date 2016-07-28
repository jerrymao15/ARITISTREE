'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const request = require('request');
const server = app.listen(3000, () => {console.log('listening on 3000...');});
let norepeats = [];

app.use(cors());
app.use(express.static(path.join(__dirname, './../')));


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

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

app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/client/app.js');
  } else {
    res.redirect('//localhost:9090/client/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/client/style.css');
  } else {
    res.redirect('//localhost:9090/client/style.css');
  }
});

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'))
  // res.sendFile(__dirname + '/index.html');
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(9090, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('webpack dev server started');
});
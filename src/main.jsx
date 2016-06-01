'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/Node.jsx';
import SearchStart from './components/SearchStart.jsx';
import {ajax} from 'jquery';
import cloneDeep from './cloneDeep.js';
import treepls from './tree.js'

treepls();
class ArtistTree extends React.Component {
  constructor() {
    this.state = {
      artist: '',
      first: '',
      clicked: false,
      children: []
     };
    this.bfsFindAndAdd = this.bfsFindAndAdd.bind(this);
    this.findArtist = this.findArtist.bind(this);
    this.getFirst = this.getFirst.bind(this);
    this.submittingMang = this.submittingMang.bind(this);
  }

  bfsFindAndAdd(compare, children) {
    let temp = cloneDeep(this.state);
    temp.clicked = true;
    function helper(node) {
      const queue = [];
      let next = node;
      while (next) {
        if (next.artist === compare) {
          next.clicked = true;
          return next.children = children;
        }
        next.children.map(child => {
          queue.push(child);
        });
        next = queue.shift();
      }
    }
    helper(temp);
    this.setState(temp);
  }

  findArtist (e) {
    this.setState({first: e.target.value})
  }

  getFirst(e) {
    e.preventDefault();
    this.setState({artist: this.state.first, first: ''});
  }

  submittingMang (artist, e, id) {
    let that = this.bfsFindAndAdd;
    $.ajax({
      url: `http://localhost:3000/artist/${artist}`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json'
    })
    .done(homies => {
      that(artist, homies);
    })
    .fail(function() {
      console.log("error");
    });
  }

  render() {

    return (
      <div>
        <SearchStart
          value = {this.state.first}
          findArtist = {this.findArtist}
          homies = {this.state.homies}
          getFirst = {this.getFirst}
          id ="search"
          />

        <Node
          artist = {this.state.artist}
          children = {this.state.children}
          clicked = {this.state.clicked}
          submittingMang = {this.submittingMang}
          />

      </div>
    )
  }
}

ReactDOM.render(
  <ArtistTree />,
  document.getElementById('content')
)

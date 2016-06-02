'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/Node.jsx';
import SearchStart from './components/SearchStart.jsx';
import {ajax} from 'jquery';
import cloneDeep from './cloneDeep.js';
import Tree from './components/Tree.jsx';
import FauxTree from './components/FauxTree.jsx'
import ReactFauxDOM from 'react-faux-dom';

class ArtistTree extends React.Component {
  constructor() {
    this.state = {
      first: '',
      treeData: {
        artist:'',
        clicked: false,
        children: []
      }
     };
    this.bfsFindAndAdd = this.bfsFindAndAdd.bind(this);
    this.findArtist = this.findArtist.bind(this);
    this.getFirst = this.getFirst.bind(this);
    this.submittingMang = this.submittingMang.bind(this);
  }

  bfsFindAndAdd(compare, children) {
    let temp = this.state.treeData;
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
    this.setState({treeData: temp});
  }

  findArtist (e) {
    this.setState({first: e.target.value})
  }

  getFirst(e) {
  const firsta = this.state.first;
  console.log(firsta);
  e.preventDefault();
  this.setState({treeData: {artist: firsta, children: []}, first: ''});
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
          getFirst = {this.getFirst}
          submittingMang = {this.submittingMang}
          id ="search"
          />

        <Node
          _data = {this.state.treeData}
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

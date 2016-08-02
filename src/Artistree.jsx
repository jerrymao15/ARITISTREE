import React from 'react';
import SearchStart from './components/SearchStart.jsx';
import Tree from './components/Tree.jsx';
import Node from './components/Node.jsx';
import 'whatwg-fetch';


class Artistree extends React.Component {
  constructor() {
    super();
    this.state = {
      first: '',
      treeData: {},
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
    this.setState({ treeData: temp });
  }

  findArtist(e) {
    this.setState({ first: e.target.value });
  }

  getFirst(e) {
    const firsta = this.state.first;
    e.preventDefault();
    this.setState({ treeData: { artist: firsta, children: [] }, first: '' });
  }

  submittingMang(artist, e, id) {
    const init = { method: 'GET' };
    fetch(`http://localhost:3000/artist/${artist}`, init)
      .then(res => { return res.json(); })
      .then(json => { this.bfsFindAndAdd(artist, json); })
      .catch(err => { console.log('GET error'); });
  }

  render() {
    return (
      <div>
        <h1>artistree</h1>
        <SearchStart
          value= {this.state.first}
          findArtist={this.findArtist}
          getFirst ={this.getFirst}
          id="search"
        />
        <Tree
          treeData={this.state.treeData}
          submittingMang={this.submittingMang}
        />
      </div>
    );
  }
}


export default Artistree;

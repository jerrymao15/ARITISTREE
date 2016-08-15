import React from 'react';
import SearchStart from './components/SearchStart.jsx';
import Tree from './components/Tree.jsx';
import CurrentSong from './components/CurrentSong.jsx';
import 'whatwg-fetch';


class Artistree extends React.Component {
  constructor() {
    super();
    this.state = {
      first: '',
      treeData: {},
      artists: {},
      selected: null,
    };
    this.bfsFindAndAdd = this.bfsFindAndAdd.bind(this);
    this.findArtist = this.findArtist.bind(this);
    this.getFirst = this.getFirst.bind(this);
    this.submittingMang = this.submittingMang.bind(this);
    this.formatData = this.formatData.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

  getFirst(e) {
    const firsta = this.state.first;
    e.preventDefault();
    this.setState({ treeData: { artist: firsta, children: [] }, first: '' });
  }

  bfsFindAndAdd(compare, children) {
    const temp = Object.assign({}, this.state.treeData);
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

  submittingMang(artist, e, id) {
    const init = { method: 'GET' };
    fetch(`http://localhost:3000/artist/${artist}`, init)
      .then(res => res.json())
      .then(result => {
        const newArtist = {};
        newArtist[result.name] = result;
        this.setState({ artists: Object.assign({}, this.state.artists, newArtist) });
        return this.formatData(result.related, result.name);
      })
      .then(json => { this.bfsFindAndAdd(artist, json); })
      .catch(err => { console.log(`GET error with ${artist}`); });
  }

  formatData(arr) {
    const related = [];
    for (let i = 0; related.length < 3 && i < arr.length; i++) {
      const current = arr[i];
      if (!this.state.artists[current]) {
        related.push({ artist: current, children: [] });
      }
    }
    return related;
  }

  selectArtist(artist, e, id) {
    const init = { method: 'GET' };
    fetch(`http://localhost:3000/info/${artist}`, init)
      .then(res => res.json());
    return this.setState({ selected: artist });
  }

  render() {
    const divStyle = {
      width: window.innerWidth,
      maxWidth: '1500px',
      display: 'flex',
      margin: 'auto',
      flexDirection: 'column',
    };
    const secondDivStyle = {
      display: 'flex',
      flexDirection: 'row',
    };
    return (
      <div style={divStyle} id="artistree">
        <h1>artistree</h1>
        <SearchStart
          value={this.state.first}
          findArtist={this.findArtist}
          getFirst={this.getFirst}
          id="search"
        />
        <div style={secondDivStyle}>
          <Tree
            treeData={this.state.treeData}
            submittingMang={this.submittingMang}
            selectArtist={this.selectArtist}
          />
          <CurrentSong
            selected={this.state.selected}
          />
        </div>
      </div>
    );
  }
}


export default Artistree;


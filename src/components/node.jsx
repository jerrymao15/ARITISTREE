'use strict';
import React from 'react';



class Node extends React.Component {

  handleClick() {
    if (!this.props._data.clicked) {
      this.props.submittingMang(this.props._data.artist)
    }
  }

  render() {
    console.log(this.props);
    var renderArr = [];
    if (this.props._data.children) {
      renderArr = this.props._data.children.map(ele => {
        return (
          <Node
            artist = {ele.artist}
            children = {ele.children}
            submittingMang = {this.props.submittingMang}
            clicked = {ele.clicked}
            />
        )
      });
    }

    return (
      <div>
        <div className = "artist-nodes" onClick = {this.handleClick.bind(this)}>
          {this.props._data.artist}
        </div>
        { renderArr }
      </div>
    )
  }

}


export default Node;

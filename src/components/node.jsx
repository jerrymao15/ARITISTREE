'use strict';
import React from 'react';



class Node extends React.Component {

  handleClick() {
    if (!this.props.clicked) {
      this.props.submittingMang(this.props.artist)
    }
  }

  render() {
    var renderArr = [];
    if (this.props.children) {
      renderArr = this.props.children.map(ele => {
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
          {this.props.artist}
        </div>
        { renderArr }
      </div>
    )
  }

}


export default Node;

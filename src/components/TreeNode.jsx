'use strict';
import React from 'react';



class TreeNode extends React.Component {

  componentDidMount() {
    //enter code
    //wrap component in d3?
  }

  shouldComponentUpdate() {

  }

  componentDidUpdate() {
    //update code
  }

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

    const gStyle = {

    }
    const circleStyle = {
      r=50
    };
    const textStyle = {};


    return (
      <g className="node">
        <circle/>
        <text>
      </g>
    )
  }

}


export default TreeNode;

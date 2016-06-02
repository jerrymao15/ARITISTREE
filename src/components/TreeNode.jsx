'use strict';
import React from 'react';



class TreeNode extends React.Component {

  handleClick() {
    if (!this.props.clicked) {
      this.props.submittingMang(this.props.artist)
    }
  }

  componentDidMount() {
    //enter code
    //wrap component in d3?
  }



  componentDidUpdate() {
    //update code
  }


  render() {
    const gStyle = {
      container: {
        transform: `translate(${this.props.x}, ${this.props.y})`
      }
    }
    const circleStyle = {
      container: {
        r:50
      }
    };
    // const textStyle = {
    //   fill-opacity:1
    // };

    return (
      <div className="node-div">
        <g className="node" onClick={this.handleClick.bind(this)} style={gStyle}>
          <circle style={circleStyle} />
          <text>
            {this.props.artist}
          </text>
        </g>
      </div>
    )



    // return (
    //   <div>
      // <g className="node"
      //   transform={`translate(${this.props.x}, ${this.props.y})`}
      //   >
      //   <circle style={circleStyle}/>
      //   <text text-anchor="middle">
      //     {this.props.artist}
      //   </text>
      // </g>
  //     </div>
  //   )
  }

}


export default TreeNode;

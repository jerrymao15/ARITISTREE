'use strict';
import React from 'react';
import TreeNode from './TreeNode.jsx'
import ReactFauxDOM from 'react-faux-dom';

const treeData = {
  artist:'Kanye West',
  children: [{artist:'JAY-Z',children:[]}, {artist:'Kid Cudi',children:[]}, {artist:'Mos Def',children:[]}]
}

class Tree extends React.Component {
  constructor() {
    this.state = {};
    this.drawNodes = this.drawNodes.bind(this);
  }



  componentDidMount() {
    const finnaState = {}
    this.margin = {
      top: 120,
      right: 120,
      bottom: 20,
      left: 120
    };
    this.width = (1000 - this.margin.right - this.margin.left);
    this.height = (1200 - this.margin.top - this.margin.bottom);
    this.tree = d3.layout.tree().size([this.height, this.width]);


    finnaState.svgWidth = this.width;
    finnaState.svgHeight = this.height;
    // finnaState.nodes = this.tree.nodes(this.props.data).reverse();
    // finnaState.link =  this.tree.links(this.tree.nodes(this.props.data).reverse());
    finnaState.nodes = this.tree.nodes(treeData).reverse();
    finnaState.link =  this.tree.links(this.tree.nodes(treeData).reverse());
    finnaState.svgTransform = `translate(${this.margin.left}, ${this.margin.top})`

    this.setState(finnaState)

  }

  // componentDidMount() {
  //   const didMount = {};
  // }

  drawNodes() {
    if (this.state.nodes) {
      const nodes = this.state.nodes.map((node, i) => {
        return (
          <TreeNode
            key = {i}
            hasChildren = {node.children ? true: false}
            artist={node.artist}
            x={node.x}
            y={node.y}
            dx={node.dx}
            dy={node.dy}
            submittingMang = {this.props.submittingMang}
            />
        )
      })
      return nodes;
    }
  }

  render() {
    const svgStyle = {
      container: {
        transform: this.state.svgTransform
      }
    };

    return (
      <div>
        <svg
          style={svgStyle}
          width={this.state.svgWidth}
          height={this.state.svgHeight}
          >
          {this.drawNodes()}
        </svg>
      </div>


    )


  }


}

export default Tree;

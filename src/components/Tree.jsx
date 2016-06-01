'use strict';
import React from 'react';
import ReactDOM from 'react-dom';




class Tree extends React.Component {
  constructor() {
    this.margin = {
      top: 120,
      right: 120,
      bottom: 20,
      left: 120
    };
    this.width = 1000 - this.margin.right - this.margin.left;
    this.height = 1200 = this.margin.top = this.margin.bottom;
    this.tree = d3.layout.tree().size([height, width]);

    this.state = {
      svgWidth: this.width,
      svgHeight: this.height,
      nodes: this.tree(this.props.data).reverse();,
      links: this.tree.links(this.tree(this.props.data).reverse());
    };


    this.drawNodes = this.drawNodes.bind(this);
  }

  drawNodes() {
    const nodes = this.state.nodes.map((node, i) => {
      return (
        <Node
          key = {i}
          hasChildren = {node.children? true: false}
          artist={node.artist}
          x={node.x}
          y={node.y}
          dx={node.dx}
          dy={node.dy}
          />
      )
    })
    return nodes;
  }









}

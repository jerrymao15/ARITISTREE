'use strict';
import React from 'react';
import TreeNode from './TreeNode.jsx'
import ReactFauxDOM from 'react-faux-dom';

const treeData = {
  artist:'Kanye West',
  children: [{artist:'JAY-Z',children:[{artist:'JAY-Z',children:[]}]}, {artist:'Kid Cudi',children:[]}, {artist:'Mos Def',children:[]}]
}

class FauxTree extends React.Component {
  constructor() {
    this.state = {};
  }

  render() {
    const faux = new ReactFauxDOM.Element('div');
    const margin = {
      top: 120,
      right: 120,
      bottom: 20,
      left: 120
    },
    width = 1000 - margin.right - margin.left,
    height = 1200 - margin.top - margin.bottom;

    let i = 0

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal()
    .projection(d => {return [d.x, d.y];});

    let svg = d3.select(faux).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    update(this.state._data);

    function update(source) {

      const nodes = tree.nodes(source).reverse(),
      links = tree.links(nodes);

      nodes.forEach(d => {d.y = d.depth * 250});

      const node = svg.selectAll('g.node')
      .data(nodes, d => {return d.id || (d.id = ++i);});

      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        return `translate(${d.x}, ${d.y})`;
      })

      nodeEnter.append('circle')
      .attr("r", 50);

      nodeEnter.append("text")
      .attr("y", d => {
        return d.children || d._children ? 0 : 0; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => { return d.artist; })
        .style("fill-opacity", 1);

        const link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

        link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);
      }
    return (
      <div>
        {faux.toReact()}
      </div>
    )

  }


}

export default FauxTree;

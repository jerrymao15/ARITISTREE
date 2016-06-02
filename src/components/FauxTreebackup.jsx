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
    this.state = {
      i:0,
      startGraph: d3.layout.tree().size([1000, 1200]
      )
    };
    this.updateTree = this.updateTree.bind(this)
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  updateTree() {
    let updating = this.state.startGraph;
    let updatei = this.state.i;
    const nodes = updating.nodes(this.props._data).reverse(),
    links = updating.links(nodes);

    nodes.forEach(d => {d.y = d.depth * 250});

    const node = d3.selectAll('node')
    .data(nodes, d => {
      return d.id || (d.id = ++this.state.i);});

    const diagonal = d3.svg.diagonal()
    .projection(d => {return [d.x, d.y];});

    const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => {
      return `translate(${d.x}, ${d.y})`;
    })
    .on('click', d => {
      clicker(d.artist)
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

      const link = d3.selectAll("link")
      .data(links, d => {
        console.log(d);
      });

      link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", diagonal);
      console.log('updatetree');
      this.setState({graph:updating})
  }

  componentDidUpdate() {
    console.log('cdu');
    let updatei = this.state.i;
    let graphState = this.state.startGraph;
    const clicker = this.props.submittingMang;
    const graph = ReactFauxDOM.createElement('div');
    const margin = {
      top: 120,
      right: 120,
      bottom: 20,
      left: 120
    },
    width = 1000 - margin.right - margin.left,
    height = 1200 - margin.top - margin.bottom;


    const diagonal = d3.svg.diagonal()
    .projection(d => {return [d.x, d.y];});

    let svg = d3.select(graph).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    update(this.props._data);

    function update(source) {

      const nodes = graphState.nodes(source).reverse(),
      links = graphState.links(nodes);

      nodes.forEach(d => {d.y = d.depth * 250});

      const node = svg.selectAll('g.node')
      .data(nodes, d => {return d.id || (d.id = ++updatei);});

      const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        return `translate(${d.x}, ${d.y})`;
      })
      .on('click', d => {
        console.log(d);
        clicker(d.artist)
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

      this.setState({graph:graph});
  }



  render() {
    if (!this.state.graph) {
      return <div></div>
    }
    return this.state.graph.toReact();


  }


}

export default FauxTree;

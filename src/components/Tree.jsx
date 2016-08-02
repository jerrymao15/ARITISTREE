import React from 'react';
import TreeNode from './TreeNode.jsx';
import { tree, hierarchy, select, path } from 'd3';


export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1000,
      height: 900,
      initialHeight: 900,
      nodeW: 121.35, // golden ratio
      nodeH: 75,
      nodes: [],
    };
    this.nodeRender = this.nodeRender.bind(this);
    this.linkRender = this.linkRender.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nodes = tree().size([window.innerWidth * 0.6, this.state.height])(hierarchy(nextProps.treeData));
    return this.nodeRender(nodes);
  }

  componentDidUpdate(prevProps, prevState) {
    return this.linkRender(this.state.d3nodes);
  }

  nodeRender(nodes) {
    let i = 0;
    const renderArr = [];

    nodes.each(d => {
      d.y = d.depth * this.state.initialHeight / 5;
      d.id = d.id || ++i;
      // using the information provided by d3
      // to render Node components
      renderArr.push(<TreeNode
        xtranslate={d.x}
        ytranslate={d.y}
        key={i}
        artist={d.data.artist}
        width={this.state.nodeW}
        height={this.state.nodeH}
        clicked={!!d.data.clicked}
        submittingMang={this.props.submittingMang}
      />);
    });

    // setting state so information can be used in render + other methods
    this.setState({
      nodes: renderArr,
      d3nodes: nodes,
      width: window.innerWidth * 0.6,
    });
    return nodes;
  }

  linkRender(nodes) {
    const atree = document.getElementById('atree');
    const links = nodes.links();
    select(document.getElementById('atree'))
    .selectAll('path.link').remove();

    select(document.getElementById('atree'))
    .selectAll('path.link').data(links, d => { return d.target.id; })
    .enter()
    .insert('svg:path', 'foreignObject')
    .attr('class', 'link')
    .attr('d', (node) => {
      // creating a cubic bezier curve for the link
      // equiv to d3.svg.diagonal before 4.0
      const oldX = node.source.x;
      const oldY = node.source.y;
      const newX = node.target.x;
      const newY = node.target.y;
      const pathing = path();
      pathing.moveTo(oldX + this.state.nodeW / 2, oldY);
      pathing.bezierCurveTo(oldX + this.state.nodeW / 2, (oldY + newY) / 2, newX + this.state.nodeW / 2, (oldY + newY) / 2, newX + this.state.nodeW / 2, newY);
      return pathing;
    });

    if (this.state.height > this.state.currentHeight) this.setState({ height: atree.getBBox().y + atree.getBBox().height + 100 });
  }


  render() {
    const divStyle = {
      backgroundColor: '#FAFAFA',
      paddingTop: '20px',
      transform: 'translate(0px, 20px)',
    };
    const gStyle = {
      transform: 'translate(0px,40px)',
      fill: '#969696',
    };
    const svgStyle = {
      transform: `translate(-${this.state.nodeW / 2}px, 0px)`,
    };
    return (
      <div style={divStyle}>
      <svg height={this.state.height} width={this.state.width} style={svgStyle} >
        <g style={gStyle} id="atree">
          {this.state.nodes}
        </g>
      </svg>
      </div>
    );
  }
}
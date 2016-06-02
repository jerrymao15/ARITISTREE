'use strict';

var nodez = document.createElement('div')

function treepls() {

  const treeData = {
    artist:'Kanye West',
    children: [{artist:'JAY-Z',children:[]}, {artist:'Kid Cudi',children:[]}, {artist:'Mos Def',children:[]}]
  }



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

  let svg = d3.select(nodez).append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom).append("g")
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  update(treeData);

  function update(source) {

    const nodes = tree.nodes(treeData).reverse(),
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
}

export default nodez;

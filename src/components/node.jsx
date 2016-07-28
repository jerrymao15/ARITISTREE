import React from 'react';



class Node extends React.Component {

  handleClick() {
    if (!this.props.treeData.clicked) {
      this.props.submittingMang(this.props.treeData.artist)
    }
  }

  render() {
    var renderArr = [];
    if (this.props.treeData.children) {
      renderArr = this.props.treeData.children.map(ele => {
        const td = {
          artist: ele.artist,
          children: ele.children
        }
        return (
          <Node
            treeData = {td}
            submittingMang = {this.props.submittingMang}
            clicked = {ele.clicked}
            />
        )
      });
    }

    return (
      <div>
        <div className = "artist-nodes" onClick = {this.handleClick.bind(this)}>
          {this.props.treeData.artist}
        </div>
        { renderArr }
      </div>
    )
  }

}


export default Node;

import React from 'react';


export default class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectArtist(this.props.artist);
    if (!this.props.clicked) {
      this.props.submittingMang(this.props.artist);
    }
  }

  render() {
    const textStyle = {

    };
    return (
      <g>
      <circle
        cx={this.props.xtranslate}
        cy={this.props.ytranslate}
        r="40"
        stroke="black"
        strokeWidth="3"
        fill="#FAFAFA"
        onClick={this.handleClick}
      />
      <text
        x={this.props.xtranslate}
        y={this.props.ytranslate}
      >
        {this.props.artist}
      </text>
      </g>
    );
  }
}

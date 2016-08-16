import React, { Component, PropTypes } from 'react';


export default class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.clicked) {
      this.props.submittingMang(this.props.artist);
    }
    this.props.selectArtist(this.props.artist);
  }

  render() {
    const textStyle = {

    };
    return (
      <g>
      <circle
        cx={this.props.xtranslate}
        cy={this.props.ytranslate}
        r={this.props.radius}
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

TreeNode.propTypes = {
  xtranslate: PropTypes.string,
  ytranslate: PropTypes.string,
  radius: PropTypes.string,
  artist: PropTypes.string.isRequired,
  clicked: PropTypes.bool,
  submittingMang: PropTypes.func.isRequired,
  selectArtist: PropTypes.func.isRequired,
};

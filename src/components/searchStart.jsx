'use strict';
import React from 'react';



class SearchStart extends React.Component {


  render() {
    return (
      <div>
        <form onSubmit={this.props.getFirst}>
          <input
            type="text"
            onChange={this.props.findArtist}
            value={this.props.value}
            id="searchdudes"
            />
        </form>
      </div>


    )
  }
}


export default SearchStart;

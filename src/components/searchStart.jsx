import React from 'react';


function SearchStart(props) {
  return (
      <div>
        <form onSubmit={props.getFirst}>
          <input
            type="text"
            onChange={props.findArtist}
            value={props.value}
            id="searchdudes"
            />
        </form>
      </div>

    
  )
}


export default SearchStart;
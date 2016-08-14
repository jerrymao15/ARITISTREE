import React from 'react';


const CurrentSong = (props) => {
  const divStyle = {
    flexGrow: '1',
  }
  return (
    <div style={divStyle}>
    {
      props.selected ? (
        <p>{props.selected}</p>
      )
      : <p>nothing selected</p>
    }
    </div>
  );
};


export default CurrentSong;

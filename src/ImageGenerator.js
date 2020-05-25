import React from 'react';

export default function ImageGenerator(props) {
	return (
		<div id="generated-image" className={props.bgColor}>

      {/* background image */}
      <img className="background" src={props.bgPhoto} alt="background" />

      {/* avatar */}
      <div className="avatar-container">
        <img className="avatar" src={props.file} alt="avatar" />
      </div>

      {/* text */}
      <div className="text">
        {props.location && <h3 class="location">{props.location}</h3>}
        <h2 class="endorsement">{props.name} <i>endorses</i> Booker</h2>
        <p>{props.blurb}"</p>
      </div>
    </div>
	);
}

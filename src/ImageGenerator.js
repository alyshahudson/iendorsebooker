import React from 'react';

export default function ImageGenerator(props) {
	return (
    // <canvas id="canvas" >
		<div id="generated-image" className={props.bgColor}>

      {/* background image */}
      <img className="background" src={props.bgPhoto} alt="background" />

      {/* avatar */}
      <div className="avatar-container">
        <img className="avatar" src={props.file} alt="avatar" />
      </div>

      {/* text */}
      <div className="text">
        {props.location && <h3 className="location">{props.location}</h3>}
        <h2 className="endorsement">{props.name}</h2>
		  <h2 className="endorsement"> <i>endorses</i> Booker</h2>
        <h3 className="blurb">{props.blurb}”</h3>
      </div>

		<div className="fine-print">
			<p>Generated at IENDORSEBOOKER.COM <span className="bold">#IEndorseBooker</span></p>
		</div>
    </div>
    // </canvas>
	);
}

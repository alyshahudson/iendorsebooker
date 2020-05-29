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

        {/* endorsement */}
        <div className="endorsement">
          <h2 className="name-output">{props.name}</h2>
          <h2>
            {' '}
            <i>endorses</i> Booker
          </h2>
        </div>

        <div className="blurb">
          <span className="quote-mark">“</span>
          <h3>{props.blurb}”</h3>
        </div>
      </div>

      {/* fine print */}
      <div className="fine-print">
        <p>
          Generated at IENDORSEBOOKER.COM{' '}
          <span className="bold">#IEndorseBooker</span>
        </p>
      </div>

      {/* background color */}
      <div className="background-color"></div>

      {/* color overlay */}
      <div className="overlay-color"></div>
    </div>
  );
}

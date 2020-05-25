import React from 'react';

export default function ImageGenerator(props) {
  return (
    <div className={props.bgColor}>
      {props.location && <p>{props.location}</p>}
      <p>{props.name} <i>endorses</i> Booker</p>
      <p>{props.blurb}</p>
      <img className="avatar" src={props.file} alt="avatar image" />
      <img className="background" src={props.bgPhoto} alt="background image" />
    </div>
  );
}

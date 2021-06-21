import React from "react";
import useElementOnScreen from "./logic";

////////// interfaces /////
interface props {
  type: String;
  caption: String;
  color: String;
  width?: number;
}
interface propsIcon {
  caption: String;
  color: String;
}

interface links {
  link: string;
  classes: string;
  color: String;
  input: string;
}

/////////////////////////
////////Animation Options////////
const squareOptions = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.7,
};

const circleOptions = {
  root: null,
  rootMargin: "0px 0px 100px 0px",
  threshold: 0.7,
};

///////////////
export const CircleIcon: React.FC<props> = ({ type, caption, color }) => {
  const [circleRef] = useElementOnScreen(circleOptions);

  return (
    <div className='circle-wrapper' ref={circleRef}>
      <div className={`circle ${color}`}>
        <i className={`flaticon-${type}`}></i>
      </div>
      <p>{caption}</p>
    </div>
  );
};

export const SquareIcon: React.FC<props> = ({
  type,
  caption,
  color,
  width,
}) => {
  const [SquareRef] = useElementOnScreen(squareOptions);

  return (
    <li className='box' ref={SquareRef}>
      <div className={`square-wrapper ${color}`} style={{ width: `${width}%` }}>
        <div className='square'>
          <i className={`flaticon-${type}`}></i>
          <p>{caption}</p>
        </div>
      </div>
    </li>
  );
};

export const HashtagIcon: React.FC<propsIcon> = ({ caption, color }) => {
  return (
    <div className={`hashtag ${color}`}>
      <p>{caption}</p>
    </div>
  );
};

export const SpanLink: React.FC<links> = ({ link, classes, color, input }) => {
  return (
    <span>
      <a
        style={{ color: `${color}`, borderBottom: `1px solid ${color}5c` }}
        href={link}
        className={classes}>
        {input}
      </a>
    </span>
  );
};

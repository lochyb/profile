import React from "react";
import { HashtagIcon } from "./IconStyles";
import useElementOnScreen from "./logic";

///// Props ////////
interface props {
  date?: string;
  title?: string;
  description?: string;
  picture: string;
  url: string;
  codeLink: string;
  hashtags: Hashtag[];
}
interface Hashtag {
  color: string;
  caption: string;
}

/////////////////////

//////custom hook options /////
const postOptions = {
  root: null,
  rootMargin: "0px 0px 50px 0px",
  threshold: 0.7,
};

//////////////////

export const Post: React.FC<props> = ({
  date,
  title,
  description,
  hashtags,
  picture,
  url,
  codeLink,
}) => {
  const [postRef] = useElementOnScreen(postOptions);
  return (
    <div className='project-card-container' ref={postRef}>
      <div className='photoLink'>
        <a href={url}>
          <img src={picture} alt='cover'></img>
        </a>
      </div>

      <div className='postHeader'>
        <h6>{date}</h6>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className='hashtag-wrapper'>
          {hashtags.map((x) => (
            <HashtagIcon caption={x.caption} color={x.color} />
          ))}
        </div>
      </div>

      <div className='button-wrapper'>
        <a href={codeLink}>
          <button className='project-btn'>
            View Code<i className='flaticon-github-1'></i>
          </button>
        </a>
        <a href={url}>
          <button className='project-btn'>View Project</button>
        </a>
      </div>
    </div>
  );
};

import React from "react";
import { SpanLink } from "./IconStyles";
import useElementOnScreen from "./logic";

const cardOptions = {
  root: null,
  rootMargin: "0px 0px 20px 0px",
  threshold: 0.2,
};

export const About = () => {
  const [infoRef] = useElementOnScreen(cardOptions);
  return (
    <div className='about' ref={infoRef}>
      <h4 id='about'>About Me</h4>
      <hr />
      <p>
        Hi There! My name is Lochy(pronounced Lock-Key). I'm an hobbyist
        <SpanLink
          link='https://en.wikipedia.org/wiki/Web_developer'
          classes='webDevelop'
          color='#127CAE'
          input='🧑‍💻 Web Developer '
        />{" "}
        and
        <SpanLink
          link='https://en.wikipedia.org/wiki/Technology'
          classes='techEnt'
          color='#17AC9E'
          input=' 🖥 Tech Enthusiast'
        />
        . I am currently working as a
        <SpanLink
          link='https://en.wikipedia.org/wiki/localization'
          classes='localization'
          color='#85CB98'
          input=' 📖 Translator / Localization '
        />
        in{" "}
        <SpanLink
          link='https://en.wikipedia.org/wiki/japan'
          classes='japan'
          color='#F16EB3'
          input=' 🇯🇵 Japan'
        />
        . I spend most of my free time
        <SpanLink
          link='https://en.wikipedia.org/wiki/Computer_programming'
          classes='code'
          color='#FFB536'
          input='🛠 Practicing Coding '
        />
        and
        <SpanLink
          link='https://en.wikipedia.org/wiki/Printed_circuit_board'
          classes='building'
          color='#73358B'
          input=' 🪛 Building Things '
        />
        when I can!
      </p>
      <div className='links'>
        <h6>
          <i className='flaticon-pin'></i>Japan, Tokyo
        </h6>
        <h6>
          <a href='https://github.com/lochyb'>
            <i className='flaticon-github-1'></i>Github Profile
          </a>
        </h6>
        <h6>
          <i className='flaticon-mail'></i>Lochlanbernard@gmail.com
        </h6>
      </div>
    </div>
  );
};

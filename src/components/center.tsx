import { CircleIcon } from "./IconStyles";
import { Post } from "./postsLayout";
import { SkillsGraph } from "./skillsGraph";
import useElementOnScreen from "./logic";

const cardOptions = {
  root: null,
  rootMargin: "0px 0px 20px 0px",
  threshold: 0.2,
};

export const Center = () => {
  const [techRef] = useElementOnScreen(cardOptions);
  const [interestsRef] = useElementOnScreen(cardOptions);
  const [projectRef] = useElementOnScreen(cardOptions);

  return (
    <div className='center'>
      <div className='card technologies' ref={techRef}>
        <h4 id='skills'>Technologies and Skills</h4>
        <hr />
        <div className='skills-graph-label'>
          <div className='place-right'>
            {" "}
            <p>
              <span className='diagonal-text'>Read the manual</span>
            </p>
          </div>
          <div className='place-right'>
            <p>
              <span className='diagonal-text'>
                Made a Project
                <br /> or Two
              </span>
            </p>
          </div>
          <div className='place-right'>
            {" "}
            <p>
              <span className='diagonal-text'>
                Feel comfortable
                <br />
                using or doing
              </span>
            </p>
          </div>
          <div className='place-right'>
            <p>
              <span className='diagonal-text'>
                Feel Confident
                <br />
                in Abilities
              </span>
            </p>
          </div>
          <div className='place-right'>
            <p>
              <span className='diagonal-text'>Guru</span>
            </p>
          </div>
        </div>

        <SkillsGraph />
      </div>
      <div className='card interests' ref={interestsRef}>
        <h4 id='interests'>Hobbies and Interests</h4>
        <hr />
        <div className='interests-wrapper'>
          <CircleIcon type='tent' caption='Camping' color='darkGreen' />
          <CircleIcon type='motherboard' caption='Soldering' color='orange' />
          <CircleIcon type='goal' caption='Hiking' color='blue' />
          <CircleIcon type='laboratory' caption='STEM' color='brightPink' />
          <CircleIcon type='v' caption='Vim' color='green' />
          <CircleIcon type='youtube' caption='YouTube' color='red' />
          <CircleIcon type='open-book' caption='Manga' color='purple' />
          <CircleIcon type='bicycle' caption='Cycling' color='lightBlue' />
          <CircleIcon type='linux' caption='linux' color='orange' />
          <CircleIcon type='gaming' caption='PC Builds' color='pink' />
          <CircleIcon type='seo' caption='Web Dev' color='darkBlue' />
          <CircleIcon type='japan' caption='Travel' color='red' />
          <CircleIcon type='sleeping' caption='Sleeping' color='yellow' />
          <CircleIcon type='sleeping' caption='Sleeping' color='yellow' />
        </div>
      </div>
      <div className='card projects' ref={projectRef}>
        <h4 id='projects'>Projects</h4>
        <hr />
        <div className='project-container'>
          <Post
            date={"2021/6/04"}
            title={"Pokemon Shiny App"}
            description={
              "Shows pokemon's shiny and normal forms. Separated by generations, with a search feature to see previous sprite versions"
            }
            picture='./images/Pokemon App Thumbnail.png'
            url={"https://lochyb.github.io/pokemon_app/"}
            hashtags={[
              { color: "darkBlue", caption: "React" },
              { color: "lightBlue", caption: "TypeScript" },
              { color: "blue", caption: "CSS" },
            ]}
            codeLink='https://github.com/lochyb/pokemon_app'
          />{" "}
          <Post
            date={"2021/5/10"}
            title={"DIY Keyboard"}
            description={
              "Self make Keyboard, all the soldering and building. NOVELKEYS X KAILH BLUEBERRY SWITCHES"
            }
            picture='./images/keyboard_build_thumb.png'
            url='https://github.com/lochyb/keyboard_build'
            hashtags={[
              { color: "green", caption: "solder" },
              { color: "pink", caption: "C" },
              { color: "darkBlue", caption: "ProMicro" },
            ]}
            codeLink='https://github.com/lochyb/keyboard_build'
          />
          <Post
            date={"2021/4/24"}
            title={"Weather App V2"}
            description={
              "Practice App I made with react to help me learn about API's and React."
            }
            picture='./images/reactWeatherApp.png'
            url={"https://lochyb.github.io/react-weather-app/"}
            hashtags={[
              { color: "darkBlue", caption: "React" },
              { color: "orange", caption: "HTML" },
              { color: "blue", caption: "CSS" },
              { color: "red", caption: "API" },
            ]}
            codeLink='https://github.com/lochyb/react-weather-app'
          />
          <Post
            date={"2021/3/29"}
            title={"Weather App V1"}
            description={
              "My first time building an application. Backend is Node and hosted on Heroku"
            }
            picture='./images/weatherAppThumbnail.png'
            url={"https://lochyb-weather-app.herokuapp.com/"}
            hashtags={[
              { color: "green", caption: "NodeJS" },
              { color: "orange", caption: "HTML" },
              { color: "blue", caption: "CSS" },
              { color: "pink", caption: "EJS" },
            ]}
            codeLink='https://github.com/lochyb/NodeJS-WeatherApp'
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { SquareIcon } from "./IconStyles";

export const SkillsGraph = () => {
  return (
    <div className='graph-wrapper'>
      <div className='skills-graph'>
        <ul className='legend'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className='graph-data'>
          <SquareIcon type='html' caption='HTML' color='orange' width={80} />
          <SquareIcon type='css' caption='CSS' color='blue' width={80} />
          <SquareIcon
            type='javascript'
            caption='Javascript'
            color='yellow'
            width={70}
          />
          <SquareIcon type='js' caption='NodeJS' color='green' width={70} />
          <SquareIcon type='atom' caption='React' color='darkBlue' width={65} />
          <SquareIcon
            type='ts'
            caption='TypeScript'
            color='lightBlue'
            width={40}
          />
          <SquareIcon
            type='linux'
            caption='Command Line'
            color='purple'
            width={55}
          />
          <SquareIcon type='sass' caption='Sass' color='pink' width={40} />
          <SquareIcon
            type='japan-1'
            caption='Japanese'
            color='red'
            width={95}
          />
          <SquareIcon
            type='xlsx'
            caption='Excel'
            color='darkGreen'
            width={82}
          />
        </ul>
      </div>
    </div>
  );
};

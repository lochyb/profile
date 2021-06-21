import React, { useState } from "react";

export const Menu = () => {
  const [checked, setChecked] = useState(false);

  function unCheck() {
    setChecked(false);
  }

  return (
    <div className='menu-wrapper'>
      <input
        type='checkbox'
        className='behind'
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
      <div className='hamburger-menu-icon'>
        <div></div>
      </div>
      <div className='menu-box'>
        <a href='#about' onClick={unCheck}>
          About
        </a>
        <a href='#skills' onClick={unCheck}>
          Skills
        </a>
        <a href='#interests' onClick={unCheck}>
          Interests
        </a>
        <a href='#projects' onClick={unCheck}>
          Projects
        </a>
        <a href='https://github.com/lochyb' onClick={unCheck}>
          Github
        </a>
      </div>
    </div>
  );
};

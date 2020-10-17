import React, { useState } from "react";
import './language-switcher.css';

const LanguageSwitcher = ({
    lang,
    switchToEnglish, 
    switchToRussian,  
    freezedButtonStyle, 
    buttonsDisabled
  }) => {

  const [langSetting, setLangSetting] = useState(false);
  const langOptions = () => setLangSetting((langSetting) => !langSetting);

  const langButtonclassName = langSetting ? 'language-setting-btn set-lang-button btn' : 'set-lang-button btn';
  let languageMenu = langSetting ? 'language-menu' : '';
  
  const chooseEnglish = () => {
    langOptions()
    switchToEnglish();
  }
  const chooseRussian = () => {
    langOptions()
    switchToRussian();
  }

  return (
    <nav id="slow_nav">
      <ul>
        <li>
          <button id="set-lang" className={langButtonclassName + freezedButtonStyle} disabled={buttonsDisabled} onClick={langOptions}>{lang}</button>
          <ul id="ul" className={languageMenu}>
            <li><button id="en" className="lang-button btn" onClick={chooseEnglish}>EN</button></li>
            <li><button id="ru" className="lang-button btn" onClick={chooseRussian}>RU</button></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default LanguageSwitcher;

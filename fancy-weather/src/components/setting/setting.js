import React from 'react';
import './setting.css';
import LanguageSwitcher from './language-switcher';
import DegreesSwitcher from './degrees-switcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';


class Setting extends React.Component {

  render() {
    const { 
      imgMethod, 
      lang, 
      switchToEnglish,
      switchToRussian, 
      degreeMethod, 
      buttonsDisabled,
      celsius,
      loading } = this.props;

    let {cDisabled, fDisabled} = this.props;  

    const freezedButtonStyle = buttonsDisabled ? ' freezed' : '';
    const freezedButtonAnimation = buttonsDisabled ? 'image-button-anime' : '';
    if (buttonsDisabled) {
      cDisabled = true;
      fDisabled = true
    }

    return (
      <div className="setting">
        {this.props.icon ?
          <div className="button-cluster">
            <button className={"img-button btn " + freezedButtonAnimation} disabled={buttonsDisabled} onClick={imgMethod}>
              {loading ? <FontAwesomeIcon id="img-button" icon={faRecycle} className={freezedButtonAnimation} /> : <FontAwesomeIcon id="img-button" icon={faRecycle} />  }
            </button>
            <LanguageSwitcher 
              freezedButtonStyle={freezedButtonStyle}
              buttonsDisabled={buttonsDisabled}
              lang={lang}  
              switchToEnglish={switchToEnglish}
              switchToRussian={switchToRussian}
            />
            <DegreesSwitcher 
              freezedButtonStyle={freezedButtonStyle}
              degreeMethod={degreeMethod}
              celsius={celsius}
              fDisabled={fDisabled}
              cDisabled={cDisabled}
            />
          </div> : ''
        }
      </div>   
    );
  }
};

export default Setting;
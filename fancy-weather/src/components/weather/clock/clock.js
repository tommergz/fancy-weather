import React  from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

Moment.globalFormat = 'hh:mm:ss';

class Clock extends React.Component {

  getDate = (timeZone) => {
    if (timeZone) {
      const moment = require('moment-timezone');
      const newDate = moment().tz(timeZone).format('ddd D MMMM').split(' ');
      return newDate
    }
  }

  render() {
    const timeZone = this.props.time_zone;
    const newDate = this.getDate(timeZone);
    const lang = this.props.lang;
    
    return (
      <div>
        <span>{timeZone ? `${lang[newDate[0]]} ${newDate[1]} ${lang[newDate[2]]} ` : ''}</span>
        <Moment tz={timeZone} interval={1000} />
      </div>
    );
  }
}

export default Clock;
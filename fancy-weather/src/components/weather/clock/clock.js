import React  from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

Moment.globalFormat = 'ddd D MMMM hh:mm:ss A';

class Clock extends React.Component {

  render() {
    
    return (
      <Moment tz={this.props.time_zone} interval={1000} />
    );
}
}

export default Clock;
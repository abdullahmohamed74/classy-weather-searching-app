import React from 'react';
import { getWeatherIcon, formatDay } from '../utils';

class Day extends React.Component {
  render() {
    const { code, max, min, time, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? 'Today' : formatDay(time)}</p>
        <p>
          {Math.floor(min)}&deg; &ndash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default Day;

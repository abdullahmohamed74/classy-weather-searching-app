import React from 'react';
import Day from './Day';

class Weather extends React.Component {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div className='weather-container'>
        <h2>weather {this.props.location}</h2>
        <ul className="weather">
          {codes.map((code, i) => {
            return (
              <Day
                key={i}
                code={code}
                max={max[i]}
                min={min[i]}
                time={time[i]}
                isToday={i === 0}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Weather;

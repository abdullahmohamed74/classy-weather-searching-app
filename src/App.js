import React from 'react';
import { convertToFlag } from './utils';
import Weather from './components/Weather';
import Input from './components/Input';

class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    displayedLocation: '',
    weather: {},
  };

  fetchWeather = async () => {
    if (this.state.location.length < 2) {
      this.setState({ weather: {} });
      return;
    }

    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoResponse.json();

      // throw an error if there is no data for the required location
      if (!geoData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      this.setState({
        displayedLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  // as component mount get the initial value of 'location' from localStorage
  componentDidMount() {
    this.setState({
      location: JSON.parse(localStorage.getItem('location')) || '',
    });
  }

  // fetch weather as location changes as user types
  // also save location to the localStorage as it changes
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem('location', JSON.stringify(this.state.location));
    }
  }

  render() {
    return (
      <div className="app">
        <h1>classy weather</h1>
        <Input
          location={this.state.location}
          onLocationChange={this.handleLocationChange}
        />

        {this.state.isLoading && 'loading...'}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayedLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

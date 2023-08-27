import React from 'react';

class Input extends React.Component {
  render() {
    const { location, onLocationChange } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={location}
          onChange={onLocationChange}
        />
      </div>
    );
  }
}

export default Input;

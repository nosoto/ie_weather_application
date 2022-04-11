import React, { Component } from "react";
import { kelvinToCelsius } from "../utils/temperature";
import { getHourFromTime } from "../utils/date";

class SingleHourWeather extends Component {
  state = { weatherInfo: this.props };
  render() {
    const { weatherInfo } = this.props;
    let temperature;
    let summary;
    let time;
    let icon;

    if (weatherInfo) {
      temperature = kelvinToCelsius(weatherInfo.temperature);
      summary = weatherInfo.summary;
      icon = summary.icon;
      time = getHourFromTime(weatherInfo.time);
    }

    return (
      <div>
        <h1 className="day__title">
          {time === getHourFromTime(Date.now())
            ? "Now"
            : time === 0
            ? "24"
            : time}
        </h1>
        <img
          className="day__weather-icon"
          src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"}
        />
        <div className="day__temperature">
          <span className="temperature__max">
            {temperature}
            <sup className="temperature__symbol">°c</sup>
          </span>
        </div>
      </div>
    );
  }
}

export default SingleHourWeather;

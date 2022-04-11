import React, { Component } from "react";

import SingleDayWeather from "./singleDayWeather";
import "./dailyWeather.css";

class DailyWeather extends Component {
  render() {
    const { data } = this.props;
    let daily;
    if (data) {
      daily = data.daily;
    }

    if (daily) {
      return (
        <div className="dailyWeather">
          <div className="dailyWeater__container">
            <SingleDayWeather weatherInfo={daily[1]} />
            <SingleDayWeather weatherInfo={daily[2]} />
            <SingleDayWeather weatherInfo={daily[3]} />
            <SingleDayWeather weatherInfo={daily[4]} />
          </div>
        </div>
      );
    } else {
      return <h1>no data</h1>;
    }
  }
}

export default DailyWeather;

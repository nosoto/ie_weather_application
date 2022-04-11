import React from "react";
import Button from "react-bootstrap/Button";
import DailyWeather from "./dailyWeather";
import HourlyWeather from "./hourlyWeather";
import {
  getMonthFromTime,
  getDayFromTime,
  getDayOfTheWeek,
} from "../utils/date";

import { kelvinToCelsius } from "../utils/temperature";
import "./Weather.css";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      weather: {},
      selectedCity: "",
    };
  }

  componentDidMount() {
    fetch(" https://mscbt-luis-grande.herokuapp.com/group-assignment/cities")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            selectedCity: "Madird",
          });

          fetch(
            "https://mscbt-luis-grande.herokuapp.com/group-assignment/weather/" +
              "madrid"
          )
            .then((out) => out.json())
            .then((output) => {
              this.setState({
                isLoaded: true,
                weather: output,
              });
            });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  handleClick(key) {
    fetch(
      "https://mscbt-luis-grande.herokuapp.com/group-assignment/weather/" + key
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weather: result,
            selectedCity: key,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  renderWeather = () => {
    const { weather } = this.state;
    const { current } = weather;

    let temperature;
    let humidity;
    let summary;
    let date;
    let icon;
    let main;

    let { selectedCity } = this.state;
    let month;
    let day;
    let dayName;

    if (current) {
      temperature = kelvinToCelsius(current.temperature);
      humidity = current.humidity;
      summary = current.summary;
      main = summary.main;
      icon = summary.icon;
      date = new Date(current.time);
      month = getMonthFromTime(date);
      day = getDayFromTime(date);
      dayName = getDayOfTheWeek(date);
    }

    return (
      <div className="current-weather">
        <img
          className="cloud-icon Weather__icon"
          src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"}
          alt={main}
        />
        <ul className="Weather__list">
          <li className="list__temperature">
            {temperature}
            <sup className="list__temperature-symbol">°C </sup>
          </li>
          <div className="humidity">
            <li> Humidity: {humidity}% </li>
          </div>
        </ul>

        <div className="date-info">
          {selectedCity}
          <br></br>

          <span className="day">
            {dayName} {month} {day}
          </span>
        </div>
      </div>
    );
  };
  render() {
    const { error, isLoaded, items, weather } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div>
            <ul className="cities">
              {items.map((item) => (
                <Button
                  className="button"
                  onClick={() => this.handleClick(item)}
                  variant="primary"
                  key={item}
                >
                  {" "}
                  {item}{" "}
                </Button>
              ))}
            </ul>
          </div>
          <div className="daily_hourly_weather">
            <div>
              {this.renderWeather()}
              <HourlyWeather data={weather}></HourlyWeather>
            </div>
            <div className="dailyWeather-container">
              {" "}
              <DailyWeather data={weather}></DailyWeather>
            </div>
          </div>
         <div className="teamInfo">
           
           <p className="name"> By: </p> <p className="name">ALVARO PRIOR</p><p className="name">ELENA BORISOVA</p> <p className="name">NICK DEITMERS</p> <p className="name">NORA SOPHIE</p> <p className="name">SOLOMON SHIFERAW</p>
           
           </div>
        </div>
      );
    }
  }
}

export default Weather;

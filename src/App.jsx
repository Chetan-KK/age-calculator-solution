import { useState } from "react";
import "./App.css";
import arrowImg from "/images/icon-arrow.svg";
import AnimatedNumbers from "react-animated-numbers";

function App() {
  const [yearInput, setYearInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [dayInput, setDayInput] = useState("");

  const [year, setYear] = useState("--");
  const [month, setMonth] = useState("--");
  const [day, setDay] = useState("--");

  const [yearEmptyErr, setYearEmptyErr] = useState(false);
  const [monthEmptyErr, setMonthEmptyErr] = useState(false);
  const [dayEmptyErr, setDayEmptyErr] = useState(false);

  const [yearInvalidErr, setYearInvalidErr] = useState(false);
  const [monthInvalidErr, setMonthInvalidErr] = useState(false);
  const [dayInvalidErr, setDayInvalidErr] = useState(false);

  const [init, setInit] = useState(true);

  const handleDayChange = (e) => {
    e.target.value < 1 || e.target.value > 31
      ? setDayInvalidErr(true)
      : setDayInvalidErr(false);

    e.target.value == null ? setDayEmptyErr(true) : setDayEmptyErr(false);
    setDayInput(e.target.value);
  };
  const handleMonthChange = (e) => {
    e.target.value < 1 || e.target.value > 12
      ? setMonthInvalidErr(true)
      : setMonthInvalidErr(false);

    e.target.value == null ? setMonthEmptyErr(true) : setMonthEmptyErr(false);
    setMonthInput(e.target.value);
  };
  const handleYearChange = (e) => {
    let today = new Date();
    e.target.value < today.getFullYear() - 1000 ||
    e.target.value > today.getFullYear()
      ? setYearInvalidErr(true)
      : setYearInvalidErr(false);

    e.target.value == null ? setYearEmptyErr(true) : setYearEmptyErr(false);
    setYearInput(e.target.value);
  };

  function handleSubmit() {
    setInit(false);
    let today = new Date();

    let ageInYears = today.getFullYear() - yearInput;
    let ageInMonths = today.getMonth() + 1 - monthInput;
    let ageInDays = today.getDate() - dayInput;

    if (ageInDays < 0) {
      let daysInLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      ageInDays += daysInLastMonth;
      ageInMonths -= 1;
    }
    if (ageInMonths < 0) {
      ageInMonths += 12;
      ageInYears -= 1;
    }

    setYear(ageInYears);
    setMonth(ageInMonths);
    setDay(ageInDays);
  }

  return (
    <div className="App">
      <div className="main_card">
        <form className="main_form flex" role="form">
          <div className="flex input_field day">
            <label
              htmlFor="dayInput"
              className={
                dayEmptyErr || dayInvalidErr ? "title titleErr" : "title"
              }
            >
              day
            </label>
            <input
              aria-label="day"
              type="number"
              name="dayInput"
              placeholder="DD"
              value={dayInput}
              className={
                dayEmptyErr || dayInvalidErr ? "input inputErr" : "input"
              }
              onChange={handleDayChange}
              title="enter day"
            />
            <div className="err">
              {dayEmptyErr
                ? "This field is required"
                : dayInvalidErr
                ? "Must be a valid day"
                : ""}
            </div>
          </div>
          <div className="flex input_field month">
            <label
              htmlFor="monthInput"
              className={
                monthEmptyErr || monthInvalidErr ? "title titleErr" : "title"
              }
            >
              month
            </label>
            <input
              type="number"
              name="monthInput"
              aria-label="month"
              placeholder="MM"
              value={monthInput}
              className={
                monthEmptyErr || monthInvalidErr ? "input inputErr" : "input"
              }
              onChange={handleMonthChange}
              title="enter month"
            />
            <div className="err">
              {monthEmptyErr
                ? "This field is required"
                : monthInvalidErr
                ? "Must be a valid day"
                : ""}
            </div>
          </div>
          <div className="flex input_field year">
            <label
              htmlFor="yearInput"
              className={
                yearEmptyErr || yearInvalidErr ? "title titleErr" : "title"
              }
            >
              year
            </label>
            <input
              type="number"
              name="yearInput"
              aria-label="year"
              placeholder="YYYY"
              className={
                yearEmptyErr || yearInvalidErr ? "input inputErr" : "input"
              }
              value={yearInput}
              onChange={handleYearChange}
              title="enter year"
            />
            <div className="err">
              {yearEmptyErr
                ? "This field is required"
                : yearInvalidErr
                ? "Must be a valid day"
                : ""}
            </div>
          </div>
        </form>
        <hr />
        <button
          className={
            yearEmptyErr ||
            monthEmptyErr ||
            dayEmptyErr ||
            yearInvalidErr ||
            monthInvalidErr ||
            dayInvalidErr
              ? "submit_button buttonErr"
              : "submit_button"
          }
          onClick={handleSubmit}
          aria-label="submit"
          title="submit"
        >
          <img src={arrowImg} alt="" />
        </button>
        <div className="results" role="result">
          <div className="flex Num year">
            <span>
              {init ? (
                "--"
              ) : (
                <AnimatedNumbers
                  animateToNumber={year}
                  configs={(number, index) => {
                    return {
                      mass: 1,
                      tension: 230 * (index + 1),
                      friction: 80,
                    };
                  }}
                ></AnimatedNumbers>
              )}
            </span>
            years
          </div>
          <div className="flex Num month">
            <span>
              {init ? (
                "--"
              ) : (
                <AnimatedNumbers
                  animateToNumber={month}
                  configs={(number, index) => {
                    return {
                      mass: 1,
                      tension: 230 * (index + 1),
                      friction: 80,
                    };
                  }}
                ></AnimatedNumbers>
              )}
            </span>
            months
          </div>
          <div className="flex Num day">
            <span>
              {init ? (
                "--"
              ) : (
                <AnimatedNumbers
                  animateToNumber={day}
                  configs={(number, index) => {
                    return {
                      mass: 1,
                      tension: 230 * (index + 1),
                      friction: 80,
                    };
                  }}
                ></AnimatedNumbers>
              )}
            </span>
            days
          </div>
        </div>
      </div>
      <div className="attribution" role="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        .Coded by
        <a href="https://Chetan-KK.github.io/Chetan-KK/">Chetan Khulage</a>.
      </div>
    </div>
  );
}

export default App;

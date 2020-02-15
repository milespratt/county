import React, { useState, useRef, useEffect, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import CalendarStyles from "./Calendar.styles";

import { formatTime, formatDate } from "../Countdown/Countdown";

export default function Calendar({
  addCountdown,
  theme,
  eventName,
  setEventName,
  frame
}) {
  // STATE
  const [visibleDate, setVisibleDate] = useState(
    new Date(
      new Date(
        new Date(
          new Date(
            new Date(new Date().setSeconds(0)).setMilliseconds(0)
          ).setHours(0)
        ).setMinutes(0)
      ).setDate(1)
    )
  );
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectorShown, setSelectorShown] = useState(checkSelectorDisplay());
  const [timeRemaining, setTimeRemaining] = useState(selectedDate - Date.now());
  const [past, setPast] = useState(false);

  // REFS
  const selector = useRef(null);
  const calendarRef = useRef(null);
  const dayRefs = useRef(
    new Array(getDaysInMonth()).fill(undefined).map(() => createRef())
  );

  // LIFECYCLE
  useEffect(() => {
    if (selectedDate < Date.now()) {
      if (!past) {
        setPast(!past);
      }
      setTimeRemaining(Date.now() - selectedDate);
    } else {
      if (past) {
        setPast(!past);
      }
      setTimeRemaining(selectedDate - Date.now());
    }
  }, [selectedDate, frame, past]);

  useEffect(() => {
    if (selectorShown) {
      dayRefs.current.forEach(ref => {
        if (ref.current) {
          if (
            checkSelectedDateEquality(1, new Date(ref.current.dataset.date))
          ) {
            moveSelector(ref.current);
          }
        }
      });
    }
  }, [selectorShown]);

  useEffect(() => {
    dayRefs.current.forEach((ref, i) => {
      if (
        i < getDaysInMonth() &&
        checkSelectedDateEquality(1, new Date(ref.current.dataset.date))
      ) {
        moveSelector(ref.current);
      }
    });
    setSelectorShown(checkSelectorDisplay());
  }, [visibleDate]);

  // CALENDAR NAVIGATION
  function changeMonthBack() {
    const newDate = new Date(visibleDate);
    const newMonth = newDate.getMonth() - 1;
    newDate.setMonth(newMonth < 0 ? 11 : newMonth);
    if (newMonth < 0) {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setVisibleDate(newDate);
  }

  function changeMonthForward() {
    const newDate = new Date(visibleDate);
    const newMonth = newDate.getMonth() + 1;
    newDate.setMonth(newMonth > 11 ? 0 : newMonth);
    if (newMonth > 11) {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setVisibleDate(newDate);
  }

  // UTILITIES
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  function dateBeforeToday(dateToCheck) {
    const today = new Date(
      new Date(
        new Date(
          new Date(new Date().setMilliseconds(0)).setSeconds(0)
        ).setMinutes(0)
      ).setHours(0)
    );
    return dateToCheck.getTime() < today.getTime();
  }

  function checkSelectorDisplay() {
    const showSelector =
      selectedDate &&
      selectedDate.getMonth() === visibleDate.getMonth() &&
      selectedDate.getFullYear() === visibleDate.getFullYear();
    return showSelector;
  }

  function dateEqualToToday(dateToCheck) {
    const today = new Date(
      new Date(
        new Date(
          new Date(new Date().setMilliseconds(0)).setSeconds(0)
        ).setMinutes(0)
      ).setHours(0)
    );
    return (
      today.getFullYear() === dateToCheck.getFullYear() &&
      today.getMonth() === dateToCheck.getMonth() &&
      today.getDate() === dateToCheck.getDate() &&
      today.getDay() === dateToCheck.getDay()
    );
  }

  function checkSelectedDateEquality(day, date) {
    const dateToCheck = date || new Date(new Date(visibleDate).setDate(day));
    return (
      selectedDate &&
      selectedDate.getFullYear() === dateToCheck.getFullYear() &&
      selectedDate.getMonth() === dateToCheck.getMonth() &&
      selectedDate.getDate() === dateToCheck.getDate() &&
      selectedDate.getDay() === dateToCheck.getDay()
    );
  }

  function getDaysInMonth() {
    const days = new Date(
      visibleDate.getFullYear(),
      visibleDate.getMonth() + 1,
      0
    ).getDate();
    return days;
  }

  // MANAGE SELECTOR
  function moveSelector(spot) {
    if (!selectorShown) {
      setSelectorShown(checkSelectorDisplay());
    }
    const position = spot.getBoundingClientRect();
    const calpos = calendarRef.current.getBoundingClientRect();
    selector.current.style.transition = "all 150ms ease, background 150ms ease";
    selector.current.style.opacity = "1";
    selector.current.style.top = `${position.top -
      calpos.top +
      (window.innerWidth > 1080 ? 5 : 2)}px`;
    selector.current.style.left = `${position.left -
      calpos.left +
      (window.innerWidth > 1080 ? 5 : 2)}px`;
    setTimeout(() => {
      selector.current.style.transition = "background 150ms ease";
    }, 150);
  }

  function startCountdown() {
    const newCountdown = {
      name: eventName,
      endDate: selectedDate
    };
    addCountdown(newCountdown);
    setSelectedDate(undefined);
    setEventName("");
  }

  function formatHours(hours) {
    let formattedHours = hours;
    if (hours > 12) {
      formattedHours = hours - 12;
    }
    if (hours === 0) {
      formattedHours = 12;
    }
    return formattedHours < 10 ? `0${formattedHours}` : formattedHours;
  }

  return (
    <CalendarStyles
      theme={theme}
      selectedDate={selectedDate}
      selectorShown={selectorShown}
      ref={calendarRef}
    >
      <div
        ref={selector}
        className="selector"
        style={{
          display: `${checkSelectorDisplay() ? "block" : "none"}`
        }}
      ></div>
      <div className="event__input">
        <label className="title form__label" htmlFor="eventName">
          <input
            placeholder="Event Name"
            type="text"
            name="eventName"
            value={eventName}
            onChange={ev => setEventName(ev.target.value)}
            className="input title title--big"
          />
        </label>
      </div>
      <div className="calendar__picker">
        <div className="calendar__header">
          <button onClick={changeMonthBack} className="calendar__nav__button">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <p className="calendar__title">{`${
            monthNames[visibleDate.getMonth()]
          } ${visibleDate.getFullYear()}`}</p>
          <button
            onClick={changeMonthForward}
            className="calendar__nav__button"
          >
            <FontAwesomeIcon
              className="calendar__nav__button"
              icon={faArrowRight}
            />
          </button>
        </div>
        <div className="day__grid">
          <div className="calendar__week">
            <span className="day__name">SUN</span>
            <span className="day__name">MON</span>
            <span className="day__name">TUE</span>
            <span className="day__name">WED</span>
            <span className="day__name">THU</span>
            <span className="day__name">FRI</span>
            <span className="day__name">SAT</span>
          </div>
          {new Array(getDaysInMonth()).fill(undefined).map((e, i) => {
            return (
              <button
                key={visibleDate.getTime() + i}
                ref={dayRefs.current[i]}
                data-date={new Date(new Date(visibleDate).setDate(i + 1))}
                className={`${
                  checkSelectedDateEquality(i + 1)
                    ? "day__cell day__cell--selected"
                    : "day__cell"
                } ${dateEqualToToday(
                  new Date(new Date(visibleDate).setDate(i + 1))
                ) && "day__cell--today"} ${dateBeforeToday(
                  new Date(new Date(visibleDate).setDate(i + 1))
                ) && "day__cell--past"}`}
                style={{
                  gridColumn: `${i === 0 ? visibleDate.getDay() + 1 : "unset"}`
                }}
                onClick={() => {
                  const clickedDate = new Date(
                    new Date(visibleDate).setDate(i + 1)
                  );
                  if (selectedDate) {
                    clickedDate.setHours(selectedDate.getHours());
                    clickedDate.setMinutes(selectedDate.getMinutes());
                  }
                  setSelectedDate(clickedDate);
                  moveSelector(dayRefs.current[i].current);
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <button
          onClick={() =>
            setVisibleDate(
              new Date(
                new Date(
                  new Date(
                    new Date(
                      new Date(new Date().setSeconds(0)).setMilliseconds(0)
                    ).setHours(0)
                  ).setMinutes(0)
                ).setDate(1)
              )
            )
          }
          className="selected__date title title--sub"
        >
          {selectedDate
            ? `${dayNames[selectedDate.getDay()]}, ${
                monthNames[selectedDate.getMonth()]
              } ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
            : `Today is ${dayNames[new Date().getDay()]}, ${
                monthNames[new Date().getMonth()]
              } ${new Date().getDate()}, ${new Date().getFullYear()}`}
        </button>
        {selectedDate && (
          <>
            <div className="clock">
              <div className="clock__picker clock__hour">
                <span>{formatHours(selectedDate.getHours())}</span>
              </div>
              <span className="clock__picker clock__delimiter">:</span>
              <div className="clock__picker clock__minute">
                <span>
                  {selectedDate.getMinutes() < 10
                    ? `0${selectedDate.getMinutes()}`
                    : selectedDate.getMinutes()}
                </span>
              </div>
              <div className="clock__picker clock__am-pm">
                <span>{selectedDate.getHours() >= 12 ? "PM" : "AM"}</span>
              </div>
            </div>
            <div className="sliders">
              <Slider
                handleStyle={{
                  background: theme["Background Color"],
                  border: `3px solid ${theme["Control Color"]}`,
                  height: "30px",
                  width: "30px",
                  outline: "none",
                  marginTop: "-13px"
                }}
                // onBeforeChange={() => {
                //   setSliderTransition(
                //     "color 150ms ease, background 150ms ease, border 150ms ease !important"
                //   );
                // }}
                // onAfterChange={() => {
                //   setSliderTransition(
                //     "all 150ms ease, color 150ms ease, background 150ms ease, border 150ms ease !important"
                //   );
                // }}
                trackStyle={{
                  background: theme["Control Color"]
                }}
                min={0}
                max={23}
                value={selectedDate.getHours()}
                onChange={ev => {
                  setSelectedDate(
                    new Date(new Date(selectedDate).setHours(ev))
                  );
                }}
                className="time__slider"
              />
              <Slider
                handleStyle={{
                  background: theme["Background Color"],
                  border: `3px solid ${theme["Control Color"]}`,
                  height: "30px",
                  width: "30px",
                  outline: "none",
                  marginTop: "-13px"
                }}
                // onBeforeChange={() => {
                //   setSliderTransition("unset");
                // }}
                // onAfterChange={() => {
                //   setSliderTransition("all 150ms ease");
                // }}
                trackStyle={{
                  cursor: "pointer",
                  background: theme["Control Color"]
                }}
                value={selectedDate.getMinutes()}
                onChange={ev => {
                  setSelectedDate(
                    new Date(new Date(selectedDate).setMinutes(ev))
                  );
                }}
                min={0}
                max={59}
                className="time__slider"
              />
            </div>
          </>
        )}
        {selectedDate && (
          <div className="selected__date title">
            <span>
              {eventName && `${eventName} ${past ? "occurred" : "occurs in"} `}
            </span>
            <span className="time__display">
              {formatTime(timeRemaining, true, past, false, true)}
            </span>
            {past && <span> ago</span>}
          </div>
        )}
        {selectedDate && (
          <div className="calendar__controls">
            <button
              onClick={eventName ? startCountdown : null}
              className="btn btn-primary"
            >
              {eventName ? " Start Countdown" : "Enter an Event Name above"}
            </button>
          </div>
        )}
      </div>
    </CalendarStyles>
  );
}

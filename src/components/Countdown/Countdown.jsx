import React, { useState, useEffect } from "react";
import CountdownStyles from "./Countdown.styles";

export function formatTime(value, full, past, t, space) {
  let timeRemaining = value;
  const days = Math.floor(timeRemaining / 86400000);
  timeRemaining -= days * 86400000;
  const hours = Math.floor(timeRemaining / 3600000);
  timeRemaining -= hours * 3600000;
  const minutes = Math.floor(timeRemaining / 60000);
  timeRemaining -= minutes * 60000;
  const seconds = Math.floor(timeRemaining / 1000);
  if (full) {
    return `${t && past ? "T+" : t ? "T-" : ""}${
      days < 10 ? `0${days}` : `${days}`
    }d${space ? " " : ""}${hours < 10 ? `0${hours}` : hours}h${
      space ? " " : ""
    }${minutes < 10 ? `0${minutes}` : minutes}m${space ? " " : ""}${
      seconds < 10 ? `0${seconds}` : seconds
    }s`;
  }
  return `${t && past ? "T+" : t ? "T-" : ""}${days < 10 ? `0${days}` : days}:${
    hours < 10 ? `0${hours}` : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

export function formatDate(value) {
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
    "Sun",
    "Mon",
    "Tue",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return `${dayNames[value.getDay()]}, ${
    monthNames[value.getMonth()]
  } ${value.getDate()}, ${value.getFullYear()}`;
}

export default function Countdown({
  theme,
  setSelectedDate,
  eventName,
  selectedDate,
  countdownDate,
  id,
  frame,
  setCurrentEvent
}) {
  // const selectedDate = selectedDate;
  const [display, setDisplay] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(selectedDate - Date.now());
  const [past, setPast] = useState(false);

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

  return (
    <CountdownStyles theme={theme}>
      <>
        <button
          onClick={() => {
            setCurrentEvent(eventName);
            setSelectedDate(selectedDate);
          }}
          className="event__detail event__name"
        >
          {eventName ? eventName : "Event Name"}
        </button>
        <span className="event__detail event__date">
          {formatDate(selectedDate)}
        </span>
        <button
          onClick={() => setDisplay(!display)}
          className="event__detail event__countdown"
        >
          {formatTime(timeRemaining, display, past, true)}
        </button>
      </>
    </CountdownStyles>
  );
}

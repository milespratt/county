import React, { useState, useEffect, useRef } from "react";
import uuid from "uuid/v4";
import AppStyles from "./App.styles";

import Calendar from "./components/Calendar/Calendar";
import Countdown from "./components/Countdown/Countdown";
import Themer from "./components/Themer/Themer";

function App() {
  // The currently selected date
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date(new Date().setSeconds(0)).setMilliseconds(0))
  );

  // the event being created/edited
  const [currentEvent, setCurrentEvent] = useState(undefined);

  // the current event name
  const [eventName, setEventName] = useState("");

  // the app ticker that updates the countdown displays
  const [frame, setFrame] = useState(0);
  const appInterval = useRef(null);
  useEffect(() => {
    appInterval.current = setInterval(() => {
      setFrame(uuid());
    }, 1000);
    return () => {
      window.clearInterval(appInterval.current);
    };
  }, []);

  // the active countdowns
  const [countDowns, setCountDowns] = useState([]);

  function addCountdown(countdown) {
    countdown.id = uuid();
    setCountDowns([...countDowns, countdown]);
  }

  // current app theme
  const [currentTheme, setCurrentTheme] = useState({
    "Theme Name": "Default",
    "Background Color": "white",
    "Button Color": "white",
    "Button Text": "black",
    "Control Color": "black",
    "Title Color": "black",
    "Label Color": "black",
    "Inactive Color": "gray",
    "Active Color": "tomato",
    "Default Color": "black",
    "Selected Color": "white",
    "Highlight Color": "tomato"
  });

  useEffect(() => {
    if (currentEvent) {
      setEventName(currentEvent);
    }
  }, [currentEvent]);
  return (
    <AppStyles theme={currentTheme}>
      <div className="card__preview">
        <Calendar
          eventName={eventName}
          setEventName={setEventName}
          theme={currentTheme}
          frame={frame}
          addCountdown={addCountdown}
        />
        <div className="countdown__grid">
          {countDowns
            .sort((a, b) => {
              if (a.endDate.getTime() < b.endDate.getTime()) {
                return -1;
              }
              if (a.endDate.getTime() > b.endDate.getTime()) {
                return 1;
              }
              if (a.endDate.getTime() === b.endDate.getTime()) {
                return 0;
              }
            })
            .map(countDown => {
              return (
                <Countdown
                  frame={frame}
                  key={countDown.endDate.toString()}
                  eventName={countDown.name}
                  id={countDown.id}
                  theme={currentTheme}
                  countdownDate={countDown.endDate}
                  selectedDate={countDown.endDate}
                  setSelectedDate={setSelectedDate}
                  setCurrentEvent={setCurrentEvent}
                />
              );
            })}
        </div>
        <Themer currentTheme={currentTheme} changeTheme={setCurrentTheme} />
      </div>
    </AppStyles>
  );
}

export default App;

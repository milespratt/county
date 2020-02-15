import styled from "styled-components";

const CalendarStyles = styled.div`
  background: ${props => props.theme["Background Color"]};
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-area: cal;
  grid-gap: 30px;
  grid-template-rows: min-content min-content;
  padding: 20px;
  position: relative;
  width: min-content;

  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* SELECTOR */
  .selector {
    background: ${props => props.theme["Highlight Color"]};
    border-radius: 50%;
    height: 40px;
    opacity: 0;
    position: absolute;
    width: 40px;
  }

  /* EVENT INPUT */
  .event__input {
    display: grid;
    grid-template-rows: min-content min-content;
    justify-content: center;
    justify-items: center;
    margin-top: 18px;
    width: 100%;
  }

  /* CALENDAR */
  .calendar__picker {
    display: grid;
    grid-template-rows: min-content min-content min-content;
    justify-content: center;
  }

  .calendar__header {
    align-items: center;
    color: ${props => props.theme["Title Color"]};
    display: flex;
    justify-content: space-between;
    padding: 0 7px;
  }

  .calendar__nav__button {
    background: none;
    border: none;
    color: ${props => props.theme["Control Color"]};
    cursor: pointer;
    font-size: 16px;
    outline: none;
  }

  .calendar__title {
    font-size: 20px;
    font-weight: 700;
  }

  .day__grid {
    display: grid;
    grid-template-columns: repeat(7, 50px);
    /* grid-template-rows: repeat(7, 50px); */
    grid-auto-rows: 50px;
    box-sizing: border-box;
    grid-gap: 1px;
    align-items: center;
    justify-items: center;
    margin-bottom: 15px;
  }

  .calendar__week {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(7, 50px);
    justify-items: center;
    font-size: 12px;
    font-weight: 700;
    color: ${props => props.theme["Label Color"]};
  }

  .day__cell {
    align-items: center;
    display: flex;
    font-size: 14px;
    height: 100%;
    justify-content: center;
    width: 100%;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    transition: ${props =>
      props.selectorShown
        ? "font-size 50ms ease, color 150ms ease"
        : "font-size 50ms ease"};
    position: relative;
    color: ${props => props.theme["Default Color"]};
  }

  .day__cell--past {
    color: ${props => props.theme["Inactive Color"]};
  }

  .day__cell--today {
    color: tomato;
    color: ${props => props.theme["Active Color"]};
  }

  .day__cell--selected {
    font-weight: bold;
    font-size: 18px;
    color: ${props => props.theme["Selected Color"]};
  }

  .day__cell:hover {
    font-weight: bold;
    font-size: 18px;
  }

  /* SELECTED DATE */
  .selected__date {
    margin-bottom: 30px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  /* CLOCK */
  .clock {
    display: grid;
    grid-template-columns: repeat(4, min-content);
    margin: 0 auto;
    grid-gap: 5px;
  }

  .clock__picker {
    align-items: center;
    display: grid;
    grid-template-rows: repeat(3, min-content);
    justify-content: center;
    justify-items: center;
    font-size: 30px;
    font-family: "Roboto Mono";
    color: ${props => props.theme["Title Color"]};
  }

  .clock__delimiter {
    line-height: 28px;
  }
  .clock__control {
    padding: 0;
    cursor: pointer;
    font-size: 60px;
    outline: none;
    border: none;
    background: none;
    color: ${props => props.theme["Control Color"]};
  }
  .time__slider {
    width: 90%;
    margin: 0 auto;
  }
  .rc-slider-handle {
    transition: box-shadow 150ms ease;
  }
  .rc-slider-handle:active {
    box-shadow: 0 0 5px ${props => props.theme["Control Color"]};
  }

  .rc-slider-handle:focus {
    box-shadow: 0 0 5px ${props => props.theme["Control Color"]};
  }

  .sliders {
    margin: 30px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 75px;
  }

  .calendar__controls {
    /* margin-top: 30px; */
    width: 100%;
  }

  @media only screen and (max-width: 1080px) {
    .day__grid {
      display: grid;
      grid-template-columns: repeat(7, 45px);
      /* grid-template-rows: repeat(7, 50px); */
      grid-auto-rows: 45px;
      box-sizing: border-box;
      grid-gap: 1px;
      align-items: center;
      justify-items: center;
      margin-bottom: 15px;
    }

    .calendar__week {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(7, 45px);
      justify-items: center;
      font-size: 12px;
      font-weight: 700;
      color: ${props => props.theme["Label Color"]};
    }

    .selector {
      background: ${props => props.theme["Highlight Color"]};
      border-radius: 50%;
      height: 41px;
      opacity: 0;
      position: absolute;
      width: 41px;
    }
    background: none;
    box-shadow: none;
  }
`;

export default CalendarStyles;

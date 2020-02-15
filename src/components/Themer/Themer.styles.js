import styled from "styled-components";

const ThemerStyles = styled.div`
  display: grid;
  display: none;
  justify-content: center;
  grid-template-columns: 350px 150px;
  height: min-content;
  grid-auto-rows: min-content;
  align-content: center;
  grid-area: theme;
  width: min-content;
  grid-gap: 20px;

  .theme__list {
    list-style: none;
    padding: 0;
    margin: 0;
    /* white-space: nowrap; */
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    color: #2b2b2b;
  }
  .title--big {
    font-size: 24px;
  }

  .theme__list button {
    color: #2b2b2b;

    font-size: 12px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    /* margin-bottom: 5px; */
    padding: 10px 0;
  }

  .theme__list button:hover {
    font-weight: 700;
  }

  .active__theme {
    cursor: default !important;
    font-weight: 700;
  }

  .theme__string {
    width: 200px;
    overflow-wrap: break-word;
  }

  .color__input {
    display: grid;
    grid-auto-flow: row;
    justify-content: center;
    grid-gap: 5px;
  }

  .color__input__text {
    font-size: 14px;
    font-weight: 700;
    border-radius: 3px;
    height: 20px;
    text-align: center;
    user-select: all;
  }

  .color__input__label {
    display: grid;
    white-space: nowrap;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    color: #2b2b2b;
  }

  .themer__controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 20px;
  }

  .themer__button {
    cursor: pointer;
    height: 30px;
    border-radius: 5px;
    background: white;
    border: none;
    outline: none;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 50ms ease;
  }
  .themer__button:hover {
    font-size: 12px;
  }
`;

export default ThemerStyles;

import styled from "styled-components";

const CountdownStyles = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  padding: 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  height: auto;
  /* align-self: start;
  justify-self: start; */
  border-radius: 20px;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
  /* grid-area: count; */
  background: ${props => `${props.theme["Background Color"]}`};
  * {
    white-space: nowrap;
  }

  .event__name {
    font-weight: 700;
    font-size: 20px;
    color: ${props => `${props.theme["Title Color"]}`};
    background: none;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .countdown__grid {
  }
  .event__date {
    color: ${props => `${props.theme["Label Color"]}`};
  }
  .event__countdown {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: "Roboto Mono";
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 2px;
    color: ${props => `${props.theme["Title Color"]}`};
  }
  .event__countdown__control {
    color: ${props => `${props.theme["Title Color"]}`};
  }
`;

export default CountdownStyles;

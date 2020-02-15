import styled from "styled-components";

const AppStyles = styled.div`
  /* background: rgb(252, 252, 252); */
  height: 100vh;

  * {
    font-family: "Roboto";
  }

  .card__preview {
    display: grid;
    grid-template-areas:
      "cal count"
      "cal theme";
    grid-template-columns: min-content min-content;
    /* align-content: center; */
    height: 100%;
    margin: 0 auto;
    grid-column-gap: 40px;
    align-items: start;
    padding-top: 100px;
    justify-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .countdown__grid {
    align-self: start;
    width: 100%;
    grid-gap: 40px;
    display: grid;
    grid-area: count;
    grid-template-columns: 1fr 1fr;
  }

  .btn {
    background: ${props => props.theme["Button Color"]};
    border: 3px solid ${props => props.theme["Control Color"]};
    border-radius: 5px;
    color: ${props => props.theme["Highlight Color"]};
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 10px;
    width: 100%;
  }

  .form__label {
    justify-items: center;
    display: grid;
    width: 100%;
    grid-template-rows: min-content min-content;
  }

  .input {
    outline: none;
    border: none;
    text-align: center;
    padding: 0 5px;
    font-size: 16px;
    font-weight: 500;
    user-select: all;

    resize: none;
    width: 100%;
    min-height: 30px;
    background: none;
  }

  .textarea {
    text-align: left;
    height: 200px;
  }

  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme["Title Color"]};
  }
  .title--sub {
    font-size: 16px;
  }
  .title--big {
    font-size: 26px;
  }

  .time__display {
    white-space: nowrap;
  }
  /* Smartphones (landscape) ----------- */
  @media only screen and (min-width: 321px) {
    /* Styles */
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 1080px) {
    height: auto;
    padding-top: 50px;
    background: white;
    .card__preview {
      display: grid;
      grid-template-areas:
        "cal"
        "cal"
        "count"
        "theme";
      grid-template-columns: min-content;
      align-content: center;
      height: 100%;
      margin: 0 auto;
      grid-row-gap: 40px;
      align-items: center;
      justify-items: center;
      justify-content: center;
    }
    .countdown__grid {
      align-self: start;
      width: 100%;
      grid-gap: 40px;
      display: none;
      grid-area: count;
      grid-template-columns: 1fr;
    }
    .themer {
      display: none;
    }
  }
`;

export default AppStyles;

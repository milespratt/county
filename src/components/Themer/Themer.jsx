import React, { useState, useEffect } from "react";
import ThemerStyles from "./Themer.styles";
import { themeList } from "./themes";

export default function Themer({ currentTheme, changeTheme }) {
  const [loadedTheme, setLoadedTheme] = useState(
    currentTheme || {
      "Theme Name": "Default",
      "Background Color": "white",
      "Control Color": "black",
      "Title Color": "black",
      "Label Color": "black",
      "Inactive Color": "gray",
      "Active Color": "tomato",
      "Default Color": "black",
      "Selected Color": "white",
      "Highlight Color": "tomato"
    }
  );
  const [themes, setThemes] = useState(null);
  function saveTheme() {
    const newThemeList = {
      ...themes,
      [loadedTheme["Theme Name"]]: { ...loadedTheme }
    };
    localStorage.setItem("themeList", JSON.stringify(newThemeList));
    setThemes(newThemeList);
  }
  useEffect(() => {
    const savedThemeList = localStorage.getItem("themeList");
    if (savedThemeList) {
      setThemes(JSON.parse(savedThemeList));
    } else {
      localStorage.setItem("themeList", JSON.stringify(themeList));
      setThemes(themeList);
    }
  }, []);
  useEffect(() => {
    if (currentTheme) {
      setLoadedTheme(currentTheme);
    }
  }, [currentTheme]);
  function deleteTheme() {
    const newThemeList = {
      ...themes,
      [loadedTheme["Theme Name"]]: { ...loadedTheme }
    };
    delete newThemeList[loadedTheme["Theme Name"]];
    localStorage.setItem("themeList", JSON.stringify(newThemeList));
    setThemes(newThemeList);
    setLoadedTheme({
      "Theme Name": "Default",
      "Background Color": "white",
      "Control Color": "black",
      "Title Color": "black",
      "Label Color": "black",
      "Inactive Color": "gray",
      "Active Color": "tomato",
      "Default Color": "black",
      "Selected Color": "white",
      "Highlight Color": "tomato"
    });
    changeTheme({
      "Theme Name": "Default",
      "Background Color": "white",
      "Control Color": "black",
      "Title Color": "black",
      "Label Color": "black",
      "Inactive Color": "gray",
      "Active Color": "tomato",
      "Default Color": "black",
      "Selected Color": "white",
      "Highlight Color": "tomato"
    });
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    changeTheme(loadedTheme);
  }
  return themes ? (
    <ThemerStyles theme={currentTheme} className="themer">
      <form onSubmit={handleSubmit} className="color__input">
        {Object.keys(loadedTheme)
          .sort((a, b) => {
            if (a === "Theme Name") {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            if (a < b) {
              return -1;
            }
            return 0;
          })
          .map((key, i) => {
            return (
              <label key={key} className="color__input__label" htmlFor={key}>
                {key}
                <input
                  style={{
                    border: `2px solid ${i > 0 ? loadedTheme[key] : "black"}`
                  }}
                  className="color__input__text"
                  name={key}
                  type="text"
                  value={loadedTheme[key]}
                  onChange={ev =>
                    setLoadedTheme({ ...loadedTheme, [key]: ev.target.value })
                  }
                />
              </label>
            );
          })}
        <div className="themer__controls">
          <input
            className="themer__button"
            type="submit"
            onClick={() => changeTheme(loadedTheme)}
            value="Apply Theme"
          ></input>

          <button className="themer__button" onClick={saveTheme}>
            Save Theme
          </button>
          <button className="themer__button" onClick={deleteTheme}>
            Delete Theme
          </button>
        </div>
      </form>
      <div>
        <span className="title">Themes</span>
        <ul className="theme__list">
          {Object.keys(themes)
            .sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a < b) {
                return -1;
              }
              return 0;
            })
            .map((themeName, i) => {
              return (
                <li key={JSON.stringify(themes[themeName])}>
                  <button
                    className={
                      currentTheme["Theme Name"] === themeName
                        ? "active__theme"
                        : null
                    }
                    onClick={() => changeTheme(themes[themeName])}
                  >
                    {themeName}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </ThemerStyles>
  ) : null;
}

import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Today is text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Today is/i);
  expect(linkElement).toBeInTheDocument();
});

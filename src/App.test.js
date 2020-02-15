import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Event Name text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Event Name/i);
  expect(linkElement).toBeInTheDocument();
});

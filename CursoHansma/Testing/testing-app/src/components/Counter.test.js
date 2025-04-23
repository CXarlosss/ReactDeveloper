// @ts-nocheck


// Counter.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Counter from "./Counter";

test("renders counter with initial value", () => {
  render(<Counter />);
  expect(screen.getByTestId("count")).toHaveTextContent("0");
});

test("increments counter when clicking Increment button", () => {
  render(<Counter />);
  const button = screen.getByTestId("increment");
  fireEvent.click(button);
  expect(screen.getByTestId("count")).toHaveTextContent("1");
});

test("decrements counter when clicking Decrement button", () => {
  render(<Counter />);
  const button = screen.getByTestId("decrement");
  fireEvent.click(button);
  expect(screen.getByTestId("count")).toHaveTextContent("0");
});

test("counter does not go below 0", () => {
  render(<Counter />);
  const button = screen.getByTestId("decrement");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(screen.getByTestId("count")).toHaveTextContent("0");
});

test("shows special message when reaching 10", () => {
  render(<Counter />);
  const button = screen.getByTestId("increment");
  for (let i = 0; i < 10; i++) {
    fireEvent.click(button);
  }
  expect(screen.getByTestId("message")).toHaveTextContent("¡Has alcanzado 10!");
});

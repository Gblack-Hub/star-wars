import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import LoginForm from "../LoginForm";
import { store } from "../../../../store/index";

const MockLoginForm = () => {
  return (
    <Provider store={store}>
      <Router>
        <LoginForm />
      </Router>
    </Provider>
  );
};

describe("testing login form", () => {
  it("should render without crashing", () => {
    render(<MockLoginForm />);
  });

  it("should display error message if character name is empty", () => {
    render(<MockLoginForm />);
    const nameInputElement = screen.getByPlaceholderText(/character name/i);
    const loginButtonElement = screen.getByRole("button", { type: /Submit/i });
    fireEvent.change(nameInputElement, { target: { value: "" } });
    fireEvent.click(loginButtonElement);
    const errorElement = screen.getByText(/Enter Character name/i);

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toBeVisible();
  });

  it("should display error message if birth year (password) name is empty", () => {
    render(<MockLoginForm />);
    const passwordInputElement = screen.getByPlaceholderText(/birth year/i);
    const loginButtonElement = screen.getByRole("button", { type: /Submit/i });
    fireEvent.change(passwordInputElement, { target: { value: "" } });
    fireEvent.click(loginButtonElement);
    const errorElement = screen.getByText(/Enter birth year/i);

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toBeVisible();
  });
});

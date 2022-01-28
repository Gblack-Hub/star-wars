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

const setup = () => {
  const utils = render(<MockLoginForm />);
  const nameInputElement = utils.getByPlaceholderText(/character name/i);
  const passwordInputElement = utils.getByPlaceholderText(/birth year/i);
  const loginButtonElement = utils.getByRole("button", { type: /Submit/i });
  return {
    nameInputElement,
    passwordInputElement,
    loginButtonElement,
    ...utils,
  };
};

describe("testing login form", () => {
  it("should render without crashing", () => {
    render(<MockLoginForm />);
  });

  it("should display error message if character name is empty after form submission", () => {
    const { nameInputElement, loginButtonElement } = setup();
    fireEvent.change(nameInputElement, { target: { value: "" } });
    fireEvent.click(loginButtonElement);
    const errorElement = screen.getByText(/Enter Character name/i);

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toBeVisible();
  });

  it("should display error message if birth year (password) name is empty after form submission", () => {
    const { passwordInputElement, loginButtonElement } = setup();
    fireEvent.change(passwordInputElement, { target: { value: "" } });
    fireEvent.click(loginButtonElement);
    const errorElement = screen.getByText(/Enter birth year/i);

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toBeVisible();
  });

  it("should display typed characters in input accordingly", async () => {
    const { nameInputElement, passwordInputElement } = setup();
    fireEvent.change(nameInputElement, { target: { value: "Luke Skywalker" } });
    expect(nameInputElement.value).toBe("Luke Skywalker");
    fireEvent.change(passwordInputElement, { target: { value: "19BBY" } });
    expect(passwordInputElement.value).toBe("19BBY");
  });
});

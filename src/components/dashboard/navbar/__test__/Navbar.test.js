import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../store/index";
import Navbar from "../Navbar";

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>
  );
};

describe("testing search page", () => {
  it("should render successfully", () => {
    render(<MockNavbar />);
  });

  it("should render home text to screen", () => {
    render(<MockNavbar />);
    const searchBoxComponent = screen.getByText(/home/i);
    expect(searchBoxComponent).toBeInTheDocument();
    expect(searchBoxComponent).toBeVisible();
  });

  it("should redirect user to homepage when logout is clicked", () => {
    render(<MockNavbar />);
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    const loggedOutText = screen.getByText(/logged out./i);
    expect(loggedOutText).toBeInTheDocument();
  });
});

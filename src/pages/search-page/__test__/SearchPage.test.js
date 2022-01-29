import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../store/index";
import SearchPage from "../SearchPage";

const MockSearchPage = () => {
  return (
    <Provider store={store}>
      <Router>
        <SearchPage />
      </Router>
    </Provider>
  );
};

describe("testing search page", () => {
  it("should render successfully", () => {
    render(<MockSearchPage />);
  });

  it("should render search-box component to screen", () => {
    render(<MockSearchPage />);
    const searchBoxComponent = screen.getByTitle(/search-box/i);
    expect(searchBoxComponent).toBeInTheDocument();
    expect(searchBoxComponent).toBeVisible();
  });

  it("should render navbar component to screen", () => {
    render(<MockSearchPage />);
    const navbarComponent = screen.getByTitle(/navbar/i);
    expect(navbarComponent).toBeInTheDocument();
    expect(navbarComponent).toBeVisible();
  });
});

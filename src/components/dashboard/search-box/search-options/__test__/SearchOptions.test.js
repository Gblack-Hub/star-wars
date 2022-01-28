import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../../store";
import SearchOptions from "../SearchOptions";

const MockSearchOptions = () => {
  return (
    <Provider store={store}>
      <Router>
        <SearchOptions />
      </Router>
    </Provider>
  );
};

const options = [];

describe("testing search-options component", function () {
  it("should render without crashing", () => {
    render(<MockSearchOptions options={options} />);
  });
});

import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../../store";
import SearchResultCard from "../SearchResultCard";

const MockSearchResultCard = () => {
  return (
    <Provider store={store}>
      <Router>
        <SearchResultCard />
      </Router>
    </Provider>
  );
};

describe("testing search-result-card component", () => {
  it("should render component without errors", () => {
    render(<MockSearchResultCard />);
  });
});
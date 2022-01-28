import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../store/index";
import SearchResults from "../SearchResults";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

const MockSearchResults = () => {
  return (
    <Provider store={store}>
      <Router>
        <SearchResults />
      </Router>
    </Provider>
  );
};

describe("testing search-result component", () => {
  it("should render component without errors", () => {
    render(<MockSearchResults />);
  });
});

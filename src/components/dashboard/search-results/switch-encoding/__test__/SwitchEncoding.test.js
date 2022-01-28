// import { render, screen } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "../../../../../store";
// import SearchResultGraph from "../SearchResultGraph";
// import SearchResultWookieGraph from "../SearchResultWookieGraph";

// const MockSearchResultGraph = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <SearchResultGraph />
//       </Router>
//     </Provider>
//   );
// };
// const MockSearchResultWookieGraph = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <SearchResultWookieGraph />
//       </Router>
//     </Provider>
//   );
// };

// describe("testing search-result-graph component", () => {
//   it("should render component without errors", () => {
//     render(<MockSearchResultGraph />);
//   });

//   it("should display component to view", () => {
//     render(<MockSearchResultGraph />);
//     const componentContainer = screen.getByTitle(/search-result-graph/i);
//     expect(componentContainer).toBeInTheDocument();
//     expect(componentContainer).toBeVisible();
//   });
// });

// describe("testing search-result-wookie-graph component", () => {
//   it("should render component without errors", () => {
//     render(<MockSearchResultWookieGraph />);
//   });

//   it("should display component to view", () => {
//     render(<MockSearchResultWookieGraph />);
//     const componentContainer = screen.getByTitle(/search-result-wookie-graph/i);
//     expect(componentContainer).toBeInTheDocument();
//     expect(componentContainer).toBeVisible();
//   });
// });

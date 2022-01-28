import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../../store";
import SwitchEncoding from "../SwitchEncoding";

const MockSwitchEncoding = () => {
  return (
    <Provider store={store}>
      <Router>
        <SwitchEncoding />
      </Router>
    </Provider>
  );
};

describe("testing switch-encoding component", () => {
  it("should render component without errors", () => {
    render(<MockSwitchEncoding />);
  });

  it("should display component to view", () => {
    render(<MockSwitchEncoding />);
    const componentContainer = screen.getByTitle(/switch-encoding/i);
    expect(componentContainer).toBeInTheDocument();
    expect(componentContainer).toBeVisible();
  });

  //   it("should make JSON the default selected option", () => {
  //     render(<MockSwitchEncoding />);
  //     const radioElement = screen.getByLabelText(/JSON/i);
  //   });

  //   it("should change radio options without errors", () => {
  //     //   const onChangeEncoding = jest.fn();
  //     render(<MockSwitchEncoding />);
  //     const radioElement = screen.getByLabelText(/JSON/i);
  //     console.log(radioElement);
  //     // fireEvent.click(radioElement);
  //     //   expect(radioElement).toBeChecked();
  //   });
});

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../store/index";
import SearchBox from "../SearchBox";

const MockSearchBox = () => {
  return (
    <Provider store={store}>
      <Router>
        <SearchBox />
      </Router>
    </Provider>
  );
};

const setup = () => {
  const utils = render(<MockSearchBox />);
  const searchInputElement = utils.getByPlaceholderText(/search/i);
  const selectInputElement = utils.getByRole("combobox");
  const searchButtonElement = utils.getByRole("button", { type: /Submit/i });
  return {
    searchInputElement,
    selectInputElement,
    searchButtonElement,
    ...utils,
  };
};

it("should render without crashing", () => {
  render(<MockSearchBox />);
});

describe("testing input element for search term", () => {
  it("should render element unto the screen", () => {
    const { searchInputElement } = setup();
    expect(searchInputElement).toBeInTheDocument();
  });

  it("should be empty initially", () => {
    const { searchInputElement } = setup();
    expect(searchInputElement.value).toBe("");
  });

  it("should contain the words typed by the user", async () => {
    const { searchInputElement } = setup();
    fireEvent.change(searchInputElement, { target: { value: "L" } });
    expect(searchInputElement.value).toBe("L");
  });

  it("should display error message if search term is empty after form submission", () => {
    const { searchInputElement, searchButtonElement } = setup();
    fireEvent.change(searchInputElement, { target: { value: "" } });
    fireEvent.click(searchButtonElement);
    const warningElement = screen.getByText(/Enter search term/i);

    expect(warningElement).toBeInTheDocument();
    expect(warningElement).toBeVisible();
  });

  it("should display dropdown of suggested results containing typed letter(s)", () => {
    const { searchInputElement } = setup();
    userEvent.type(searchInputElement, "a");
    const suggestionDropdown = screen.getByTitle("suggestion-dropdown");
    expect(suggestionDropdown).toBeInTheDocument();
  });

  it("should remove dropdown of suggested results if empty", () => {
    const { searchInputElement } = setup();
    userEvent.type(searchInputElement, "");
    const suggestionDropdown = screen.queryByTitle("suggestion-dropdown");
    expect(suggestionDropdown).not.toBeInTheDocument();
  });
});

describe("testing select dropdown for search type", () => {
  it("should render element unto the screen", () => {
    const { selectInputElement } = setup();
    expect(selectInputElement).toBeInTheDocument();
  });

  it("should correctly set default option", () => {
    render(<MockSearchBox />);
    expect(screen.getByRole("option", { name: "people" }).selected).toBe(true);
  });

  it("should display the correct number of options", () => {
    render(<MockSearchBox />);
    expect(screen.getAllByRole("option").length).toBe(2);
  });

  it("should allow user to change search type", () => {
    render(<MockSearchBox />);
    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "planets" })
    );
    expect(screen.getByRole("option", { name: "planets" }).selected).toBe(true);
  });

  //   it("should display error message if character name is empty", () => {
  //     const { nameInputElement, loginButtonElement } = setup();
  //     fireEvent.change(nameInputElement, { target: { value: "" } });
  //     fireEvent.click(loginButtonElement);
  //     const errorElement = screen.getByText(/Enter Character name/i);

  //     expect(errorElement).toBeInTheDocument();
  //     expect(errorElement).toBeVisible();
  //   });

  //   it("should display error message if birth year (password) name is empty", () => {
  //     const { passwordInputElement, loginButtonElement } = setup();
  //     fireEvent.change(passwordInputElement, { target: { value: "" } });
  //     fireEvent.click(loginButtonElement);
  //     const errorElement = screen.getByText(/Enter birth year/i);

  //     expect(errorElement).toBeInTheDocument();
  //     expect(errorElement).toBeVisible();
  //   });
});

import { render, screen } from "@testing-library/react";
import AppContainer from "./AppContainer";

test("renders learn react link", () => {
  render(<AppContainer />);
  const linkElement = screen.getByText(/Filtration Block App/i);
  expect(linkElement).toBeInTheDocument();
});

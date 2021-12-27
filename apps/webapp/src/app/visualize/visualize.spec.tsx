import { render } from "@testing-library/react";

import Visualize from "./visualize";

describe("Visualize", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Visualize />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/vue";
import MyComponent from "./TheNavbar.vue";

// eslint-disable-next-line no-undef
test("it should work", () => {
  const { getByTestId } = render(MyComponent);

  getByTestId("Home");
  getByTestId("About");
});

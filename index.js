import HeadingComponent from "./components/HeadingComponent/index.js";
import CounterComponent from "./components/CounterComponent/index.js";

customElements.define("heading-component", HeadingComponent);
customElements.define("counter-component", CounterComponent);

const button = document.querySelector("[data-counter-button]");
const counter = document.querySelector("[data-counter-display]");

button.addEventListener("click", () => {
  let count = parseInt(counter.getAttribute("count") || 0);
  counter.setAttribute("count", count + 1);
});

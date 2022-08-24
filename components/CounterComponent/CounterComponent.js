import createComponent from "../../lib/createComponent.js";

function renderHook() {
  const { shadowRoot } = this;

  shadowRoot.querySelector(
    "[data-count]",
  ).innerHTML = `You have clicked the button ${this.count} times.`;
}

export default createComponent({
  name: "CounterComponent",
  props: ["count"],
  defaults: { count: "0" },
  renderHook,
});

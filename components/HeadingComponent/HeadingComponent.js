import createComponent from "../../lib/createComponent.js";

function renderHook() {
  const { shadowRoot } = this;

  shadowRoot.querySelector(
    "[data-title]",
  ).innerHTML = `Hello ${this.name}`;
}

export default createComponent({
  name: "HeadingComponent",
  props: ["name"],
  defaults: { name: "Person" },
  renderHook,
});

import textLoader from "./textLoader.js";

export default function createComponent({
  name,
  props,
  defaults,
  renderHook = () => {},
}) {
  const component = {
    [name]: class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        for (const prop of props) {
          this[prop] = defaults[prop];
        }
      }

      static get observedAttributes() {
        return props;
      }

      connectedCallback() {
        this.render();
      }

      attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
        this.render();
      }

      async getTemplate() {
        if (!this.template) {
          this.template = await textLoader(
            `${
              import.meta.url
            }/../../components/${name}/${name}.html`,
            import.meta.url,
          );
        }
        return this.template;
      }

      async render() {
        const { shadowRoot } = this;

        const template = await this.getTemplate();
        const { cssContent, htmlContent } =
          this.htmlToElement(template);
        shadowRoot.innerHTML = "";
        shadowRoot.appendChild(cssContent);
        shadowRoot.appendChild(htmlContent);

        renderHook.call(this);
      }

      htmlToElement(html) {
        const el = document.createElement("template");
        el.innerHTML = html.trim();
        return {
          cssContent: el.content.firstChild,
          htmlContent: el.content.lastChild,
        };
      }
    },
  };

  return component[name];
}

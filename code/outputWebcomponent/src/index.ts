

class OutputWebComponent extends HTMLElement {
  static get observedAttributes() {
    return ['text'];
  }

  text: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }


  connectedCallback() {
    this.render();
    this.text = this.getAttribute("text") || "";
  }

  render() {
    this.shadowRoot!.innerHTML = `
            <style>
              p {
                margin: 10px 50px;
              }
              :host {
                display: block;
                
                border: 2px dotted blue;
                width: 50%;
              }
            </style>
            <p>Output webcomponent</p>
            <p>${this.text}</p>
          `;
  }

  attributeChangedCallback(attrName:string, oldVal:string, newVal:string) {
    if (oldVal !== newVal) {
      this.text=newVal;
    }
    this.render();
  }

}
// Register the custom element
customElements.define('custom-output-component', OutputWebComponent);



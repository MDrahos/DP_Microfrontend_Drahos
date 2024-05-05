

class MyCustomElement extends HTMLElement {
  static get observedAttributes() {
    return ['text'];
  }

  text: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.addEventListener('input-changed',(e)=>console.log(e))
  }


  connectedCallback() {
    this.render();
    this.text = this.getAttribute("text") || "";
  }

  render() {
    this.shadowRoot!.innerHTML = `
            <style>
              :host {
                display: block;
                font-family: sans-serif;
              }
            </style>
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
customElements.define('hello-world', MyCustomElement);



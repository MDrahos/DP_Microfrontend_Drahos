

class InputWebComponent extends HTMLElement {
  _div: HTMLDivElement;
  _input: HTMLInputElement;
  output_id:string ="";
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._div = document.createElement('div');
    this._div.classList.add("inputWebComponent");
    this._div.innerHTML="<p>Input Webcomponent</p>"
    this._input=document.createElement('input');
    this._input.addEventListener("focusout",this._focusOutHandler.bind(this));
    this._div.appendChild(this._input);
  }


  connectedCallback() {
    this.render();
    
    this.output_id=this.getAttribute("output_id") || "";
  }

  render() {
    this.shadowRoot!.append(this._div)
    const sheet = new CSSStyleSheet();
    sheet.replaceSync("div { border: 2px dotted red; width: 50%} p {margin-left: 50px} input{ margin: 10px 50px; width: 80%}");
    this.shadowRoot!.adoptedStyleSheets = [sheet];
  }

  _focusOutHandler(){
    const event = new CustomEvent("input-changed", 
      {
        detail:{
          text:this._input.value,
          output_id:this.output_id
        },
        bubbles: true,
        cancelable: true,
        composed: false
      });
      console.log(this.output_id)
    this.dispatchEvent(event);

  }


}
// Register the custom element
customElements.define('custom-input-component', InputWebComponent);



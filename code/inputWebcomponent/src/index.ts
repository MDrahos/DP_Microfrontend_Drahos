

class InputWebComponent extends HTMLElement {
  _input: HTMLInputElement;
  output_id:string ="";
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._input=document.createElement('input');
    this._input.addEventListener("focusout",this._focusOutHandler.bind(this))
  }


  connectedCallback() {
    this.render();
    
    this.output_id=this.getAttribute("output_id") || "";
  }

  render() {
    this.shadowRoot!.append(this._input)
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



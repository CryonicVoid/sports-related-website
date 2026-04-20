/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `website-bottom-bar`
 * 
 * @demo index.html
 * @element website-bottom-bar
 */
export class WebsiteBottomBar extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "website-bottom-bar";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
  
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
       :host {
    display: block;     /* THIS is the critical line */
  }

  .bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: red;
    color: white;
  }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
        <div class='bar'>

        </div>
    `;
  }
}

globalThis.customElements.define(WebsiteBottomBar.tag, WebsiteBottomBar);
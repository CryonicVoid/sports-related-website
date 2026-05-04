/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `website-top-bar`
 * 
 * @demo index.html
 * @element website-top-bar
 */
export class WebsiteTopBar extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "website-top-bar";
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
    top: var(--ddd-spacing-0);
    left: var(--ddd-spacing-0);
    width: 100%;
    height: 60px;
    background: red;
    color: var(--ddd-theme-default-white);
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

globalThis.customElements.define(WebsiteTopBar.tag, WebsiteTopBar);
/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `sports-related-website`
 * 
 * @demo index.html
 * @element sports-related-website
 */
export class SportsRelatedWebsite extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "sports-related-website";
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
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
     
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    
    `;
  }
}

globalThis.customElements.define(SportsRelatedWebsite.tag, SportsRelatedWebsite);
/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

// Page imports
import "./home-page.js";
import "./events-page.js";
import "./players-page.js";

/**
 * `sports-related-website`
 * Root application shell. Manages client-side routing by:
 *  1. Reading the initial route from window.location.pathname
 *  2. Listening for `route-change` CustomEvents bubbled up from any child
 *  3. Using History API (pushState) so the URL updates with each navigation
 *  4. Listening for the browser's `popstate` event to handle back/forward
 *
 * The active route string is passed as `active-route` to `sport-site-top-bar`
 * so it can highlight the correct nav item.
 *
 * @element sports-related-website
 */
export class SportsRelatedWebsite extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "sports-related-website";
  }

  constructor() {
    super();
    // Initialize route from current browser URL path
    this.route = window.location.pathname || "/";
    // Bind popstate handler so we can remove it on disconnect
    this._boundPopState = this._onPopState.bind(this);
  }

  static get properties() {
    return {
      ...super.properties,
      route: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          height: 100%;
          color: var(--ddd-theme-primary);
          background-color: #03080f;
          font-family: var(--ddd-font-navigation);
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for route-change events bubbled from anywhere in the tree
    this.addEventListener("route-change", this._onRouteChange);
    // Handle browser back/forward navigation
    window.addEventListener("popstate", this._boundPopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("route-change", this._onRouteChange);
    window.removeEventListener("popstate", this._boundPopState);
  }

  /**
   * Handles `route-change` CustomEvents from child components (links, buttons, etc.).
   * Updates the internal route and pushes a new history entry.
   * @param {CustomEvent} e - detail: { path: String }
   */
  _onRouteChange(e) {
    const path = e.detail?.path;
    if (!path || path === this.route) return;
    this.route = path;
    // Update the browser URL without a full page reload
    window.history.pushState({ path }, "", path);
  }

  /**
   * Handles the browser's popstate event (back/forward buttons).
   * Syncs the internal route to the URL the browser navigated to.
   * @param {PopStateEvent} e
   */
  _onPopState(e) {
    this.route = window.location.pathname || "/";
  }

  /**
   * Resolves the current route string to its corresponding page element template.
   * Unknown routes fall back to the home page.
   * @returns {TemplateResult}
   */
  _renderPage() {
    switch (this.route) {
      case "/events":
        return html`<events-page></events-page>`;
      case "/players":
        return html`<players-page></players-page>`;
      case "/":
      default:
        return html`<home-page></home-page>`;
    }
  }

  render() {
    return html`${this._renderPage()}`;
  }
}

globalThis.customElements.define(SportsRelatedWebsite.tag, SportsRelatedWebsite);
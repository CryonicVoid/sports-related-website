/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `sub-tab-dropdown`
 * A button that toggles a dropdown list of clickable items.
 * Closes when clicking outside.
 *
 * @element sub-tab-dropdown
 *
 * @attr {String} label  - The trigger button label
 * @attr {Array}  items  - Array of { label: String, href?: String } objects
 *                         Pass as JSON string attribute or set property directly.
 *
 * @fires dropdown-select - detail: { label, href } when an item is chosen
 * @fires route-change    - detail: { path } when an internal href item is chosen
 */
export class SubTabDropdown extends DDDSuper(LitElement) {
  static get tag() {
    return "sub-tab-dropdown";
  }

  constructor() {
    super();
    this.label = "Menu";
    this.items = [];
    this._open = false;
    this._boundClose = this._closeOutside.bind(this);
  }

  static get properties() {
    return {
      ...super.properties,
      label: { type: String },
      items: { type: Array },
      _open: { type: Boolean, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          position: relative;
        }

        .trigger {
          background: transparent;
          border: none;
          color: #b0cfe8;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 4px;
          transition: color 0.18s;
        }

        .trigger:hover {
          color: #fff;
        }

        /* Chevron rotates when open */
        .chevron {
          width: 11px;
          height: 11px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.2s ease;
        }

        :host([open]) .chevron {
          transform: rotate(180deg);
        }

        .dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          min-width: 160px;
          background: #0d1826;
          border: 1px solid rgba(100,180,255,0.2);
          border-radius: 4px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          z-index: 1000;
          overflow: hidden;

          transform-origin: top left;
          transform: scaleY(0);
          opacity: 0;
          transition: transform 0.18s ease, opacity 0.18s ease;
          pointer-events: none;
        }

        .dropdown.open {
          transform: scaleY(1);
          opacity: 1;
          pointer-events: all;
        }

        .item {
          display: block;
          width: 100%;
          background: transparent;
          border: none;
          color: #90b8d8;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 10px 16px;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.14s, color 0.14s;
        }

        .item:last-child {
          border-bottom: none;
        }

        .item:hover {
          background: rgba(100,180,255,0.08);
          color: #fff;
        }
      `,
    ];
  }

  /**
   * Toggle the open/closed state of the dropdown.
   * Attaches/removes a global click listener for outside-click closing.
   */
  _toggle() {
    this._open = !this._open;
    if (this._open) {
      this.setAttribute("open", "");
      // Defer so this click doesn't immediately trigger closeOutside
      requestAnimationFrame(() => {
        document.addEventListener("click", this._boundClose);
      });
    } else {
      this.removeAttribute("open");
      document.removeEventListener("click", this._boundClose);
    }
  }

  /**
   * Closes the dropdown when a click occurs outside this element.
   * @param {MouseEvent} e
   */
  _closeOutside(e) {
    if (!this.contains(e.target)) {
      this._open = false;
      this.removeAttribute("open");
      document.removeEventListener("click", this._boundClose);
    }
  }

  /**
   * Handles selection of a dropdown item.
   * Fires `dropdown-select` and `route-change` (for internal routes).
   * @param {{ label: String, href?: String }} item
   */
  _selectItem(item) {
    this.dispatchEvent(
      new CustomEvent("dropdown-select", {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );

    if (item.href && !item.href.startsWith("http") && !item.href.startsWith("//")) {
      this.dispatchEvent(
        new CustomEvent("route-change", {
          detail: { path: item.href },
          bubbles: true,
          composed: true,
        })
      );
    }

    this._open = false;
    this.removeAttribute("open");
    document.removeEventListener("click", this._boundClose);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._boundClose);
  }

  render() {
    return html`
      <button class="trigger" @click=${this._toggle}>
        ${this.label}
        <svg class="chevron" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div class="dropdown ${this._open ? "open" : ""}">
        ${this.items.map(
          (item) => html`
            <button class="item" @click=${() => this._selectItem(item)}>
              ${item.label}
            </button>
          `
        )}
      </div>
    `;
  }
}

globalThis.customElements.define(SubTabDropdown.tag, SubTabDropdown);
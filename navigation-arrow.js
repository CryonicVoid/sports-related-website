/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `navigation-arrow`
 * A directional arrow button. When clicked, fires a `nav-change` event
 * so the parent component can update its active index.
 *
 * @element navigation-arrow
 *
 * @attr {String}  direction - "left" or "right" (default "right")
 * @attr {Boolean} disabled  - Grays out and prevents interaction when true
 *
 * @fires nav-change - detail: { direction: "left"|"right" }
 */
export class NavigationArrow extends DDDSuper(LitElement) {
  static get tag() {
    return "navigation-arrow";
  }

  constructor() {
    super();
    this.direction = "right";
    this.disabled = false;
  }

  static get properties() {
    return {
      ...super.properties,
      direction: { type: String },
      disabled: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        button {
          background: transparent;
          border: 1.5px solid rgba(100, 180, 255, 0.35);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7ec8ff;
          transition: background 0.18s, border-color 0.18s, transform 0.15s, color 0.18s;
          outline: none;
          padding: 0;
        }

        button:hover:not(:disabled) {
          background: rgba(100, 180, 255, 0.12);
          border-color: #7ec8ff;
          transform: scale(1.1);
          color: #fff;
        }

        button:active:not(:disabled) {
          transform: scale(0.95);
        }

        button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `,
    ];
  }

  /**
   * Fires a `nav-change` custom event bubbling up through the DOM.
   * @param {Event} e - The click event
   */
  _handleClick(e) {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent("nav-change", {
        detail: { direction: this.direction },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    // SVG chevron points based on direction
    const isLeft = this.direction === "left";
    const d = isLeft ? "M14 18l-6-6 6-6" : "M10 6l6 6-6 6";

    return html`
      <button
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        aria-label="${isLeft ? "Previous" : "Next"}"
        title="${isLeft ? "Previous" : "Next"}"
      >
        <svg viewBox="0 0 24 24">
          <path d=${d} />
        </svg>
      </button>
    `;
  }
}

globalThis.customElements.define(NavigationArrow.tag, NavigationArrow);
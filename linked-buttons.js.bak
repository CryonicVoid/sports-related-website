/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `linked-buttons`
 * A styled anchor-button that navigates to an internal route or external URL.
 *
 * @element linked-buttons
 *
 * @attr {String}  href     - Destination URL or route (e.g. "/events" or "https://...")
 * @attr {String}  label    - Button text
 * @attr {String}  variant  - "primary" | "ghost" | "danger" (default "primary")
 * @attr {Boolean} external - Opens in a new tab when true
 *
 * @fires route-change - Fires for internal routes. detail: { path: String }
 *                       The parent router should listen and update its route property.
 */
export class LinkedButtons extends DDDSuper(LitElement) {
  static get tag() {
    return "linked-buttons";
  }

  constructor() {
    super();
    this.href = "/";
    this.label = "Link";
    this.variant = "primary";
    this.external = false;
  }

  static get properties() {
    return {
      ...super.properties,
      href: { type: String },
      label: { type: String },
      variant: { type: String, reflect: true },
      external: { type: Boolean },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
        }

        a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 3px;
          padding: 8px 18px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.12s;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer sweep on hover */
        a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        a:hover::after {
          transform: translateX(100%);
        }

        /* Primary — solid blue */
        :host([variant="primary"]) a,
        :host(:not([variant])) a {
          background: #1565c0;
          color: #e8f4ff;
          border: 1.5px solid #1976d2;
          box-shadow: 0 0 12px rgba(21,101,192,0.4);
        }
        :host([variant="primary"]) a:hover,
        :host(:not([variant])) a:hover {
          background: #1976d2;
          box-shadow: 0 0 22px rgba(33,150,243,0.55);
          transform: translateY(-1px);
        }

        /* Ghost — transparent with border */
        :host([variant="ghost"]) a {
          background: transparent;
          color: #90caf9;
          border: 1.5px solid rgba(100,180,255,0.4);
        }
        :host([variant="ghost"]) a:hover {
          background: rgba(100,180,255,0.08);
          border-color: #90caf9;
          color: #fff;
        }

        /* Danger */
        :host([variant="danger"]) a {
          background: rgba(183,28,28,0.7);
          color: #ffcdd2;
          border: 1.5px solid #c62828;
        }
        :host([variant="danger"]) a:hover {
          background: #c62828;
          color: #fff;
        }

        a:active {
          transform: scale(0.97) translateY(0);
        }
      `,
    ];
  }

  /**
   * Intercepts clicks on internal routes (no "http" or "//") to fire
   * a `route-change` event instead of navigating the page.
   * @param {MouseEvent} e
   */
  _handleClick(e) {
    const isExternal =
      this.external ||
      this.href.startsWith("http") ||
      this.href.startsWith("//");
    if (!isExternal) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("route-change", {
          detail: { path: this.href },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const target = this.external ? "_blank" : "_self";
    const rel = this.external ? "noopener noreferrer" : undefined;
    return html`
      <a
        href=${this.href}
        target=${target}
        rel=${rel ?? ""}
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </a>
    `;
  }
}

globalThis.customElements.define(LinkedButtons.tag, LinkedButtons);
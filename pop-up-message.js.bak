/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `pop-up-message`
 * A modal overlay that displays a header and body text.
 * Used for warnings, event details, or confirmation prompts.
 *
 * Open via: element.open({ heading, body })
 * Close via: clicking the backdrop, pressing Escape, or calling element.close()
 *
 * @element pop-up-message
 *
 * @attr {String}  heading  - Title text
 * @attr {String}  body     - Body paragraph text
 * @attr {Boolean} opened   - Whether the modal is currently visible (reflects to attr)
 *
 * @fires popup-closed - Fires when the modal is dismissed
 */
export class PopUpMessage extends DDDSuper(LitElement) {
  static get tag() {
    return "pop-up-message";
  }

  constructor() {
    super();
    this.heading = "";
    this.body = "";
    this.opened = false;
    this._boundKeydown = this._onKeydown.bind(this);
  }

  static get properties() {
    return {
      ...super.properties,
      heading: { type: String },
      body: { type: String },
      opened: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: contents;
        }

        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 4, 14, 0.78);
          backdrop-filter: blur(4px);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;

          opacity: 0;
          pointer-events: none;
          transition: opacity 0.22s ease;
        }

        :host([opened]) .backdrop {
          opacity: 1;
          pointer-events: all;
        }

        .panel {
          background: #080f1c;
          border: 1px solid rgba(100,180,255,0.25);
          border-radius: 6px;
          box-shadow: 0 0 60px rgba(0,80,200,0.2), 0 24px 64px rgba(0,0,0,0.7);
          max-width: 480px;
          width: 90vw;
          padding: 32px 36px;
          position: relative;
          transform: translateY(20px) scale(0.97);
          transition: transform 0.25s ease, opacity 0.22s ease;
          opacity: 0;
        }

        :host([opened]) .panel {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* Accent glow line at top */
        .panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b8bff, transparent);
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 16px;
          background: transparent;
          border: none;
          color: #5a7da0;
          cursor: pointer;
          font-size: 1.3rem;
          line-height: 1;
          padding: 4px 6px;
          transition: color 0.15s;
        }

        .close-btn:hover {
          color: #fff;
        }

        h3 {
          margin: 0 0 14px 0;
          color: #e0f0ff;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Thin separator below heading */
        h3::after {
          content: "";
          display: block;
          margin-top: 10px;
          height: 1px;
          background: rgba(100,180,255,0.15);
        }

        p {
          margin: 0;
          color: #7a9fc0;
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .actions {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }

        .dismiss-btn {
          background: #1565c0;
          color: #e8f4ff;
          border: 1.5px solid #1976d2;
          border-radius: 3px;
          padding: 7px 20px;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
        }

        .dismiss-btn:hover {
          background: #1976d2;
          box-shadow: 0 0 18px rgba(33,150,243,0.4);
        }
      `,
    ];
  }

  /**
   * Opens the popup with the provided content.
   * @param {{ heading?: String, body?: String }} options
   */
  open({ heading = "", body = "" } = {}) {
    this.heading = heading;
    this.body = body;
    this.opened = true;
    document.addEventListener("keydown", this._boundKeydown);
  }

  /**
   * Closes the popup and fires the `popup-closed` event.
   */
  close() {
    this.opened = false;
    document.removeEventListener("keydown", this._boundKeydown);
    this.dispatchEvent(
      new CustomEvent("popup-closed", { bubbles: true, composed: true })
    );
  }

  /**
   * Closes the popup when the Escape key is pressed.
   * @param {KeyboardEvent} e
   */
  _onKeydown(e) {
    if (e.key === "Escape") this.close();
  }

  /**
   * Handles clicks on the backdrop — closes if clicking outside the panel.
   * @param {MouseEvent} e
   */
  _onBackdropClick(e) {
    if (e.target === e.currentTarget) this.close();
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-labelledby="popup-heading">
          <button class="close-btn" @click=${() => this.close()} aria-label="Close">✕</button>
          <h3 id="popup-heading">${this.heading}</h3>
          <p>${this.body}</p>
          <div class="actions">
            <button class="dismiss-btn" @click=${() => this.close()}>Dismiss</button>
          </div>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(PopUpMessage.tag, PopUpMessage);
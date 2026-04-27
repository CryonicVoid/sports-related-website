/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `interactive-icon-image`
 * An icon that swaps to an alternate image on hover, regardless of z-index.
 * Used for nav buttons and social media icons.
 *
 * @element interactive-icon-image
 *
 * @attr {String} src       - Default image URL
 * @attr {String} hover-src - Image URL shown on hover
 * @attr {String} alt       - Alt text for accessibility
 * @attr {Number} size      - Icon size in px (default 28)
 */
export class InteractiveIconImage extends DDDSuper(LitElement) {
  static get tag() {
    return "interactive-icon-image";
  }

  constructor() {
    super();
    this.src = "";
    this.hoverSrc = "";
    this.alt = "";
    this.size = 28;
    this._hovered = false;
  }

  static get properties() {
    return {
      ...super.properties,
      src: { type: String },
      hoverSrc: { type: String, attribute: "hover-src" },
      alt: { type: String },
      size: { type: Number },
      _hovered: { type: Boolean, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          cursor: pointer;
        }

        .icon-wrap {
          position: relative;
          display: inline-block;
        }

        img {
          display: block;
          transition: opacity 0.2s ease, transform 0.2s ease;
          object-fit: contain;
        }

        img.default {
          opacity: 1;
        }

        img.hover-img {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }

        /* When hovered, swap visibility */
        :host([data-hovered]) img.default {
          opacity: 0;
          transform: scale(0.85);
        }
        :host([data-hovered]) img.hover-img {
          opacity: 1;
          transform: scale(1.1);
        }
      `,
    ];
  }

  /**
   * Handle pointer enter — set hovered state and reflect attribute for CSS targeting.
   */
  _onEnter() {
    this._hovered = true;
    this.setAttribute("data-hovered", "");
  }

  /**
   * Handle pointer leave — clear hovered state and remove attribute.
   */
  _onLeave() {
    this._hovered = false;
    this.removeAttribute("data-hovered");
  }

  render() {
    const px = `${this.size}px`;
    return html`
      <div
        class="icon-wrap"
        @pointerenter=${this._onEnter}
        @pointerleave=${this._onLeave}
        style="width:${px};height:${px};"
      >
        <img
          class="default"
          src=${this.src}
          alt=${this.alt}
          width=${this.size}
          height=${this.size}
        />
        ${this.hoverSrc
          ? html`<img
              class="hover-img"
              src=${this.hoverSrc}
              alt=${this.alt}
              width=${this.size}
              height=${this.size}
            />`
          : ""}
      </div>
    `;
  }
}

globalThis.customElements.define(InteractiveIconImage.tag, InteractiveIconImage);
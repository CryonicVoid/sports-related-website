
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./linked-buttons.js";
import "./sub-tab-dropdown.js";
import "./interactive-icon-image.js";

/**
 * `sport-site-top-bar`
 * Fixed navigation bar anchored to the top of the viewport.
 * Contains the team logo/name, nav links (with a dropdown for sub-pages),
 * and icon buttons. Fires `route-change` events for SPA navigation.
 *
 * @element sport-site-top-bar
 *
 * @attr {String} active-route - Current route, used to highlight the active nav item.
 *
 * @fires route-change - detail: { path: String } — forwarded from child links
 */
export class SportSiteTopBar extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "sport-site-top-bar";
  }

  constructor() {
    super();
    this.activeRoute = "/";
  }

  static get properties() {
    return {
      ...super.properties,
      activeRoute: { type: String, attribute: "active-route" },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
          z-index: 500;
        }

        .bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px;
          background: rgba(4, 10, 22, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(100,180,255,0.12);
          box-shadow: 0 2px 28px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          padding: 0 28px;
          gap: 0;
          box-sizing: border-box;
        }

        /* Bottom scan-line accent */
        .bar::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(59,139,255,0.4) 30%,
            rgba(79,195,247,0.6) 50%,
            rgba(59,139,255,0.4) 70%,
            transparent 100%
          );
        }

        /* === Logo / Team name === */
        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .logo-emblem {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          border: 1.5px solid rgba(79,195,247,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          color: #90caf9;
          letter-spacing: 0.02em;
          box-shadow: 0 0 14px rgba(21,101,192,0.5);
          transition: box-shadow 0.2s;
        }

        .logo-area:hover .logo-emblem {
          box-shadow: 0 0 24px rgba(79,195,247,0.55);
        }

        .logo-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #d0eaff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }

        .logo-sub {
          font-size: 0.58rem;
          color: #3a6080;
          letter-spacing: 0.18em;
          display: block;
          text-transform: uppercase;
        }

        /* === Navigation === */
        nav {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 36px;
          flex: 1;
        }

        .nav-link {
          background: transparent;
          border: none;
          color: #7aa8cc;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 3px;
          position: relative;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #e8f4ff;
          background: rgba(100,180,255,0.07);
        }

        /* Active underline indicator */
        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 1.5px;
          background: #3b8bff;
          border-radius: 1px;
        }

        /* === Right-side icons area === */
        .icons {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* Placeholder icon button (for search / account) */
        .icon-btn {
          background: transparent;
          border: 1px solid rgba(100,180,255,0.18);
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #5a8ab0;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }

        .icon-btn:hover {
          color: #90caf9;
          border-color: rgba(100,180,255,0.4);
          background: rgba(100,180,255,0.06);
        }

        .icon-btn svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `,
    ];
  }

  /**
   * Navigates to the home route by firing route-change.
   */
  _goHome() {
    this.dispatchEvent(
      new CustomEvent("route-change", {
        detail: { path: "/" },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Navigates to a given path when a nav button is clicked.
   * @param {String} path - Route path e.g. "/events"
   */
  _navigate(path) {
    this.dispatchEvent(
      new CustomEvent("route-change", {
        detail: { path },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Returns "active" class string if the given path matches the active route.
   * @param {String} path
   * @returns {String}
   */
  _activeClass(path) {
    return this.activeRoute === path ? "nav-link active" : "nav-link";
  }

  render() {
    // Roster sub-pages dropdown items
    const rosterItems = [
      { label: "All Players", href: "/players" },
      { label: "Offense", href: "/players" },
      { label: "Defense", href: "/players" },
      { label: "Coaches", href: "/players" },
    ];

    return html`
      <div class="bar">
        <!-- Logo -->
        <div class="logo-area" @click=${this._goHome}>
          <div class="logo-emblem">CRH</div>
          <div class="logo-name">
            Crimson Hawks
            <span class="logo-sub">Athletics</span>
          </div>
        </div>

        <!-- Navigation links -->
        <nav>
          <button
            class=${this._activeClass("/")}
            @click=${() => this._navigate("/")}
          >Home</button>

          <button
            class=${this._activeClass("/events")}
            @click=${() => this._navigate("/events")}
          >Schedule</button>

          <!-- Roster uses a dropdown for sub-sections -->
          <sub-tab-dropdown
            label="Roster"
            .items=${rosterItems}
          ></sub-tab-dropdown>

          <button
            class=${this._activeClass("/players")}
            @click=${() => this._navigate("/players")}
          >Players</button>
        </nav>

        <!-- Right-side icon buttons -->
        <div class="icons">
          <!-- Search icon -->
          <button class="icon-btn" aria-label="Search" title="Search">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>

          <!-- Account icon -->
          <button class="icon-btn" aria-label="Account" title="Account">
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Spacer so content isn't hidden behind fixed bar -->
      <div style="height:64px;"></div>
    `;
  }
}

globalThis.customElements.define(SportSiteTopBar.tag, SportSiteTopBar);
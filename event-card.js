/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `event-card`
 * Displays a single event in card format with date, name, home/away badge,
 * opponent, location, category, and description.
 *
 * @element event-card
 *
 * @attr {Number}  timestamp   - Unix ms timestamp of the event
 * @attr {String}  name        - Event name / matchup title
 * @attr {Boolean} is-home     - true = Home game, false = Away
 * @attr {String}  opponent    - Opposing team name
 * @attr {String}  location    - Venue string
 * @attr {String}  description - Short description text
 * @attr {String}  category    - "Regular Season" | "Playoffs" | "Exhibition"
 *
 * @fires event-detail - detail: { event object } when "More Info" is clicked
 */
export class EventCard extends DDDSuper(LitElement) {
  static get tag() {
    return "event-card";
  }

  constructor() {
    super();
    this.timestamp = Date.now();
    this.name = "";
    this.isHome = true;
    this.opponent = "";
    this.location = "";
    this.description = "";
    this.category = "Regular Season";
  }

  static get properties() {
    return {
      ...super.properties,
      timestamp: { type: Number },
      name: { type: String },
      isHome: { type: Boolean, attribute: "is-home" },
      opponent: { type: String },
      location: { type: String },
      description: { type: String },
      category: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .card {
          background: linear-gradient(135deg, #080f1c 0%, #0c1828 100%);
          border: 1px solid rgba(100,180,255,0.15);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative;
        }

        .card:hover {
          border-color: rgba(100,180,255,0.4);
          box-shadow: 0 0 32px rgba(0,80,200,0.18);
          transform: translateY(-2px);
        }

        /* Left-side accent bar */
        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
        }

        :host .card.home::before  { background: #3b8bff; }
        :host .card.away::before  { background: #ff8a00; }
        :host .card.playoffs::before { background: #b71c1c; }

        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 16px 20px 12px 22px;
          gap: 12px;
        }

        .date-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 48px;
        }

        .date-month {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4a7090;
        }

        .date-day {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #e0f0ff;
          line-height: 1;
        }

        .date-time {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.7rem;
          color: #4a7090;
          margin-top: 2px;
        }

        .divider-v {
          width: 1px;
          background: rgba(100,180,255,0.1);
          align-self: stretch;
          margin: 0 4px;
        }

        .info {
          flex: 1;
        }

        .badges {
          display: flex;
          gap: 6px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .badge {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 2px;
        }

        .badge.home {
          background: rgba(59,139,255,0.15);
          color: #3b8bff;
          border: 1px solid rgba(59,139,255,0.3);
        }

        .badge.away {
          background: rgba(255,138,0,0.12);
          color: #ff9800;
          border: 1px solid rgba(255,138,0,0.3);
        }

        .badge.playoffs {
          background: rgba(183,28,28,0.15);
          color: #ef5350;
          border: 1px solid rgba(183,28,28,0.35);
        }

        .badge.exhibition {
          background: rgba(126,118,255,0.12);
          color: #9c8fff;
          border: 1px solid rgba(126,118,255,0.3);
        }

        .event-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #d0e8ff;
          letter-spacing: 0.03em;
          margin: 0 0 4px 0;
          text-transform: uppercase;
        }

        .location {
          font-size: 0.75rem;
          color: #4a7090;
          letter-spacing: 0.04em;
        }

        .body {
          padding: 0 20px 16px 22px;
        }

        .description {
          font-size: 0.82rem;
          color: #5d8aaa;
          line-height: 1.55;
          margin: 0 0 12px 0;
        }

        .more-btn {
          background: transparent;
          border: 1px solid rgba(100,180,255,0.25);
          color: #5a9fd4;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }

        .more-btn:hover {
          background: rgba(100,180,255,0.08);
          color: #90caf9;
          border-color: #90caf9;
        }
      `,
    ];
  }

  /**
   * Returns the CSS class for the card accent based on category/home status.
   * @returns {String}
   */
  _cardClass() {
    if (this.category === "Playoffs") return "card playoffs";
    return this.isHome ? "card home" : "card away";
  }

  /**
   * Formats a Unix ms timestamp into a structured date object.
   * @param {Number} ts
   * @returns {{ month: String, day: String, time: String }}
   */
  _parseDate(ts) {
    const d = new Date(ts);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }),
      day: String(d.getDate()),
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  }

  /**
   * Fires `event-detail` so a parent can open a popup with full info.
   */
  _onMoreInfo() {
    this.dispatchEvent(
      new CustomEvent("event-detail", {
        detail: {
          timestamp: this.timestamp,
          name: this.name,
          isHome: this.isHome,
          opponent: this.opponent,
          location: this.location,
          description: this.description,
          category: this.category,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Returns the badge class string based on category and home/away.
   * @returns {String}
   */
  _badgeClass() {
    if (this.category === "Playoffs") return "badge playoffs";
    if (this.category === "Exhibition") return "badge exhibition";
    return this.isHome ? "badge home" : "badge away";
  }

  render() {
    const { month, day, time } = this._parseDate(this.timestamp);
    return html`
      <div class=${this._cardClass()}>
        <div class="header">
          <div class="date-col">
            <div class="date-month">${month}</div>
            <div class="date-day">${day}</div>
            <div class="date-time">${time}</div>
          </div>
          <div class="divider-v"></div>
          <div class="info">
            <div class="badges">
              <span class=${this._badgeClass()}>
                ${this.category === "Regular Season"
                  ? this.isHome ? "Home" : "Away"
                  : this.category}
              </span>
            </div>
            <div class="event-name">${this.name}</div>
            <div class="location">📍 ${this.location}</div>
          </div>
        </div>
        <div class="body">
          <p class="description">${this.description}</p>
          <button class="more-btn" @click=${this._onMoreInfo}>More Info →</button>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(EventCard.tag, EventCard);
/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `calendar-date-card`
 * A single day cell used inside the scheduling calendar grid.
 * Highlights days that have events; shows a dot indicator per event.
 *
 * @element calendar-date-card
 *
 * @attr {Number}  day        - Day of the month (1–31)
 * @attr {Boolean} today      - True if this cell represents today
 * @attr {Boolean} other-month - True if day belongs to adjacent month (greyed)
 * @attr {Array}   events     - Array of event objects on this day (for dot indicators)
 * @attr {Boolean} selected   - True when this date is currently selected/focused
 *
 * @fires date-selected - detail: { day, events } when the cell is clicked
 */
export class CalendarDateCard extends DDDSuper(LitElement) {
  static get tag() {
    return "calendar-date-card";
  }

  constructor() {
    super();
    this.day = 0;
    this.today = false;
    this.otherMonth = false;
    this.events = [];
    this.selected = false;
  }

  static get properties() {
    return {
      ...super.properties,
      day: { type: Number },
      today: { type: Boolean, reflect: true },
      otherMonth: { type: Boolean, attribute: "other-month", reflect: true },
      events: { type: Array },
      selected: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .cell {
          position: relative;
          min-height: 56px;
          padding: 6px 8px;
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          background: rgba(10, 22, 40, 0.6);
        }

        .cell:hover {
          background: rgba(30, 65, 110, 0.5);
          border-color: rgba(100,180,255,0.2);
        }

        /* Today highlight */
        :host([today]) .cell {
          border-color: rgba(79,195,247,0.5);
          background: rgba(13, 60, 100, 0.55);
        }

        /* Selected state */
        :host([selected]) .cell {
          border-color: #3b8bff;
          background: rgba(21,101,192,0.25);
          box-shadow: inset 0 0 0 1px #3b8bff;
        }

        /* Other-month days are dimmed */
        :host([other-month]) .cell {
          opacity: 0.3;
          pointer-events: none;
        }

        .day-num {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #7aa8cc;
          line-height: 1;
        }

        :host([today]) .day-num {
          color: #4fc3f7;
        }

        :host([selected]) .day-num {
          color: #90caf9;
        }

        /* Event dot indicators */
        .dots {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 4px;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1565c0;
        }

        .dot.home {
          background: #3b8bff;
          box-shadow: 0 0 4px rgba(59,139,255,0.7);
        }

        .dot.away {
          background: #ff8a00;
          box-shadow: 0 0 4px rgba(255,138,0,0.6);
        }

        .dot.playoffs {
          background: #b71c1c;
          box-shadow: 0 0 4px rgba(183,28,28,0.7);
        }
      `,
    ];
  }

  /**
   * Emits a `date-selected` event so the parent calendar can display event details.
   */
  _onClick() {
    if (this.otherMonth) return;
    this.dispatchEvent(
      new CustomEvent("date-selected", {
        detail: { day: this.day, events: this.events },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Maps an event's category / isHome flag to a dot CSS class.
   * @param {{ isHome: Boolean, category: String }} event
   * @returns {String}
   */
  _dotClass(event) {
    if (event.category === "Playoffs") return "dot playoffs";
    return event.isHome ? "dot home" : "dot away";
  }

  render() {
    return html`
      <div class="cell" @click=${this._onClick}>
        <div class="day-num">${this.day}</div>
        <div class="dots">
          ${this.events.map((ev) => html`<span class="${this._dotClass(ev)}"></span>`)}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(CalendarDateCard.tag, CalendarDateCard);
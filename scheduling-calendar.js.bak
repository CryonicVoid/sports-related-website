/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { events } from "./events-data.js";
import "./calendar-date-card.js";
import "./navigation-arrow.js";
import "./time-display-calendar.js";
import "./pop-up-message.js";

/**
 * `scheduling-calendar`
 * A monthly grid calendar that reads from events-data.js and highlights
 * days with scheduled events. Clicking a day opens a popup with event info.
 * Month navigation via NavigationArrow components.
 *
 * @element scheduling-calendar
 */
export class SchedulingCalendar extends DDDSuper(LitElement) {
  static get tag() {
    return "scheduling-calendar";
  }

  constructor() {
    super();
    const now = new Date();
    // viewYear and viewMonth track which month the calendar is currently showing
    this.viewYear = now.getFullYear();
    this.viewMonth = now.getMonth(); // 0-indexed
    this._selectedDay = null;
  }

  static get properties() {
    return {
      ...super.properties,
      viewYear: { type: Number },
      viewMonth: { type: Number },
      _selectedDay: { type: Number, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .calendar-shell {
          background: rgba(5, 12, 24, 0.8);
          border: 1px solid rgba(100,180,255,0.12);
          border-radius: 8px;
          overflow: hidden;
        }

        .cal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(100,180,255,0.1);
          gap: 12px;
        }

        .time-wrap {
          flex: 1;
        }

        .nav-arrows {
          display: flex;
          gap: 8px;
        }

        /* Day-of-week header row */
        .dow-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          padding: 8px 12px 0;
          gap: 3px;
        }

        .dow-label {
          text-align: center;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2c4a60;
          padding-bottom: 6px;
        }

        /* Calendar day grid */
        .day-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
          padding: 3px 12px 12px;
        }

        /* Legend */
        .legend {
          display: flex;
          gap: 16px;
          padding: 10px 16px;
          border-top: 1px solid rgba(100,180,255,0.07);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #3a5570;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-dot.home { background: #3b8bff; }
        .legend-dot.away { background: #ff8a00; }
        .legend-dot.playoffs { background: #b71c1c; }
      `,
    ];
  }

  /**
   * Returns a Unix ms timestamp representing the first moment of the viewed month.
   * Used by `time-display-calendar` to show the month label.
   * @returns {Number}
   */
  get _viewTimestamp() {
    return new Date(this.viewYear, this.viewMonth, 1).getTime();
  }

  /**
   * Builds the grid of day-cell data for the current view month.
   * Includes padding cells from the previous and next months.
   * @returns {Array<{ day: Number, month: Number, year: Number, events: Array, otherMonth: Boolean }>}
   */
  _buildGrid() {
    const year = this.viewYear;
    const month = this.viewMonth;

    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    // Fill leading cells from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, month: month - 1, year, events: [], otherMonth: true });
    }

    // Fill current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(year, month, d);
      const dayEvents = events.filter((ev) => {
        const evDate = new Date(ev.timestamp);
        return (
          evDate.getFullYear() === year &&
          evDate.getMonth() === month &&
          evDate.getDate() === d
        );
      });
      cells.push({ day: d, month, year, events: dayEvents, otherMonth: false });
    }

    // Fill trailing cells to complete the last row (up to 42 cells for 6 rows)
    let trail = 1;
    while (cells.length % 7 !== 0) {
      cells.push({ day: trail++, month: month + 1, year, events: [], otherMonth: true });
    }

    return cells;
  }

  /**
   * Handles nav-change events from NavigationArrow to move between months.
   * @param {CustomEvent} e - detail: { direction: "left"|"right" }
   */
  _onNavChange(e) {
    const dir = e.detail.direction;
    if (dir === "left") {
      if (this.viewMonth === 0) {
        this.viewMonth = 11;
        this.viewYear -= 1;
      } else {
        this.viewMonth -= 1;
      }
    } else {
      if (this.viewMonth === 11) {
        this.viewMonth = 0;
        this.viewYear += 1;
      } else {
        this.viewMonth += 1;
      }
    }
  }

  /**
   * Handles date-selected events from calendar-date-card cells.
   * Shows a popup if events exist on that day.
   * @param {CustomEvent} e - detail: { day, events }
   */
  _onDateSelected(e) {
    const { day, events: dayEvents } = e.detail;
    this._selectedDay = day;
    if (dayEvents.length === 0) return;

    const popup = this.shadowRoot.querySelector("pop-up-message");
    const ev = dayEvents[0];
    const d = new Date(ev.timestamp);
    popup.open({
      heading: ev.name,
      body: `${ev.isHome ? "🏠 Home" : "✈ Away"} · ${ev.category}
📍 ${ev.location}
🕐 ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}

${ev.description}`,
    });
  }

  render() {
    const grid = this._buildGrid();
    const today = new Date();
    const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return html`
      <div class="calendar-shell">
        <div class="cal-header">
          <time-display-calendar
            class="time-wrap"
            view-timestamp=${this._viewTimestamp}
          ></time-display-calendar>
          <div class="nav-arrows">
            <navigation-arrow
              direction="left"
              @nav-change=${this._onNavChange}
            ></navigation-arrow>
            <navigation-arrow
              direction="right"
              @nav-change=${this._onNavChange}
            ></navigation-arrow>
          </div>
        </div>

        <div class="dow-row">
          ${DOW.map((d) => html`<div class="dow-label">${d}</div>`)}
        </div>

        <div class="day-grid" @date-selected=${this._onDateSelected}>
          ${grid.map((cell) => {
            const isToday =
              !cell.otherMonth &&
              cell.day === today.getDate() &&
              this.viewMonth === today.getMonth() &&
              this.viewYear === today.getFullYear();
            return html`
              <calendar-date-card
                .day=${cell.day}
                .events=${cell.events}
                ?today=${isToday}
                ?other-month=${cell.otherMonth}
                ?selected=${!cell.otherMonth && cell.day === this._selectedDay}
              ></calendar-date-card>
            `;
          })}
        </div>

        <div class="legend">
          <div class="legend-item"><span class="legend-dot home"></span>Home</div>
          <div class="legend-item"><span class="legend-dot away"></span>Away</div>
          <div class="legend-item"><span class="legend-dot playoffs"></span>Playoffs</div>
        </div>
      </div>

      <pop-up-message></pop-up-message>
    `;
  }
}

globalThis.customElements.define(SchedulingCalendar.tag, SchedulingCalendar);
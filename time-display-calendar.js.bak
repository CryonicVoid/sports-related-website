/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `time-display-calendar`
 * Shows the current live time and the currently-viewed calendar month/year.
 * Updates the time every second via an interval.
 *
 * @element time-display-calendar
 *
 * @attr {Number} view-timestamp - Unix ms timestamp representing the month being viewed
 *                                 Updated by the parent calendar component.
 */
export class TimeDisplayCalendar extends DDDSuper(LitElement) {
  static get tag() {
    return "time-display-calendar";
  }

  constructor() {
    super();
    this.viewTimestamp = Date.now();
    this._currentTime = new Date();
    this._intervalId = null;
  }

  static get properties() {
    return {
      ...super.properties,
      viewTimestamp: { type: Number, attribute: "view-timestamp" },
      _currentTime: { type: Object, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .month-label {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e0f0ff;
        }

        .time-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .clock {
          font-family: "Share Tech Mono", "Courier New", monospace;
          font-size: 1.15rem;
          color: #4fc3f7;
          letter-spacing: 0.05em;
        }

        .date-text {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4a7090;
          margin-top: 1px;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // Tick every second to update the live clock display
    this._intervalId = setInterval(() => {
      this._currentTime = new Date();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up interval when removed from DOM
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  /**
   * Formats a Date object into "HH:MM:SS" 24-hour string.
   * @param {Date} d
   * @returns {String}
   */
  _formatTime(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  /**
   * Formats a timestamp into "Month YYYY" label for the calendar view.
   * @param {Number} ts - Unix ms timestamp
   * @returns {String}
   */
  _formatMonth(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  render() {
    return html`
      <div class="month-label">${this._formatMonth(this.viewTimestamp)}</div>
      <div class="time-block">
        <div class="clock">${this._formatTime(this._currentTime)}</div>
        <div class="date-text">
          ${this._currentTime.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(TimeDisplayCalendar.tag, TimeDisplayCalendar);
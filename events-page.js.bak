/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { events } from "./events-data.js";
import "./scheduling-calendar.js";
import "./event-card.js";
import "./navigation-arrow.js";
import "./pop-up-message.js";

/**
 * `events-page`
 * The schedule/calendar page. Renders a two-column layout with the
 * scheduling-calendar on the left and a paginated list of event-cards on the right.
 * Navigation arrows allow stepping through event cards pages.
 *
 * @element events-page
 */
export class EventsPage extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "events-page";
  }

  static  CARDS_PER_PAGE = 3;

  constructor() {
    super();
    // Index of the first event card currently shown in the paginated list
    this._cardOffset = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      _cardOffset: { type: Number, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100%;
          background: radial-gradient(ellipse at 20% 30%, rgba(13,60,100,0.25) 0%, transparent 55%),
                      radial-gradient(ellipse at 80% 70%, rgba(10,40,80,0.2) 0%, transparent 50%),
                      #03080f;
        }

        .page-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 28px 100px;
        }

        /* Page header */
        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #d0eaff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 4px 0;
        }

        .page-sub {
          font-size: 0.8rem;
          color: #3a5e7a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Two-column layout: calendar left, cards right */
        .layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        /* Event cards column */
        .cards-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cards-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .cards-title {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3a5e7a;
        }

        .cards-nav {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .page-indicator {
          font-family: "Share Tech Mono", monospace;
          font-size: 0.7rem;
          color: #2c4a60;
          min-width: 48px;
          text-align: center;
        }

        .cards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .no-events {
          color: #2c4a60;
          font-size: 0.8rem;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          text-align: center;
          padding: 32px 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `,
    ];
  }

  /**
   * Handles nav-change events from the cards pagination arrows.
   * Advances or retreats the card offset by CARDS_PER_PAGE.
   * @param {CustomEvent} e - detail: { direction }
   */
  _onCardNav(e) {
    const perPage = 3; // EventsPage.CARDS_PER_PAGE
    const dir = e.detail.direction;
    if (dir === "right") {
      this._cardOffset = Math.min(this._cardOffset + perPage, events.length - 1);
    } else {
      this._cardOffset = Math.max(this._cardOffset - perPage, 0);
    }
  }

  /**
   * Handles event-detail events from event-card's "More Info" button.
   * Opens the popup with full event info.
   * @param {CustomEvent} e
   */
  _onEventDetail(e) {
    const ev = e.detail;
    const d = new Date(ev.timestamp);
    const popup = this.shadowRoot.querySelector("pop-up-message");
    popup.open({
      heading: ev.name,
      body: `${ev.isHome ? "🏠 Home" : "✈ Away"} · ${ev.category}
📍 ${ev.location}
🕐 ${d.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}

${ev.description}`,
    });
  }

  render() {
    const perPage = 3;
    const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp);
    const pageEvents = sorted.slice(this._cardOffset, this._cardOffset + perPage);
    const totalPages = Math.ceil(sorted.length / perPage);
    const currentPage = Math.floor(this._cardOffset / perPage) + 1;

    return html`
      <div class="page-inner">
        <div class="page-header">
          <h1 class="page-title">Schedule &amp; Events</h1>
          <div class="page-sub">Crimson Hawks — 2026 Season</div>
        </div>

        <div class="layout">
          <!-- Calendar column -->
          <scheduling-calendar></scheduling-calendar>

          <!-- Event cards column -->
          <div class="cards-col">
            <div class="cards-header">
              <div class="cards-title">Upcoming Events</div>
              <div class="cards-nav">
                <navigation-arrow
                  direction="left"
                  ?disabled=${this._cardOffset === 0}
                  @nav-change=${this._onCardNav}
                ></navigation-arrow>
                <div class="page-indicator">${currentPage} / ${totalPages}</div>
                <navigation-arrow
                  direction="right"
                  ?disabled=${this._cardOffset + perPage >= sorted.length}
                  @nav-change=${this._onCardNav}
                ></navigation-arrow>
              </div>
            </div>

            <div class="cards-list" @event-detail=${this._onEventDetail}>
              ${pageEvents.length === 0
                ? html`<div class="no-events">No events scheduled</div>`
                : pageEvents.map(
                    (ev) => html`
                      <event-card
                        .timestamp=${ev.timestamp}
                        .name=${ev.name}
                        .isHome=${ev.isHome}
                        .opponent=${ev.opponent}
                        .location=${ev.location}
                        .description=${ev.description}
                        .category=${ev.category}
                      ></event-card>
                    `
                  )}
            </div>
          </div>
        </div>
      </div>

      <pop-up-message></pop-up-message>
    `;
  }
}

globalThis.customElements.define(EventsPage.tag, EventsPage);
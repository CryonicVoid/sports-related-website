/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { events } from "./events-data.js";
import { players } from "./players-data.js";
import "./linked-buttons.js";

/**
 * `home-page`
 * Landing page of the sports site. Features:
 *  - Cinematic hero section with animated headline and CTA buttons
 *  - Next game countdown section
 *  - Quick stats bar
 *  - Teaser cards for upcoming events and featured players
 *
 * @element home-page
 *
 * @fires route-change - When CTA buttons navigate to other pages
 */
export class HomePage extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "home-page";
  }

  constructor() {
    super();
    // Countdown timer state
    this._countdown = { d: 0, h: 0, m: 0, s: 0 };
    this._nextEvent = null;
    this._intervalId = null;
  }

  static get properties() {
    return {
      ...super.properties,
      _countdown: { type: Object, state: true },
      _nextEvent: { type: Object, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100%;
          background: #03080f;
        }

        /* =================== HERO =================== */
        .hero {
          position: relative;
          height: calc(100vh - 64px);
          min-height: 520px;
          background-image: url("/assets/images/home-page-bg.png");
          background-size: cover;
          background-position: center 30%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Dark overlay gradient */
        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(2,6,18,0.82) 0%,
            rgba(5,20,50,0.55) 60%,
            transparent 100%
          );
          z-index: 0;
        }

        /* Bottom fade into page */
        .hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom, transparent, #03080f);
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          padding: 0 60px;
          max-width: 700px;
        }

        .hero-eyebrow {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3b8bff;
          margin-bottom: 14px;
          opacity: 0;
          animation: fadeUp 600ms 100ms ease forwards;
        }

        h1.hero-title {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 900;
          color: #e8f4ff;
          line-height: 0.95;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          margin: 0 0 24px 0;
          opacity: 0;
          animation: fadeUp 700ms 200ms ease forwards;
        }

        h1.hero-title span {
          color: #3b8bff;
          display: block;
        }

        .hero-desc {
          font-size: 0.92rem;
          color: #6a9abd;
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 700ms 350ms ease forwards;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 700ms 500ms ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* =================== NEXT GAME =================== */
        .next-game-bar {
          background: rgba(8,16,34,0.9);
          border-top: 1px solid rgba(100,180,255,0.1);
          border-bottom: 1px solid rgba(100,180,255,0.1);
          padding: 20px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .next-label {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3b8bff;
          margin-bottom: 4px;
        }

        .next-event-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #d0eaff;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .countdown-row {
          display: flex;
          gap: 16px;
        }

        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .countdown-num {
          font-family: "Share Tech Mono", monospace;
          font-size: 1.8rem;
          color: #4fc3f7;
          line-height: 1;
          min-width: 2ch;
          text-align: center;
        }

        .countdown-lbl {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2c4a60;
          margin-top: 3px;
        }

        .countdown-sep {
          font-family: "Share Tech Mono", monospace;
          font-size: 1.8rem;
          color: #1e3a50;
          align-self: flex-start;
          padding-top: 2px;
        }

        /* =================== SECTION BASE =================== */
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 60px;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .section-title {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #d0eaff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0;
        }

        .section-sub {
          font-size: 0.68rem;
          color: #2c4a60;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* =================== STATS BAR =================== */
        .stats-bar {
          background: rgba(8,16,34,0.7);
          border: 1px solid rgba(100,180,255,0.08);
          border-radius: 6px;
          display: flex;
          padding: 0;
          overflow: hidden;
        }

        .stat-cell {
          flex: 1;
          padding: 20px 24px;
          text-align: center;
          border-right: 1px solid rgba(100,180,255,0.06);
        }

        .stat-cell:last-child { border-right: none; }

        .stat-num {
          font-family: "Share Tech Mono", monospace;
          font-size: 2rem;
          color: #3b8bff;
          display: block;
          line-height: 1;
        }

        .stat-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2c4a60;
          margin-top: 5px;
        }

        /* =================== TEASER CARDS =================== */
        .teaser-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }

        .teaser-card {
          background: linear-gradient(145deg, #070e1c, #0a1522);
          border: 1px solid rgba(100,180,255,0.1);
          border-radius: 5px;
          padding: 18px 20px;
          transition: border-color 0.18s, transform 0.18s;
        }

        .teaser-card:hover {
          border-color: rgba(100,180,255,0.3);
          transform: translateY(-2px);
        }

        .teaser-label {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #3b8bff;
          margin-bottom: 5px;
        }

        .teaser-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #c0ddf5;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin: 0 0 4px 0;
        }

        .teaser-detail {
          font-size: 0.72rem;
          color: #3a5e7a;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // Determine the soonest upcoming event for the countdown
    const now = Date.now();
    this._nextEvent = [...events]
      .filter((e) => e.timestamp > now)
      .sort((a, b) => a.timestamp - b.timestamp)[0] || null;

    // Update countdown every second
    this._tickCountdown();
    this._intervalId = setInterval(() => this._tickCountdown(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._intervalId) clearInterval(this._intervalId);
  }

  /**
   * Recalculates days/hours/minutes/seconds until the next event.
   * Sets this._countdown to the result.
   */
  _tickCountdown() {
    if (!this._nextEvent) return;
    const diff = Math.max(0, this._nextEvent.timestamp - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    this._countdown = { d, h, m, s };
  }

  /**
   * Pads a number with a leading zero if below 10.
   * @param {Number} n
   * @returns {String}
   */
  _pad(n) {
    return String(n).padStart(2, "0");
  }

  /**
   * Fires route-change for internal SPA navigation.
   * @param {String} path
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

  render() {
    const { d, h, m, s } = this._countdown;
    const upcomingEvents = [...events]
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, 3);
    const featuredPlayers = players.slice(0, 4);

    // Quick team stats derived from roster data
    const totalGoals = players.reduce((sum, p) => sum + (p.stats.goals || 0), 0);
    const totalAssists = players.reduce((sum, p) => sum + (p.stats.assists || 0), 0);
    const gamesPlayed = Math.max(...players.map((p) => p.stats.gamesPlayed || 0));

    return html`
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-eyebrow">2026 Season · Crimson Hawks Athletics</div>
          <h1 class="hero-title">
            Built for
            <span>Victory</span>
          </h1>
          <p class="hero-desc">
            Follow every game, every player, and every moment of the Crimson Hawks' 2026 campaign.
          </p>
          <div class="hero-ctas">
            <linked-buttons
              href="/events"
              label="View Schedule"
              variant="primary"
              @route-change=${(e) => this._navigate(e.detail.path)}
            ></linked-buttons>
            <linked-buttons
              href="/players"
              label="Meet the Roster"
              variant="ghost"
              @route-change=${(e) => this._navigate(e.detail.path)}
            ></linked-buttons>
          </div>
        </div>
      </section>

      <!-- Next game countdown -->
      ${this._nextEvent
        ? html`
          <div class="next-game-bar">
            <div>
              <div class="next-label">Next Game</div>
              <div class="next-event-name">${this._nextEvent.name}</div>
            </div>
            <div class="countdown-row">
              <div class="countdown-unit">
                <span class="countdown-num">${this._pad(d)}</span>
                <span class="countdown-lbl">Days</span>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit">
                <span class="countdown-num">${this._pad(h)}</span>
                <span class="countdown-lbl">Hrs</span>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit">
                <span class="countdown-num">${this._pad(m)}</span>
                <span class="countdown-lbl">Min</span>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit">
                <span class="countdown-num">${this._pad(s)}</span>
                <span class="countdown-lbl">Sec</span>
              </div>
            </div>
          </div>
        `
        : ""}

      <!-- Team quick stats -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Season Overview</h2>
          <span class="section-sub">${gamesPlayed} games played</span>
        </div>
        <div class="stats-bar">
          <div class="stat-cell">
            <span class="stat-num">${totalGoals}</span>
            <div class="stat-name">Total Goals</div>
          </div>
          <div class="stat-cell">
            <span class="stat-num">${totalAssists}</span>
            <div class="stat-name">Total Assists</div>
          </div>
          <div class="stat-cell">
            <span class="stat-num">${players.length}</span>
            <div class="stat-name">Roster Size</div>
          </div>
          <div class="stat-cell">
            <span class="stat-num">${events.length}</span>
            <div class="stat-name">Scheduled Games</div>
          </div>
        </div>
      </div>

      <!-- Upcoming events teaser -->
      <div class="section" style="padding-top:0;">
        <div class="section-header">
          <h2 class="section-title">Upcoming Games</h2>
          <linked-buttons
            href="/events"
            label="Full Schedule →"
            variant="ghost"
            @route-change=${(e) => this._navigate(e.detail.path)}
          ></linked-buttons>
        </div>
        <div class="teaser-grid">
          ${upcomingEvents.map((ev) => {
            const d2 = new Date(ev.timestamp);
            return html`
              <div class="teaser-card">
                <div class="teaser-label">
                  ${ev.isHome ? "Home" : "Away"} · ${ev.category}
                </div>
                <div class="teaser-name">${ev.name}</div>
                <div class="teaser-detail">
                  ${d2.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  &mdash; ${ev.location}
                </div>
              </div>
            `;
          })}
        </div>
      </div>

      <!-- Featured players teaser -->
      <div class="section" style="padding-top:0;padding-bottom:80px;">
        <div class="section-header">
          <h2 class="section-title">Featured Players</h2>
          <linked-buttons
            href="/players"
            label="Full Roster →"
            variant="ghost"
            @route-change=${(e) => this._navigate(e.detail.path)}
          ></linked-buttons>
        </div>
        <div class="teaser-grid">
          ${featuredPlayers.map(
            (p) => html`
              <div class="teaser-card">
                <div class="teaser-label">#${p.number} · ${p.position}</div>
                <div class="teaser-name">${p.name}</div>
                <div class="teaser-detail">${p.hometown}</div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(HomePage.tag, HomePage);
/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { players } from "./players-data.js";
import "./pop-up-message.js";

/**
 * `players-page`
 * Displays the full team roster as a grid of player cards.
 * Clicking a card opens a pop-up-message with full player stats and bio.
 *
 * @element players-page
 */
export class PlayersPage extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "players-page";
  }

  constructor() {
    super();
    // Active filter position string ("" = show all)
    this._positionFilter = "";
  }

  static get properties() {
    return {
      ...super.properties,
      _positionFilter: { type: String, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100%;
          background: radial-gradient(ellipse at 75% 20%, rgba(13,60,100,0.22) 0%, transparent 55%),
                      #03080f;
        }

        .page-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 28px 100px;
        }

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

        /* Position filter buttons */
        .filters {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(100,180,255,0.18);
          border-radius: 2px;
          color: #4a7090;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: rgba(100,180,255,0.08);
          border-color: #3b8bff;
          color: #90caf9;
        }

        /* Player card grid */
        .player-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        /* Individual player card */
        .player-card {
          background: linear-gradient(145deg, #080f1c 0%, #0b1626 100%);
          border: 1px solid rgba(100,180,255,0.12);
          border-radius: 6px;
          padding: 24px 20px 20px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }

        .player-card:hover {
          border-color: rgba(100,180,255,0.35);
          box-shadow: 0 0 30px rgba(0,80,200,0.18);
          transform: translateY(-3px);
        }

        /* Large jersey number watermark */
        .jersey-bg {
          position: absolute;
          top: -10px;
          right: -6px;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 5.5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.02);
          letter-spacing: -0.02em;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .player-number {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: #3b8bff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .player-name {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #d0eaff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
        }

        .position-badge {
          display: inline-block;
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 2px;
          background: rgba(59,139,255,0.1);
          color: #5a9fd4;
          border: 1px solid rgba(59,139,255,0.22);
          margin-bottom: 16px;
        }

        .stat-row {
          display: flex;
          gap: 0;
          border-top: 1px solid rgba(100,180,255,0.07);
          padding-top: 12px;
        }

        .stat {
          flex: 1;
          text-align: center;
        }

        .stat-value {
          font-family: "Share Tech Mono", monospace;
          font-size: 1.1rem;
          color: #4fc3f7;
          display: block;
          line-height: 1;
        }

        .stat-label {
          font-family: "Barlow Condensed", "Rajdhani", sans-serif;
          font-size: 0.58rem;
          color: #2c4a60;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .stat + .stat {
          border-left: 1px solid rgba(100,180,255,0.06);
        }

        .hometown {
          margin-top: 12px;
          font-size: 0.7rem;
          color: #2c4a60;
          letter-spacing: 0.04em;
        }
      `,
    ];
  }

  /**
   * Returns unique positions from the players data for filter buttons.
   * @returns {Array<String>}
   */
  _getPositions() {
    return [...new Set(players.map((p) => p.position))];
  }

  /**
   * Sets the active position filter.
   * Passing "" shows all players.
   * @param {String} position
   */
  _setFilter(position) {
    this._positionFilter = position;
  }

  /**
   * Opens the popup with a player's full stats and bio.
   * @param {Object} player - Player data object from players-data.js
   */
  _openPlayerDetail(player) {
    const popup = this.shadowRoot.querySelector("pop-up-message");
    const statsText = Object.entries(player.stats)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1")}: ${v}`)
      .join(" · ");
    popup.open({
      heading: `#${player.number} ${player.name}`,
      body: `Position: ${player.position} · Age: ${player.age}
Height: ${player.height} · Weight: ${player.weight}
Hometown: ${player.hometown}

Stats: ${statsText}

${player.bio}`,
    });
  }

  /**
   * Returns the three most relevant stats to surface on the card face.
   * @param {Object} stats
   * @returns {Array<{ label: String, value: String|Number }>}
   */
  _getCardStats(stats) {
    return Object.entries(stats)
      .slice(0, 3)
      .map(([k, v]) => ({
        label: k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
        value: v,
      }));
  }

  render() {
    const positions = this._getPositions();
    const filtered = this._positionFilter
      ? players.filter((p) => p.position === this._positionFilter)
      : players;

    return html`
      <div class="page-inner">
        <div class="page-header">
          <h1 class="page-title">Players Roster</h1>
          <div class="page-sub">Crimson Hawks — 2026 Season</div>
        </div>

        <!-- Position filter buttons -->
        <div class="filters">
          <button
            class="filter-btn ${this._positionFilter === "" ? "active" : ""}"
            @click=${() => this._setFilter("")}
          >All</button>
          ${positions.map(
            (pos) => html`
              <button
                class="filter-btn ${this._positionFilter === pos ? "active" : ""}"
                @click=${() => this._setFilter(pos)}
              >${pos}</button>
            `
          )}
        </div>

        <!-- Player grid -->
        <div class="player-grid">
          ${filtered.map((player) => {
            const cardStats = this._getCardStats(player.stats);
            return html`
              <div class="player-card" @click=${() => this._openPlayerDetail(player)}>
                <div class="jersey-bg">${player.number}</div>
                <div class="player-number">#${player.number}</div>
                <div class="player-name">${player.name}</div>
                <div class="position-badge">${player.position}</div>
                <div class="stat-row">
                  ${cardStats.map(
                    (s) => html`
                      <div class="stat">
                        <span class="stat-value">${s.value}</span>
                        <span class="stat-label">${s.label}</span>
                      </div>
                    `
                  )}
                </div>
                <div class="hometown">📍 ${player.hometown}</div>
              </div>
            `;
          })}
        </div>
      </div>

      <pop-up-message></pop-up-message>
    `;
  }
}

globalThis.customElements.define(PlayersPage.tag, PlayersPage);
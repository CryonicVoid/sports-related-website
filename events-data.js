/**
 * Copyright 2026 CryonicVoid
 * @license Apache-2.0, see LICENSE for full text.
 *
 * events-data.js
 * Central data store for all scheduled events.
 * Each event uses Unix timestamps (milliseconds) for dates.
 */

export const TEAM_NAME = "Crimson Hawks";
export const TEAM_SHORT = "CRH";

export const events = [
  {
    id: 1,
    name: "Hawks vs. Steel City Wolves",
    timestamp: 1746057600000, // May 1 2026 2:00 PM UTC
    location: "Hawks Arena, State College PA",
    isHome: true,
    opponent: "Steel City Wolves",
    description: "Season opener. Expect a packed crowd as the Hawks face the Wolves for the first time this season.",
    category: "Regular Season",
  },
  {
    id: 2,
    name: "Hawks vs. River Foxes",
    timestamp: 1746316800000, // May 4 2026 2:00 PM UTC
    location: "Fox Den Stadium, Pittsburgh PA",
    isHome: false,
    opponent: "River Foxes",
    description: "Away game. The Hawks travel to Pittsburgh for a tough matchup against the divisional rivals.",
    category: "Regular Season",
  },
  {
    id: 3,
    name: "Hawks vs. Coastal Eagles",
    timestamp: 1746576000000, // May 7 2026 2:00 PM UTC
    location: "Hawks Arena, State College PA",
    isHome: true,
    opponent: "Coastal Eagles",
    description: "Home match against the Coastal Eagles. Both teams have identical records heading in.",
    category: "Regular Season",
  },
  {
    id: 4,
    name: "Exhibition: Alumni Night",
    timestamp: 1746748800000, // May 9 2026 2:00 PM UTC
    location: "Hawks Arena, State College PA",
    isHome: true,
    opponent: "Alumni All-Stars",
    description: "Annual alumni exhibition game. Legends return to the ice for one night.",
    category: "Exhibition",
  },
  {
    id: 5,
    name: "Hawks vs. Northside Thunder",
    timestamp: 1746921600000, // May 11 2026 2:00 PM UTC
    location: "Thunder Dome, Erie PA",
    isHome: false,
    opponent: "Northside Thunder",
    description: "Critical away game against the league-leading Thunder. High intensity matchup expected.",
    category: "Regular Season",
  },
  {
    id: 6,
    name: "Hawks vs. Valley Storm",
    timestamp: 1747180800000, // May 14 2026 2:00 PM UTC
    location: "Hawks Arena, State College PA",
    isHome: true,
    opponent: "Valley Storm",
    description: "Home game against the Valley Storm. Local rivalry night — fan giveaways at the gate.",
    category: "Regular Season",
  },
  {
    id: 7,
    name: "Championship Qualifier",
    timestamp: 1747440000000, // May 17 2026 2:00 PM UTC
    location: "Hawks Arena, State College PA",
    isHome: true,
    opponent: "TBD",
    description: "Playoff qualifier matchup. Opponent determined by seed standings.",
    category: "Playoffs",
  },
];
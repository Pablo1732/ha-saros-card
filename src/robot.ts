import { css, html, svg } from "lit";
import { mdiHandBackRight } from "@mdi/js";

// Saros 20 Flow (schwarz) von oben, nach Foto: dunkle Scheibe mit Naht quer über die Mitte, vorne Stoßfänger,
// kleiner unauffälliger Lidar-Turm (versenkbar), dahinter Sensorschlitz, Ein/Aus- und Home-Taste hintereinander (leuchten weiß).
// Seitenbürsten sitzen unterm Gehäuse und fahren nur beim Saugen aus. Vorne = unten, damit er rückwärts in die Station (oben) passt.
// Animation je nach Zustand nur per CSS. Roboter: Mitte (130|84), Radius 44.

export type Anim =
  | "clean" | "mop" | "cleanmop" | "return" | "charge" | "empty" | "wash" | "dry" | "carry_in" | "carry_out" | "pause" | "error" | "map" | "idle" | "offline";

const dots = (xs: number[], y: number, cls: string) => xs.map((x, i) => svg`<circle class=${cls}
  style="animation-delay:${(i * 0.35).toFixed(2)}s" cx=${x} cy=${y} r=${cls === "dust" ? 1.6 + (i % 2) * 0.7 : cls === "up" ? 1.2 + (i % 3) * 0.5 : 2.2}></circle>`);

// Seitenbürste: drei kurze, gebogene Borstenbündel direkt an der Nabe (0|0), die knapp unterm Gehäuserand sitzt —
// nur die Borstenspitzen schauen raus. Beim Drehen leicht unscharf + Schleier (Bewegungsunschärfe).
const pt = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return `${(Math.sin(rad) * r).toFixed(2)} ${(-Math.cos(rad) * r).toFixed(2)}`;
};
const BRISTLES = [0, 120, 240].map((d) => [-8, 0, 8]
  .map((a) => `M${pt(d, 2)} Q${pt(d - 4 + a * 0.3, 8.5)} ${pt(d - 72 + a, 11)}`).join(" ")).join(" ");

// nur beim Saugen ausgefahren, sonst im Gehäuse versteckt; dreht um die Nabe; rechte Bürste gespiegelt
const brush = (x: number, cls: string) => svg`<g class="brush ${cls}" transform="translate(${x} 112)"><g class="ext"><circle class="blur" r="11"></circle><g class="spin">
  <g transform=${cls === "grey" ? "scale(-1 1)" : "scale(1 1)"}><path class="bristles" d="${BRISTLES}"></path></g>
  </g></g></g>`;

/** station: in = steht in der Station, ghost = Station blass (fährt heim), none = ohne Station */
export function robot(anim: Anim, station: "in" | "ghost" | "none") {
  const mopping = anim === "mop" || anim === "cleanmop" || anim === "wash";
  // Turm fährt beim Fahren aus, in der Station ist er eingefahren
  const raised = ["clean", "mop", "cleanmop", "return", "map"].includes(anim);
  return html`<svg class="robot a-${anim} st-${station} ${mopping ? "mopping" : ""} ${raised ? "raised" : ""}"
    viewBox="0 0 260 150" aria-hidden="true">
    <defs>
      <radialGradient id="rb-body" cx="40%" cy="70%" r="80%">
        <stop offset="0" stop-color="#2b3540"></stop><stop offset="1" stop-color="#121820"></stop>
      </radialGradient>
      <radialGradient id="rb-tower" cx="45%" cy="40%" r="70%">
        <stop offset="0" stop-color="#3a4048"></stop><stop offset="1" stop-color="#16191d"></stop>
      </radialGradient>
      <linearGradient id="rb-st" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#686c72"></stop><stop offset="1" stop-color="#3b3e43"></stop>
      </linearGradient>
      <linearGradient id="rb-heat" gradientUnits="userSpaceOnUse" x1="0" y1="34" x2="0" y2="10">
        <stop offset="0" stop-color="#e53935"></stop><stop offset="0.5" stop-color="#ff7043"></stop><stop offset="1" stop-color="#ffb300"></stop>
      </linearGradient>
      <filter id="rb-mblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.5"></feGaussianBlur></filter>
      <radialGradient id="rb-shadow">
        <stop offset="0.75" stop-color="rgba(0,0,0,0.38)"></stop><stop offset="1" stop-color="rgba(0,0,0,0)"></stop>
      </radialGradient>
    </defs>

    <g class="station">
      <rect class="st-shadow" x="80" y="6" width="100" height="48" rx="11"></rect>
      <rect class="st-body" x="82" y="4" width="96" height="46" rx="10"></rect>
      <rect class="st-lid" x="89" y="9" width="82" height="28" rx="6"></rect>
      <path class="st-split" d="M130 11 V35"></path>
      <rect class="st-logo" x="122" y="42.5" width="16" height="1.6" rx="0.8"></rect>
      <g class="ups">${dots([122, 130, 138, 126, 134], 46, "up")}</g>
      <!-- Mopp trocknen: warme Luft wellt aus der Station -->
      <g class="heat">${[108, 130, 152].map((x, i) => svg`<path style="animation-delay:${(i * 0.5).toFixed(1)}s"
        d="M${x} 34 q-3 -3 0 -6 t0 -6 t0 -6 t0 -6"></path>`)}</g>
    </g>

    <g class="rings"><circle cx="130" cy="84" r="46"></circle><circle cx="130" cy="84" r="46" style="animation-delay:1.3s"></circle></g>
    <g class="bot">
      <circle class="shadow" cx="132" cy="88" r="50"></circle>
      <g class="trail">${dots([110, 122, 138, 150], 34, "drop")}</g>
      <g class="roller"><rect x="103" y="35" width="54" height="10" rx="5"></rect><path d="M106 40 H154"></path></g>
      <g class="ripples"><circle cx="112" cy="42" r="6"></circle><circle cx="148" cy="42" r="6" style="animation-delay:0.6s"></circle></g>
      ${brush(96, "orange")}
      ${brush(164, "grey")}
      <g class="dusts">${dots([102, 116, 130, 144, 158], 142, "dust")}</g>
      <circle class="body" cx="130" cy="84" r="44"></circle>
      <circle class="rim" cx="130" cy="84" r="43.4"></circle>
      <!-- hinterer Deckel (matter), Naht quer über die Mitte -->
      <path class="lid" d="M88.5 90.6 A42 42 0 1 1 171.5 90.6 Z"></path>
      <path class="bumper" d="M87.4 93 A43 43 0 0 0 172.6 93"></path>
      <!-- Lidar-Turm vorne, klein und dunkel, versenkbar -->
      <g class="tower">
        <circle class="tw-shadow" cx="130.8" cy="117" r="7"></circle>
        <circle class="tw" cx="130" cy="116" r="6.6"></circle>
        <circle class="tw-ring" cx="130" cy="116" r="4.2"></circle>
        <circle class="tw-ring" cx="130" cy="116" r="2"></circle>
      </g>
      <rect class="slot" x="127" y="107.3" width="6" height="2.6" rx="1.3"></rect>
      <!-- Ein/Aus- und Home-Taste hintereinander, leuchten weiß -->
      <g class="keys">
        <circle class="key" cx="130" cy="102.4" r="2.8"></circle>
        <circle class="key" cx="130" cy="96.4" r="2.8"></circle>
        <path class="glyph" d="M129 101.6 A1.4 1.4 0 1 0 131 101.6 M130 100.8 V102.3"></path>
        <path class="glyph home" d="M128.8 96.6 L130 95.5 L131.2 96.6 M129.2 96.3 V97.6 H130.8 V96.3"></path>
      </g>
      <path class="beam" d="M118 126 L70 150 H190 L142 126 Z"></path>
      <!-- Hand von oben (Handrücken), Finger liegen auf dem Roboter: nur beim Tragen sichtbar -->
      <g class="hand" transform="translate(112 96) scale(1.5)"><path d="${mdiHandBackRight}"></path></g>
      <g class="badge">
        <circle cx="130" cy="62" r="13"></circle>
        <path class="g-charge" d="M131.5 53 L124 64 H129.5 L128.5 71 L136 60 H130.5 Z"></path>
        <path class="g-pause" d="M125 56 h3.5 v12 h-3.5z M131.5 56 h3.5 v12 h-3.5z"></path>
        <path class="g-error" d="M128.2 54 h3.6 v10 h-3.6z M128.2 66.5 h3.6 v3.6 h-3.6z"></path>
      </g>
    </g>
  </svg>`;
}

export const robotStyles = css`
  /* hidden: Animationen (Heimfahrt, Bahnen) dürfen nicht über den Status-Text laufen */
  .robot { width: 100%; height: 100%; overflow: hidden; display: block; }
  /* steht still in der Station: Bild mittig zwischen Chips und Status (unten wird der Platz nur für Trage-/Fahrt-
     Animationen gebraucht); beim Tragen wieder hoch, sonst läuft die Hand aus dem Bild */
  .robot { transition: transform 0.5s ease; }
  .robot.st-in:not(.a-carry_in):not(.a-carry_out) { transform: translateY(9px); }

  /* Gerätefarben (echtes Aussehen), Zustandsfarbe kommt als --rb-accent von der Karte */
  .station { transition: opacity 0.5s; }
  .st-none .station { opacity: 0; }
  .st-ghost .station { opacity: 0.35; }
  .st-shadow { fill: rgba(0, 0, 0, 0.25); }
  .st-body { fill: url(#rb-st); stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.8; }
  .st-lid { fill: rgba(255, 255, 255, 0.07); stroke: rgba(0, 0, 0, 0.25); stroke-width: 0.8; }
  .st-split { stroke: rgba(0, 0, 0, 0.3); stroke-width: 1; }
  .st-logo { fill: rgba(255, 255, 255, 0.45); }
  .shadow { fill: url(#rb-shadow); }
  .body { fill: url(#rb-body); }
  .rim { fill: none; stroke: rgba(255, 255, 255, 0.12); stroke-width: 0.7; }
  .lid { fill: #10151b; stroke: rgba(0, 0, 0, 0.5); stroke-width: 0.8; }
  .bumper { fill: none; stroke: #07090b; stroke-width: 2.6; stroke-linecap: round; }

  /* Turm: klein, dunkel gebürstet; fährt beim Fahren aus (Schatten), in der Station eingefahren */
  .tower { transform-origin: 130px 116px; transform: scale(0.88); transition: transform 0.6s; }
  .raised .tower { transform: scale(1); }
  .tw-shadow { fill: rgba(0, 0, 0, 0.5); opacity: 0.3; transition: opacity 0.6s; }
  .raised .tw-shadow { opacity: 1; }
  .tw { fill: url(#rb-tower); stroke: rgba(255, 255, 255, 0.14); stroke-width: 0.5; }
  .tw-ring { fill: none; stroke: rgba(255, 255, 255, 0.06); stroke-width: 0.5; }
  .slot { fill: #07090b; stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.4; }

  /* Tasten: weiß beleuchtet (Home schwächer); Ladung = atmen, Fehler = blinken, offline = aus */
  .key { fill: #0d1116; stroke: rgba(255, 255, 255, 0.12); stroke-width: 0.4; }
  .glyph { fill: none; stroke: #fff; stroke-width: 0.7; stroke-linecap: round; stroke-linejoin: round; opacity: 0.95;
    filter: drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.9)); }
  .glyph.home { opacity: 0.5; filter: none; }
  .a-idle .glyph, .a-pause .glyph { opacity: 0.6; filter: none; }
  .a-idle .glyph.home, .a-pause .glyph.home { opacity: 0.35; }
  .a-offline .glyph { opacity: 0.12; filter: none; }

  .brush path { fill: none; stroke-linecap: round; }
  .brush .bristles { stroke-width: 0.8; }
  .brush.orange .bristles { stroke: #f29a1a; }
  .brush.grey .bristles { stroke: #a3a9b0; }
  .brush.orange .blur { fill: #f29a1a; }
  .brush.grey .blur { fill: #a3a9b0; }
  .brush .blur { opacity: 0; }
  /* um die Nabe drehen (nicht um die Mitte der Umrissbox, sonst eiert sie) */
  .brush .spin, .brush .ext { transform-box: view-box; transform-origin: 0 0; }
  /* eingefahren: klein und unsichtbar unterm Gehäuse; beim Saugen fahren sie aus */
  .brush .ext { transform: scale(0.3); opacity: 0; transition: transform 0.5s, opacity 0.5s; }
  .a-clean .brush .ext, .a-cleanmop .brush .ext { transform: scale(1); opacity: 1; }
  .ripples circle { transform-box: fill-box; transform-origin: center; }
  .roller { opacity: 0; transition: opacity 0.4s; }
  .mopping .roller { opacity: 1; }
  .roller rect { fill: #dfe7ee; stroke: #8fa3b5; stroke-width: 0.8; }
  .roller path { stroke: var(--rb-water); stroke-width: 6; stroke-dasharray: 3 3; stroke-linecap: butt; opacity: 0.55; }
  .ripples circle { fill: none; stroke: var(--rb-water); stroke-width: 1.5; opacity: 0; }
  .beam { fill: var(--rb-accent); opacity: 0; }
  .dust { fill: #8a9097; opacity: 0; }
  /* Staub (grau-braun), nicht Zustandsfarbe — sonst wirkt es wie Wasser */
  .up { fill: #9a9086; opacity: 0; }
  .heat path { fill: none; stroke: url(#rb-heat); stroke-width: 1.8; stroke-linecap: round; opacity: 0; }
  .drop { fill: var(--rb-water); opacity: 0; }
  .rings circle { fill: none; stroke: var(--rb-accent); stroke-width: 2; opacity: 0; transform-origin: 130px 84px; }
  .badge { opacity: 0; transition: opacity 0.3s; }
  .badge circle { fill: var(--rb-accent); }
  .badge path { fill: #fff; display: none; }
  .bot { transform-origin: 130px 84px; }

  /* Reinigen: Roboter zieht Bahnen, Bürsten drehen gegenläufig, Staub wird eingesaugt; Wischen: Walze dreht, Tropfen bleiben zurück */
  .a-clean .bot, .a-cleanmop .bot, .a-mop .bot { animation: rb-path 10s ease-in-out infinite; }
  .a-clean .spin, .a-cleanmop .spin { animation: rb-spin 0.6s linear infinite; filter: url(#rb-mblur); }
  .a-clean .brush .blur, .a-cleanmop .brush .blur { opacity: 0.16; }
  /* Bürsten drehen gegen ihre Biegung (Borsten ziehen nach), die gespiegelte rechte andersherum */
  .a-clean .grey .spin, .a-cleanmop .grey .spin { animation-direction: reverse; }
  .a-clean .dust, .a-cleanmop .dust { animation: rb-suck 1.8s ease-in infinite; }
  .a-mop .roller path, .a-cleanmop .roller path, .a-wash .roller path { animation: rb-roll 0.4s linear infinite; }
  .a-mop .drop, .a-cleanmop .drop { animation: rb-trail 1.8s ease-out infinite; }
  /* Station: Staub wird abgesaugt / Walze gewaschen */
  .a-empty .up { animation: rb-rise 1.5s ease-in infinite; }
  .a-wash .ripples circle { animation: rb-ripple 1.2s ease-out infinite; }
  .a-dry .heat path { animation: rb-heat 1.6s ease-in-out infinite; }
  /* Laden, Pause, Fehler */
  .a-charge .rings circle { animation: rb-ring 2.6s ease-out infinite; }
  .a-charge .badge, .a-pause .badge, .a-error .badge { opacity: 1; }
  .a-charge .g-charge, .a-pause .g-pause, .a-error .g-error { display: block; }
  .a-charge .badge, .a-charge .glyph { animation: rb-breathe 2.6s ease-in-out infinite; }
  .a-error .glyph { animation: rb-blink 0.8s steps(1) infinite; }
  /* Heimfahrt: rollt immer wieder rückwärts in die (blasse) Station */
  .a-return .bot { animation: rb-home 2.8s ease-in-out infinite; }
  /* Tragen: Roboter hebt sich sanft an, Schatten wird kleiner */
  /* Tragen: Hand setzt den Roboter in die Station bzw. nimmt ihn heraus */
  .hand { opacity: 0; }
  .hand path { fill: #e9bd98; stroke: rgba(0, 0, 0, 0.45); stroke-width: 0.45; stroke-linejoin: round; }
  .a-carry_in .bot, .a-carry_out .bot { transform-origin: 130px 84px; }
  .a-carry_in .bot { animation: rb-carry-in 4s ease-in-out infinite; }
  .a-carry_in .hand { animation: rb-hand-in 4s ease-in-out infinite; }
  .a-carry_out .bot { animation: rb-carry-out 4s ease-in-out infinite; }
  .a-carry_out .hand { animation: rb-hand-out 4s ease-in-out infinite; }
  .a-carry_in .shadow, .a-carry_out .shadow { opacity: 0.5; }
  .a-map .beam { animation: rb-scan 1.8s ease-in-out infinite; }
  .a-error .bot { animation: rb-shake 0.5s ease-in-out 3; }
  .a-error .rings circle { animation: rb-ring 1.6s ease-out infinite; }
  .a-offline .bot, .a-offline .station { opacity: 0.45; filter: grayscale(1); }

  @keyframes rb-path {
    0%, 100% { transform: translate(0, 0) rotate(0); }
    20% { transform: translate(-34px, 4px) rotate(-22deg); }
    45% { transform: translate(-8px, 8px) rotate(10deg); }
    70% { transform: translate(34px, 4px) rotate(24deg); }
    85% { transform: translate(14px, -2px) rotate(-6deg); }
  }
  @keyframes rb-home {
    0% { transform: translateY(46px); opacity: 0; }
    15% { opacity: 1; }
    70%, 100% { transform: translateY(0); opacity: 1; }
  }
  /* rein: von unten hochgetragen, abgesetzt (scale 1.06 → 1 = angehoben → steht), Hand verschwindet */
  @keyframes rb-carry-in {
    0% { transform: translateY(56px) scale(1.06); opacity: 0; }
    12% { opacity: 1; }
    55% { transform: translateY(0) scale(1.06); }
    68%, 92% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0; }
  }
  @keyframes rb-hand-in { 0%, 60% { opacity: 1; } 75%, 100% { opacity: 0; } }
  /* raus: Hand greift, hebt an, trägt nach unten weg */
  @keyframes rb-carry-out {
    0%, 22% { transform: translateY(0) scale(1); opacity: 1; }
    32% { transform: translateY(0) scale(1.06); }
    80% { transform: translateY(56px) scale(1.06); opacity: 1; }
    92%, 100% { transform: translateY(56px) scale(1.06); opacity: 0; }
  }
  @keyframes rb-hand-out { 0%, 5% { opacity: 0; } 18%, 100% { opacity: 1; } }
  @keyframes rb-spin { to { transform: rotate(-360deg); } }
  @keyframes rb-roll { to { stroke-dashoffset: -6; } }
  @keyframes rb-suck { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-12px); } }
  @keyframes rb-trail { 0% { opacity: 0; transform: translateY(2px); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-12px); } }
  @keyframes rb-rise { 0% { opacity: 0; transform: translateY(0); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-34px); } }
  @keyframes rb-heat { 0% { opacity: 0; transform: translateY(4px); } 40% { opacity: 0.85; } 100% { opacity: 0; transform: translateY(-8px); } }
  @keyframes rb-ripple { 0% { opacity: 0.8; transform: scale(0.3); } 100% { opacity: 0; transform: scale(1.6); } }
  @keyframes rb-ring { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.4); } }
  @keyframes rb-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes rb-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
  @keyframes rb-scan { 0%, 100% { opacity: 0; } 50% { opacity: 0.22; } }
  @keyframes rb-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

  .noanim .robot *, .noanim .robot { animation: none !important; }
  @media (prefers-reduced-motion: reduce) { .robot, .robot * { animation: none !important; } }
`;

import { css } from "lit";
import { robotStyles } from "./robot";

// Optik wie HA-Kachelkarten: ausschließlich HA-Theme-Variablen, damit jedes Theme (hell/dunkel/eigene) passt.
// Getönte Flächen über ::before mit currentColor → funktioniert ohne color-mix() auch in alten WebViews.

export const cardStyles = [robotStyles, css`
  :host {
    --sc-text: var(--primary-text-color);
    --sc-text2: var(--secondary-text-color);
    --sc-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
    /* Bedienelemente in der Theme-Hauptfarbe, Meldungen in den HA-Statusfarben */
    --sc-ctl: var(--primary-color, #03a9f4);
    --sc-on-ctl: var(--text-primary-color, #fff);
    --sc-ok: var(--success-color, #43a047);
    --sc-warn: var(--warning-color, #ffa600);
    --sc-err: var(--error-color, #db4437);
    /* Flächen wie HA-Regler: inaktive Farbe mit 20 % (color-mix fehlt in alten WebViews → rgba davor) */
    --sc-fill: rgba(158, 158, 158, 0.2);
    --rb-water: var(--light-blue-color, #03a9f4);
    color: var(--sc-text);
    display: block;
  }
  @supports (color: color-mix(in srgb, red 20%, transparent)) {
    :host { --sc-fill: color-mix(in srgb, var(--state-inactive-color, #9e9e9e) 20%, transparent); }
  }
  b { font-weight: 500; }
  button { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; }
  .mdi { width: var(--mdc-icon-size, 24px); height: var(--mdc-icon-size, 24px); fill: currentColor; flex: none; }

  .card {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border-radius: var(--ha-card-border-radius, 12px);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--sc-divider));
    box-shadow: var(--ha-card-box-shadow, none);
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 14px;
  }

  /* ---------- Kopf mit Roboter ---------- */
  .hero { position: relative; height: 186px; }
  /* Schein reicht bis hinter den Status und läuft innerhalb der Fläche ganz aus (keine harte Kante) */
  .hero::before { content: ""; position: absolute; top: 0; right: 0; bottom: -64px; left: 0;
    background: radial-gradient(closest-side at 50% 48%, var(--accent) 0%, transparent 100%);
    opacity: 0; transition: opacity 0.6s; }
  .hero.tint::before { opacity: 0.2; }
  .name { position: absolute; top: 14px; left: 16px; right: 140px; font-size: 14px; font-weight: 500; color: var(--sc-text2);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chips { position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; z-index: 1; }
  .chip { display: inline-flex; align-items: center; gap: 4px; height: 30px; padding: 0 10px; border-radius: 15px; border: 0;
    background: var(--sc-fill); font-size: 13px; font-weight: 500; --mdc-icon-size: 18px; box-sizing: border-box; }
  .chip.bat.low { color: var(--sc-err); }
  .chip.health { cursor: pointer; padding: 0 8px; background: none; position: relative; isolation: isolate; }
  .chip.health::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.18; z-index: -1; }
  .chip.health:hover::before { opacity: 0.28; }
  .chip.health.ok { color: var(--sc-ok); }
  .chip.health.warn { color: var(--sc-warn); }
  .chip.health.error { color: var(--sc-err); animation: sc-pulse 2s ease-in-out infinite; }
  .bot-wrap { position: absolute; left: 50%; top: 42px; width: 243px; height: 140px; margin-left: -121.5px;
    padding: 0; border: 0; background: none; cursor: pointer; }

  /* ---------- Status ---------- */
  .status { text-align: center; padding: 0 16px; position: relative; }
  .primary { font-size: 20px; font-weight: 500; line-height: 26px; }
  .secondary { font-size: 14px; color: var(--sc-text2); line-height: 20px; margin-top: 2px; }
  .progress { height: 6px; border-radius: 3px; background: var(--sc-fill); margin: 10px auto 0; max-width: 260px; overflow: hidden; }
  .progress i { display: block; height: 100%; background: var(--rb-accent); border-radius: 3px; transition: width 0.6s; }

  /* ---------- Modus + Stärke ---------- */
  .controls { padding: 14px 14px 0; display: flex; flex-direction: column; gap: 12px; }
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 14px; background: var(--sc-fill); }
  .seg button { flex: 1 1 0; min-width: 0; min-height: 54px; border: 0; border-radius: 10px; background: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 4px 2px;
    font-size: 12px; font-weight: 500; color: var(--sc-text2); --mdc-icon-size: 20px; transition: background 0.2s, color 0.2s; }
  .seg button span { text-align: center; line-height: 14px; max-width: 100%; }
  .seg .mi { display: flex; align-items: center; gap: 1px; }
  .seg .mi .mdi:nth-child(2):not(:last-child) { --mdc-icon-size: 13px; opacity: 0.8; }
  .seg button.on { background: var(--sc-ctl); color: var(--sc-on-ctl); }
  .seg button:disabled:not(.on) { opacity: 0.5; cursor: default; }
  .seg button:disabled { cursor: default; }
  .levels { display: flex; flex-direction: column; gap: 6px; }
  .lv-head { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--sc-text2); --mdc-icon-size: 18px; padding: 0 2px; }
  .lv-head b { margin-left: auto; color: var(--sc-text); }
  .steps { display: flex; gap: 4px; }
  .steps button { flex: 1; height: 32px; border: 0; border-radius: 8px; background: var(--sc-fill); cursor: pointer; padding: 0;
    transition: background 0.2s; }
  .steps button:first-child { border-radius: 12px 6px 6px 12px; }
  .steps button:last-child { border-radius: 6px 12px 12px 6px; }
  .steps button.on { background: var(--sc-ctl); }
  .steps button:disabled { opacity: 0.5; cursor: default; }
  /* Wert nur aus dem Verlauf (HA meldet unknown) → abgeschwächt */
  .levels.stale .steps button.on { opacity: 0.5; }
  .levels.stale b { font-weight: 500; color: var(--sc-text2); }
  .note { font-size: 12px; color: var(--sc-text2); padding: 0 2px; line-height: 16px; }

  /* ---------- Knöpfe ---------- */
  .actions { display: flex; gap: 8px; padding: 14px 14px 0; }
  .btn { flex: 1 1 0; min-width: 0; height: 48px; border: 0; border-radius: 12px; cursor: pointer; position: relative; isolation: isolate;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 12px;
    font-size: 14px; font-weight: 500; --mdc-icon-size: 20px; transition: filter 0.2s; }
  .btn span { line-height: 17px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .btn:hover:not(:disabled) { filter: brightness(1.08); }
  .btn.primary { background: var(--sc-ctl); color: var(--sc-on-ctl); }
  .btn.sec { background: var(--sc-fill); }
  .btn.danger, .btn.ok { background: none; }
  .btn.danger { color: var(--sc-err); }
  .btn.ok { color: var(--sc-ok); }
  .btn.danger::before, .btn.ok::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.15; z-index: -1; }
  .btn.icon-only { flex: 0 0 48px; padding: 0; }
  .btn:disabled { cursor: default; opacity: 0.45; filter: none; }
  .btn.busy:disabled { opacity: 0.8; }
  .btn .end { --mdc-icon-size: 18px; opacity: 0.8; margin-left: -2px; }
  .spinner { width: 20px; height: 20px; flex: none; animation: sc-spin 1s linear infinite; }
  .spinner circle { fill: none; stroke: var(--sc-ctl); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 40 60; }

  .banner { display: flex; gap: 10px; align-items: flex-start; margin: 14px 14px 0; padding: 12px; border-radius: 12px;
    font: inherit; font-size: 14px; line-height: 20px; position: relative; isolation: isolate;
    border: 0; background: none; color: inherit; text-align: left; cursor: pointer; width: calc(100% - 28px); box-sizing: border-box; }
  .banner > div { flex: 1; }
  .banner > .end { --mdc-icon-size: 18px; opacity: 0.6; margin-top: 1px; color: inherit; }
  .banner b { display: block; }
  .banner .inl { --mdc-icon-size: 16px; vertical-align: -3px; }
  .banner::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: var(--sc-ok); opacity: 0.15; z-index: -1; }
  .banner > .mdi { color: var(--sc-ok); }
  div.banner { cursor: default; }
  .banner.warn::before { background: var(--sc-warn); }
  .banner.warn > .mdi { color: var(--sc-warn); }

  /* ---------- Dialoge ---------- */
  dialog.dlg { border: 0; padding: 0; background: none; color: var(--sc-text); width: calc(100vw - 24px); max-width: 440px; max-height: none; overflow: visible; }
  dialog.dlg.small { max-width: 360px; }
  dialog.dlg.dark { color-scheme: dark; }
  dialog.dlg::backdrop { background: rgba(0, 0, 0, 0.5); }
  /* nur der Inhalt scrollt, Kopf bleibt stehen; schmale Scrollleiste mit Abstand zu den runden Ecken */
  .dlg-in { background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-dialog-border-radius, 24px);
    max-height: calc(100vh - 48px);
    /* iPhone: nicht unter Statusleiste/Home-Balken, dvh = wirklich sichtbare Höhe */
    max-height: calc(100dvh - 32px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    overflow: hidden; display: flex; flex-direction: column; box-sizing: border-box;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35); padding-top: 20px; }
  .dlg-in.pad { padding: 20px; }
  .dlg-body { overflow-y: auto; padding: 0 14px 20px 20px; margin: 0 6px 12px 0;
    scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb-color, rgba(127, 127, 127, 0.45)) transparent; }
  .dlg-body::-webkit-scrollbar { width: 6px; }
  .dlg-body::-webkit-scrollbar-track { background: transparent; }
  .dlg-body::-webkit-scrollbar-button { display: none; height: 0; }
  .dlg-body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb-color, rgba(127, 127, 127, 0.45)); border-radius: 3px; }
  .dlg-head { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 500; margin-bottom: 14px; padding: 0 20px; }
  .dlg-in.pad .dlg-head { padding: 0; }
  .dlg-head span { flex: 1; }
  .x { width: 40px; height: 40px; margin: -8px -8px -8px 0; border: 0; border-radius: 50%; background: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; }
  .x:hover, .reset:hover:not(:disabled) { background: var(--sc-fill); }
  .dlg p { font-size: 14px; line-height: 20px; color: var(--sc-text2); margin: -4px 0 18px; }
  .dlg-btns { display: flex; gap: 8px; }
  .dlg-foot { display: flex; margin-top: 18px; }
  h3 { font-size: 14px; font-weight: 500; color: var(--sc-text2); margin: 20px 2px 4px; }
  .msg { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; margin-bottom: 6px; font-size: 14px;
    position: relative; isolation: isolate; }
  .msg::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.14; z-index: -1; }
  .msg span { color: var(--sc-text); }
  .msg.ok { color: var(--sc-ok); }
  .msg.warn { color: var(--sc-warn); }
  .msg.error { color: var(--sc-err); }
  .row { display: flex; align-items: center; gap: 12px; min-height: 48px; font-size: 14px; }
  .row .ic { width: 36px; height: 36px; border-radius: 50%; background: var(--sc-fill); display: flex; align-items: center; justify-content: center;
    flex: none; --mdc-icon-size: 20px; color: var(--sc-text2); }
  .row .txt { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .row .txt small { font-size: 12px; color: var(--sc-text2); }
  .row .val { color: var(--sc-text2); text-align: right; }
  .good { color: var(--sc-ok); }
  .bad { color: var(--sc-err); font-weight: 500; }
  .cons .bar { display: block; height: 4px; border-radius: 2px; background: var(--sc-fill); margin-top: 5px; overflow: hidden; }
  .cons .bar i { display: block; height: 100%; background: var(--sc-ok); border-radius: 2px; }
  .cons.due .bar i { background: var(--sc-warn); }
  .cons.due .ic { color: var(--sc-warn); }
  .cons.due small { color: var(--sc-warn); }
  .reset { width: 40px; height: 40px; border: 0; border-radius: 50%; background: none; cursor: pointer; flex: none;
    display: flex; align-items: center; justify-content: center; color: var(--sc-text2); }
  .reset:disabled { opacity: 0.35; cursor: default; }

  @keyframes sc-spin { to { transform: rotate(360deg); } }
  @keyframes sc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  .noanim .chip.health.error { animation: none; }
`];

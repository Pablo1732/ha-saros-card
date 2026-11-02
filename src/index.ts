import { SarosCard } from "./saros-card";

declare const __VERSION__: string;

// Doppelt geladene Ressource (z. B. alte + neue URL) darf nicht crashen
if (!customElements.get("saros-card")) customElements.define("saros-card", SarosCard);

const w = window as any;
w.customCards = w.customCards || [];
if (!w.customCards.some((c: any) => c.type === "saros-card")) {
  w.customCards.push({ type: "saros-card", name: "Saros-Karte", description: "Saugroboter steuern: Modus, Stärke, Stockwerk vorbereiten, Wartung", preview: false });
}

console.info(`%c SAROS-CARD %c ${__VERSION__} `, "background:#009688;color:#fff;border-radius:3px 0 0 3px", "background:#555;color:#fff;border-radius:0 3px 3px 0");

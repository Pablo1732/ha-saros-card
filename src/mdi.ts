import { html } from "lit";
import {
  mdiAirFilter, mdiAlert, mdiAlertCircle, mdiArrowRight, mdiBattery, mdiBattery10, mdiBattery20, mdiBattery30, mdiBattery40, mdiBattery50,
  mdiBattery60, mdiBattery70, mdiBattery80, mdiBattery90, mdiBatteryCharging10, mdiBatteryCharging20, mdiBatteryCharging30,
  mdiBatteryCharging40, mdiBatteryCharging50, mdiBatteryCharging60, mdiBatteryCharging70, mdiBatteryCharging80,
  mdiBatteryCharging90, mdiBatteryCharging100, mdiBatteryOutline, mdiBrush, mdiCheck, mdiCheckCircle, mdiClockOutline,
  mdiClose, mdiCounter, mdiEyeOutline, mdiFan, mdiFilterOutline, mdiHandBackRight, mdiHistory, mdiHomeImportOutline, mdiLock, mdiMapMarkerRadius,
  mdiPause, mdiPlay, mdiPlus, mdiPower, mdiRestore, mdiRobotVacuum, mdiRulerSquare, mdiStairs, mdiStop, mdiWater, mdiWrench,
} from "@mdi/js";

// MDI-Icons direkt als SVG statt <ha-icon>: das lädt HA erst nach, wenn eine eingebaute Karte es braucht
const PATHS: Record<string, string> = {
  "mdi:air-filter": mdiAirFilter,
  "mdi:alert": mdiAlert,
  "mdi:alert-circle": mdiAlertCircle,
  "mdi:arrow-right": mdiArrowRight,
  "mdi:brush": mdiBrush,
  "mdi:check": mdiCheck,
  "mdi:check-circle": mdiCheckCircle,
  "mdi:clock-outline": mdiClockOutline,
  "mdi:close": mdiClose,
  "mdi:counter": mdiCounter,
  "mdi:eye-outline": mdiEyeOutline,
  "mdi:fan": mdiFan,
  "mdi:filter-outline": mdiFilterOutline,
  "mdi:history": mdiHistory,
  "mdi:home-import-outline": mdiHomeImportOutline,
  "mdi:lock": mdiLock,
  "mdi:map-marker-radius": mdiMapMarkerRadius,
  "mdi:pause": mdiPause,
  "mdi:play": mdiPlay,
  "mdi:plus": mdiPlus,
  "mdi:restore": mdiRestore,
  "mdi:robot-vacuum": mdiRobotVacuum,
  "mdi:ruler-square": mdiRulerSquare,
  "mdi:stairs": mdiStairs,
  "mdi:power": mdiPower,
  "mdi:hand-back-right": mdiHandBackRight,
  "mdi:stop": mdiStop,
  "mdi:water": mdiWater,
  "mdi:wrench": mdiWrench,
};

const BAT = [mdiBatteryOutline, mdiBattery10, mdiBattery20, mdiBattery30, mdiBattery40, mdiBattery50, mdiBattery60, mdiBattery70, mdiBattery80, mdiBattery90, mdiBattery];
const BAT_CHG = [mdiBatteryCharging10, mdiBatteryCharging10, mdiBatteryCharging20, mdiBatteryCharging30, mdiBatteryCharging40,
  mdiBatteryCharging50, mdiBatteryCharging60, mdiBatteryCharging70, mdiBatteryCharging80, mdiBatteryCharging90, mdiBatteryCharging100];

/** Akku-Symbol in 10-%-Stufen */
export const batteryPath = (pct: number, charging: boolean) =>
  (charging ? BAT_CHG : BAT)[Math.max(0, Math.min(10, Math.round(pct / 10)))];

/** Größe wie bei ha-icon über --mdc-icon-size, Farbe = Textfarbe */
export const icon = (name: string, cls = "") => svgIcon(PATHS[name] ?? "", cls);

export const svgIcon = (path: string, cls = "") =>
  html`<svg class="mdi ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>`;

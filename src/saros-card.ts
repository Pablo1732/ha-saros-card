import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import type { HassEntity, HomeAssistant, SarosConfig } from "./types";
import { resolveEntities, type EntityMap } from "./entities";
import {
  BACK, CONSUMABLES, DOCK_ERROR, FAN, FAN_LEVELS, MODE_ICONS, MODES, MOP, MOP_LEVELS, PREP, STATUS, VACUUM_ERROR, label,
} from "./labels";
import { batteryPath, icon, svgIcon } from "./mdi";
import { robot, type Anim } from "./robot";
import { ago, hours, num } from "./format";
import { cardStyles } from "./styles";

const BAD = ["unknown", "unavailable", ""];
const CLEAN_STATES = ["cleaning", "returning"];

interface Issue { level: "error" | "warn"; text: string; icon: string }
interface Confirm { title: string; text: string; ok: string; danger?: boolean; info?: boolean; run: () => void }

/** Optionsnamen, unter denen die Integration „Saugen, dann Wischen“ künftig liefern könnte */
const THEN_ALIASES = ["vac_then_mop", "vac_followed_by_mop", "vacuum_then_mop"];
/** Optionsname → Modus der Karte (Varianten von „Saugen, dann Wischen“ vereinheitlicht) */
const normMode = (m: string): string => (THEN_ALIASES.includes(m) ? "vac_then_mop" : m);
/** Saros 20 Flow: „Nur Wischen“ gibt es nicht, „Saugen, dann Wischen“ meldet HA als unknown */
const DEFAULT_MODES = ["vacuum", "vac_and_mop", "vac_then_mop"];

const WARN = "var(--warning-color, #ffa600)";
/** Farbe je Animation: HA-Zustandsfarben für Saugroboter bzw. HA-Statusfarben (folgen dem Theme) */
const ACTIVE = "var(--state-vacuum-active-color, var(--teal-color, #009688))";
const ACCENT: Record<Anim, string> = {
  clean: ACTIVE, mop: ACTIVE, cleanmop: ACTIVE, map: ACTIVE, empty: ACTIVE, wash: ACTIVE, return: ACTIVE,
  carry_in: "var(--warning-color, #ffa600)",
  carry_out: "var(--warning-color, #ffa600)",
  // Trocknen = warme Luft
  dry: "var(--deep-orange-color, #ff5722)",
  charge: "var(--success-color, #43a047)", idle: "var(--success-color, #43a047)",
  pause: "var(--warning-color, #ffa600)", error: "var(--state-vacuum-error-color, var(--error-color, #db4437))",
  offline: "var(--state-unavailable-color, var(--disabled-color, #bdbdbd))",
};

/**
 * Saugroboter-Karte im Kachel-Stil: animierter Roboter, Akku + Zustand, Modus/Stärke, Start/Pause/Abbrechen,
 * „Auf anderes Stockwerk vorbereiten“ (über input_select + Automation) und ein Wartungs-Menü.
 */
export class SarosCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _menu: { state: true },
    _confirm: { state: true },
    _pending: { state: true },
    _lastMop: { state: true },
    _freeze: { state: true },
  };

  static styles = cardStyles;

  hass?: HomeAssistant;
  private _config!: SarosConfig;
  private _e: EntityMap = {};
  private _eFrom?: unknown;
  private _menu = false;
  private _confirm?: Confirm;
  /** sofort angezeigte Auswahl, bis HA den neuen Zustand meldet (Schlüssel → Wert) */
  private _pending: Record<string, string> = {};
  private _pendingTimer?: number;
  /** schon einmal nachgesendet (Gerät hat den Wert nicht übernommen) */
  private _retried = new Set<string>();
  /** Bestätigung gilt erst, wenn der Wert kurz stabil bleibt (Integration springt sonst zurück) */
  private _settleTimers: Record<string, number> = {};
  /** Stärken während eines Moduswechsels einfrieren, bis sich Gerät/Integration beruhigt haben */
  private _freeze: Record<string, string | undefined> = {};
  private _freezeTimer?: number;
  private _freezeSig?: string;
  private _pendingAt: Record<string, number> = {};
  private _staleTimer?: number;
  private _lastVac?: string;
  private _pausedFrom?: string;
  private _pausedForPrep = false;
  /** letzter bekannter Wasserfluss (aus dem Verlauf), solange HA unknown meldet */
  private _lastMop?: string;
  private _lastMopFor?: string;

  setConfig(config: SarosConfig): void {
    if (!config?.entity?.startsWith("vacuum.")) throw new Error("`entity:` fehlt (vacuum.*, z. B. vacuum.saros_20_flow_complete_2)");
    this._config = config;
    this._eFrom = undefined;
  }

  static getStubConfig(hass: HomeAssistant): Partial<SarosConfig> {
    return {
      entity: Object.keys(hass.states).find((id) => id.startsWith("vacuum.")) ?? "",
      floor_prep: Object.keys(hass.states).find((id) => id.startsWith("input_select.") && id.includes("stockwerk") && id.includes("vorbereiten")),
      floor_back: Object.keys(hass.states).find((id) => id.startsWith("input_select.") && id.includes("stockwerk_status")),
    };
  }

  getCardSize(): number {
    return 8;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  // nur neu rendern, wenn sich eine relevante Entität geändert hat
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size > 1 || !changed.has("hass")) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    if (old.themes?.darkMode !== this.hass.themes?.darkMode || old.entities !== this.hass.entities) return true;
    return [this._config.entity, this._config.floor_prep, this._config.floor_back, this._config.mode_helper, ...Object.values(this._e)].some((id) => id && old.states[id] !== this.hass!.states[id]);
  }

  protected willUpdate(): void {
    // Zuordnung nur neu berechnen, wenn sich die Entity-Registry geändert hat
    if (this.hass && this._eFrom !== this.hass.entities) {
      this._e = resolveEntities(this.hass, this._config);
      this._eFrom = this.hass.entities;
    }
    // vorgemerkte Auswahl verwerfen, sobald HA sie bestätigt
    for (const [k, v] of Object.entries(this._pending)) {
      // Modus über kind() vergleichen: beide Wisch-Modi sehen in HA gleich aus, erst der Merker entscheidet
      const ok = k === "cleaning_mode" ? this.kind(this.current(k)) === normMode(v) : this.current(k) === v;
      if (k === "cleaning_mode") {
        // mit Modus-Skript erst nach dessen Ende: unterwegs meldet HA Zwischenstände (vacuum → vac_and_mop → unknown),
        // der Merker kommt zuletzt — sonst springt die Anzeige kurz auf einen falschen Modus
        if (ok && !this.scriptBusy() && Date.now() - (this._pendingAt[k] ?? 0) > 1000) this.dropPending(k);
      } else if (!ok) {
        // springt wieder weg → weiter warten
        clearTimeout(this._settleTimers[k]);
        delete this._settleTimers[k];
      } else if (!this._settleTimers[k]) {
        this._settleTimers[k] = window.setTimeout(() => this.dropPending(k), 2500);
      }
    }
    this.watchFreeze();
    // merken, woraus die Pause kam: Heimfahrt → „Fortsetzen“ fährt weiter heim; Pause der Stockwerk-Vorbereitung → nachfragen
    const v = this.st("vacuum")?.state;
    if (v !== "paused") this._pausedFrom = undefined;
    else if (this._lastVac && this._lastVac !== "paused") this._pausedFrom = this._lastVac;
    if (v === "paused" && this.val("prep") === PREP.done) this._pausedForPrep = true;
    if (v !== "paused") this._pausedForPrep = false;
    this._lastVac = v;
    // Wasserfluss: letzten echten Wert merken (Integration flackert zwischen Wert und unknown)
    const m = this.current("mop_intensity");
    if (m && m !== "off" && (this.st("mop_intensity")?.attributes.options ?? []).includes(m)) this._lastMop = m;
    this.fetchLastMop();
  }

  private scriptBusy(): boolean {
    return !!this._config.mode_script && this.hass?.states[this._config.mode_script]?.state === "on";
  }

  /**
   * Wasserfluss: die Integration kennt nicht alle Wasser-Codes des Saros und meldet dann unknown →
   * letzten bekannten Wert aus dem HA-Verlauf holen (einmal je unknown-Phase, auch direkt beim Öffnen der Karte)
   */
  private dropPending(k: string): void {
    clearTimeout(this._settleTimers[k]);
    delete this._settleTimers[k];
    this._retried.delete(k);
    if (!(k in this._pending)) return;
    const rest = { ...this._pending };
    delete rest[k];
    this._pending = rest;
  }

  /**
   * Moduswechsel: Saugstärke/Wasserfluss springen in HA ein paar Mal hin und her (Gerät setzt Standardwerte,
   * Skript stellt zurück) → Anzeige bleibt beim alten Wert, bis Skript/Wechsel fertig und die Werte 3 s ruhig sind
   */
  private watchFreeze(): void {
    if (!Object.keys(this._freeze).length) return;
    const busy = "cleaning_mode" in this._pending || this.scriptBusy();
    const sig = `${this.current("fan")}|${this.current("mop_intensity")}`;
    if (busy || sig !== this._freezeSig) {
      this._freezeSig = sig;
      clearTimeout(this._freezeTimer);
      this._freezeTimer = undefined;
    }
    if (!busy && !this._freezeTimer) this._freezeTimer = window.setTimeout(() => (this._freeze = {}), 4000);
  }

  private fetchLastMop(): void {
    const ent = this.st("mop_intensity");
    // nur nötig, wenn seit dem Öffnen noch kein echter Wert kam
    if (!ent || ent.state !== "unknown" || this._lastMop || !this.hass?.callWS || this._lastMopFor === ent.last_changed) return;
    this._lastMopFor = ent.last_changed;
    const opts: string[] = ent.attributes.options ?? [];
    const end = ent.last_changed || new Date().toISOString();
    this.hass.callWS<Record<string, { s: string }[]>>({
      type: "history/history_during_period", entity_ids: [ent.entity_id], minimal_response: true, no_attributes: true,
      start_time: new Date(Date.parse(end) - 10 * 86_400_000).toISOString(), end_time: end,
    }).then((r) => {
      // „Aus“ überspringen: Wasserfluss wird nur in Wisch-Modi gezeigt
      this._lastMop = (r[ent.entity_id] ?? []).map((x) => x.s).reverse().find((s) => s !== "off" && opts.includes(s));
    }).catch(() => undefined);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Dialoge nicht beim Zurückkehren auf die Ansicht wieder aufpoppen lassen
    this._menu = false;
    this._confirm = undefined;
  }

  protected updated(): void {
    const sync = (sel: string, open: boolean) => {
      const d = this.renderRoot.querySelector(sel) as HTMLDialogElement | null;
      if (d && open && !d.open) d.showModal();
    };
    sync("#menu", this._menu);
    sync("#confirm", !!this._confirm);
  }

  // ---------- Daten ----------

  private st(key: string): HassEntity | undefined {
    const id = key === "vacuum" ? this._config.entity : key === "prep" ? this._config.floor_prep
      : key === "helper" ? this._config.mode_helper : key === "back" ? this._config.floor_back : this._e[key];
    return id ? this.hass?.states[id] : undefined;
  }

  private val(key: string): string | undefined {
    const s = this.st(key)?.state;
    return s == null || BAD.includes(s) ? undefined : s;
  }

  private numVal(key: string): number | undefined {
    const v = parseFloat(this.st(key)?.state ?? "");
    return isFinite(v) ? v : undefined;
  }

  /** aktueller Wert der Bedienelemente (Saugstärke steckt im vacuum-Attribut) */
  private current(k: string): string | undefined {
    return k === "fan" ? this.st("vacuum")?.attributes.fan_speed : this.val(k);
  }

  private shown(k: string): string | undefined {
    if (k in this._freeze && this._freeze[k] != null && !(k in this._pending)) return this._freeze[k];
    return this._pending[k] ?? this.current(k) ?? (this.stale(k) ? this._lastMop : undefined);
  }

  /** angezeigter Wert stammt aus dem Verlauf (HA meldet gerade unknown) */
  private stale(k: string): boolean {
    return k === "mop_intensity" && !this._pending[k] && this._freeze[k] == null && this.st(k)?.state === "unknown" && !!this._lastMop;
  }

  /** „· zuletzt“ erst zeigen, wenn unknown länger als 10 s anhält — kurzes Flackern der Integration nicht markieren */
  private staleLong(k: string): boolean {
    if (!this.stale(k)) return false;
    const age = Date.now() - Date.parse(this.st(k)?.last_changed ?? "");
    if (!(age > 10_000)) {
      clearTimeout(this._staleTimer);
      this._staleTimer = window.setTimeout(() => this.requestUpdate(), Math.max(0, 10_000 - (age || 0)) + 100);
      return false;
    }
    return true;
  }

  /** angezeigte Modi; „vac_then_mop“ = echte Option, falls die Integration sie liefert, sonst nur anzeigbar */
  private modes(): string[] {
    const opts: string[] = this.st("cleaning_mode")?.attributes.options ?? [];
    if (!opts.length) return [];
    const real = opts.find((o) => THEN_ALIASES.includes(o));
    return (this._config.modes ?? DEFAULT_MODES).map((m) => (THEN_ALIASES.includes(m) && real ? real : m))
      .filter((m) => opts.includes(m) || m === "vac_then_mop");
  }

  /** angezeigter Modus: gerade gewählter (noch unbestätigter) Modus, sonst der aktive */
  private modeNow(): string | undefined {
    const p = this._pending.cleaning_mode;
    return p ? normMode(p) : this.kind(this.current("cleaning_mode"));
  }

  /**
   * aktiver Modus: Zustand des Selects. Die Reihenfolge (gleichzeitig / erst saugen) gibt HA noch nicht weiter,
   * es sieht nur „Wischen an“ (je nach Version als vac_and_mop oder unknown) → dann den Merker des Modus-Skripts
   * nehmen (mode_helper), ohne Merker bei unknown „Saugen, dann Wischen“
   */
  private kind(m: string | undefined): string | undefined {
    const modes = this.modes();
    const h = this.val("helper");
    const wet = !m || m === "vac_and_mop";
    if (wet && h && h !== "vacuum" && modes.includes(h)) return h;
    // echte Option des Selects (auch wenn nicht als Knopf angezeigt, z. B. mop) → so nehmen
    if (m) return normMode(m);
    return modes.includes("vac_then_mop") ? "vac_then_mop" : m;
  }

  private anim(): Anim {
    const v = this.st("vacuum")?.state;
    const s = this.val("status") ?? "";
    const mode = this.modeNow();
    if (!v || v === "unavailable" || s === "device_offline") return "offline";
    if (v === "error" || s === "error" || s === "charging_problem") return "error";
    if (s === "emptying_the_bin") return "empty";
    if (s === "washing_the_mop" || s === "attaching_the_mop" || s === "detaching_the_mop") return "wash";
    if (v === "returning" || ["returning_home", "docking", "going_to_wash_the_mop", "back_to_dock_washing_duster"].includes(s)) return "return";
    if (s === "mapping") return "map";
    // Roboter muss von Hand getragen werden (Stockwerk-Wechsel)
    const c = this.carry();
    if (c) return c === "to_dock" ? "carry_in" : "carry_out";
    if (v === "paused") return "pause";
    if (v === "cleaning") {
      // Phase aus dem Status ist genauer als der Modus (bei „Saugen, dann Wischen“: erst Saug-, dann Wischphase)
      if (s.includes("clean_mop_cleaning")) return "cleanmop";
      if (s.includes("mopping")) return "mop";
      if (mode === "vac_and_mop") return "cleanmop";
      if (mode === "mop") return "mop";
      return "clean";
    }
    if (this.drying()) return "dry";
    if (s === "charging" && (this.numVal("battery") ?? 100) < 100) return "charge";
    return "idle";
  }

  /** Hand-Schritt beim Stockwerk-Wechsel: zur Station tragen, zurückbringen oder ins andere Stockwerk bringen */
  private carry(): "to_dock" | "back" | "floor" | undefined {
    const v = this.st("vacuum")?.state ?? "";
    if (CLEAN_STATES.includes(v)) return undefined;
    const back = this.val("back");
    if (back === BACK.carry && v !== "docked") return "to_dock";
    if (back === BACK.done) return "back";
    if (this.val("prep") === PREP.done) return "floor";
    return undefined;
  }

  /** Station trocknet den Mopp (Restzeit läuft) */
  private drying(): boolean {
    return (this.numVal("mop_drying_remaining_time") ?? 0) > 0;
  }

  private statusText(): string {
    const v = this.st("vacuum")?.state;
    const s = this.val("status");
    if (!v || v === "unavailable") return "Nicht erreichbar";
    const c = this.carry();
    if (c) return { to_dock: "Muss zur Station", back: "Bereit zum Zurückbringen", floor: "Bereit fürs andere Stockwerk" }[c];
    if (this.drying() && !CLEAN_STATES.includes(v) && v !== "paused" && v !== "error") return "Mopp trocknet";
    // Station-Ablauf nach dem Rückweg: Leeren/Waschen zeigt der Status selbst, sonst allgemein
    if (this.val("back") === BACK.running && !["emptying_the_bin", "washing_the_mop", "drying"].includes(s ?? "")) return "Station arbeitet";
    if (s === "charging" && (this.numVal("battery") ?? 0) >= 100) return "Voll geladen";
    if (s === "cleaning" || (!s && v === "cleaning")) {
      const m = this.kind(this.current("cleaning_mode"));
      return m === "vacuum" ? "Saugt" : m === "mop" ? "Wischt" : m === "vac_and_mop" ? "Saugt & wischt"
        : m === "vac_then_mop" ? "Saugt, dann wischt" : "Reinigt";
    }
    if (s) return label(STATUS, s);
    return { docked: "In der Station", idle: "Bereit", paused: "Pausiert", returning: "Fährt zur Station", error: "Fehler" }[v] ?? v;
  }

  private issues(): Issue[] {
    const out: Issue[] = [];
    const err = (text: string, ic = "mdi:alert-circle") => out.push({ level: "error", text, icon: ic });
    const v = this.st("vacuum")?.state;
    if (!v || v === "unavailable" || this.val("status") === "device_offline") err("Roboter nicht erreichbar", "mdi:robot-vacuum");
    const ve = this.val("vacuum_error");
    if (ve && ve !== "none") err(label(VACUUM_ERROR, ve), "mdi:robot-vacuum");
    const de = this.val("dock_error");
    if (de && de !== "ok") err(`Station: ${label(DOCK_ERROR, de)}`, "mdi:home-import-outline");
    if (this.val("status") === "charging_problem") err("Ladeproblem", "mdi:alert-circle");
    // Fehlerzustand ohne genauen Fehlercode trotzdem melden
    if (v === "error" && !out.length) err("Roboter meldet einen Fehler", "mdi:robot-vacuum");
    if (this.val("clean_box_empty") === "on") err("Frischwassertank leer — auffüllen", "mdi:water");
    else if (this.val("water_shortage") === "on") err("Wassermangel — Frischwassertank auffüllen", "mdi:water");
    if (this.val("dirty_box_full") === "on") err("Schmutzwassertank voll — leeren", "mdi:water");
    for (const c of this.consumables()) {
      if (c.due) out.push({ level: "warn", text: `${c.name}: ${c.left <= 0 ? "Wartung überfällig" : "Wartung bald fällig"}`, icon: c.icon });
    }
    return out;
  }

  private consumables() {
    const warn = this._config.maintenance_warn ?? 10;
    return CONSUMABLES.flatMap((c) => {
      const left = this.numVal(c.key);
      if (left == null) return [];
      const pct = Math.max(0, Math.min(100, (left / c.life) * 100));
      return [{ ...c, left, pct, due: pct <= warn, resetId: this._e[c.reset] }];
    });
  }

  // ---------- Aktionen ----------

  private call(domain: string, service: string, data: Record<string, unknown>): void {
    this.hass?.callService(domain, service, data).catch((e: any) => {
      this.dispatchEvent(new CustomEvent("hass-notification", {
        detail: { message: `Fehler: ${e?.message ?? e}` }, bubbles: true, composed: true,
      }));
    });
  }

  private vac(service: string, extra: Record<string, unknown> = {}): void {
    this.call("vacuum", service, { entity_id: this._config.entity, ...extra });
  }

  private pick(k: string, value: string): void {
    // Modus-Skript: auch den angezeigten Modus erneut setzen lassen — die Anzeige kann veraltet sein (in der App umgestellt)
    if (k === "cleaning_mode" ? !this._config.mode_script && this.modeNow() === normMode(value) : (this._pending[k] ?? this.current(k)) === value) return;
    if (k === "cleaning_mode") {
      this._freeze = { fan: this.shown("fan"), mop_intensity: this.shown("mop_intensity") };
      this._freezeSig = undefined;
    } else {
      // eigene Auswahl hat Vorrang vor dem eingefrorenen Wert
      const rest = { ...this._freeze };
      delete rest[k];
      this._freeze = rest;
    }
    this._retried.delete(k);
    this.dropPending(k);
    this._pending = { ...this._pending, [k]: value };
    this._pendingAt[k] = Date.now();
    this.send(k, value);
    this.armPendingTimer();
  }

  private send(k: string, value: string): void {
    const script = k === "cleaning_mode" ? this._config.mode_script : undefined;
    if (script) this.call("script", "turn_on", { entity_id: script, variables: { modus: THEN_ALIASES.includes(value) ? "vac_then_mop" : value } });
    else if (k === "fan") this.vac("set_fan_speed", { fan_speed: value });
    else this.call("select", "select_option", { entity_id: this._e[k], option: value });
  }

  /**
   * Gerät hat nach Ablauf nicht übernommen: Stärken einmal nachsenden (springt oft nach einem Moduswechsel zurück),
   * danach den echten Zustand zeigen. Das Modus-Skript prüft und wiederholt selbst, braucht länger.
   */
  private armPendingTimer(): void {
    clearTimeout(this._pendingTimer);
    const long = "cleaning_mode" in this._pending && !!this._config.mode_script;
    this._pendingTimer = window.setTimeout(() => {
      let again = false;
      for (const [k, v] of Object.entries(this._pending)) {
        if (k === "cleaning_mode" || this.current(k) === v || this._retried.has(k)) continue;
        this._retried.add(k);
        this.send(k, v);
        again = true;
      }
      if (again) this.armPendingTimer();
      else {
        this._pending = {};
        this._retried.clear();
      }
    }, long ? 45000 : 8000);
  }

  private setPrep(option: string): void {
    this.call("input_select", "select_option", { entity_id: this._config.floor_prep, option });
  }

  private ask(c: Confirm): void {
    this._confirm = c;
  }

  private moreInfo(): void {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: this._config.entity }, bubbles: true, composed: true }));
  }

  // ---------- Darstellung ----------

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const anim = this.anim();
    const dark = !!this.hass.themes?.darkMode;
    const noanim = this._config.animations === false;
    return html`<div class="card ${dark ? "dark" : ""} ${noanim ? "noanim" : ""}" style="--accent:${this.glow(anim)};--rb-accent:${ACCENT[anim]}">
      ${this.renderHero(anim)}
      ${this.renderStatus()}
      ${this.renderControls()}
      ${this.renderActions()}
    </div>
    ${this.renderMenu()}
    ${this.renderConfirm()}`;
  }

  /** Schein hinterm Roboter: Fehler rot, sonst Tätigkeit; in Ruhe grün bzw. orange bei fälliger Wartung */
  private glow(anim: Anim): string {
    const issues = this.issues();
    if (anim === "offline" || anim === "error" || issues.some((i) => i.level === "error")) return ACCENT[anim === "offline" ? "offline" : "error"];
    if (this.val("back") === BACK.running) return ACTIVE;
    if (anim === "charge" || anim === "idle") return issues.length ? WARN : ACCENT.charge;
    return ACCENT[anim];
  }

  private renderHero(anim: Anim) {
    const bat = this.numVal("battery");
    const charging = this.val("charging") === "on" || this.val("status") === "charging";
    const issues = this.issues();
    const level = issues.some((i) => i.level === "error") ? "error" : issues.length ? "warn" : "ok";
    const hIcon = { ok: "mdi:check-circle", warn: "mdi:alert", error: "mdi:alert-circle" }[level];
    const hText = { ok: "Alles in Ordnung", warn: "Wartung fällig", error: "Problem" }[level];
    const v = this.st("vacuum")?.state;
    const station = anim === "return" ? "ghost"
      : v === "docked" || ["charge", "empty", "wash", "carry_in", "carry_out"].includes(anim) ? "in" : "none";
    return html`<div class="hero tint">
      <div class="name">${this._config.name ?? this.st("vacuum")?.attributes.friendly_name ?? "Saugroboter"}</div>
      <div class="chips">
        ${bat != null ? html`<span class="chip bat ${bat <= 20 && !charging ? "low" : ""}" title="Akku">
          ${svgIcon(batteryPath(bat, charging))}<span>${num(bat)} %</span></span>` : nothing}
        <button class="chip health ${level}" title="${hText} — Zustand & Wartung" aria-label="Zustand und Wartung"
          @click=${() => (this._menu = true)}>${icon(hIcon)}${issues.length > 1 ? html`<span>${issues.length}</span>` : nothing}</button>
      </div>
      <button class="bot-wrap" aria-label="Details" @click=${this.moreInfo}>${robot(anim, station)}</button>
    </div>`;
  }

  private renderStatus() {
    const v = this.st("vacuum")?.state ?? "";
    const running = CLEAN_STATES.includes(v) || v === "paused";
    const parts: string[] = [];
    let progress: number | undefined;
    if (running) {
      const room = this.val("current_room");
      if (room) parts.push(room);
      const area = this.numVal("cleaning_area");
      if (area != null) parts.push(`${num(area, 1)} m²`);
      const t = this.numVal("cleaning_time");
      if (t != null) parts.push(`${num(t)} min`);
      progress = this.numVal("clean_percent");
    } else {
      const err = this.issues().find((i) => i.level === "error");
      if (err) parts.push(err.text);
      const dry = this.numVal("mop_drying_remaining_time");
      if (dry && dry > 0) parts.push(`noch ${hours(dry)}`);
      const last = ago(this.val("last_clean_end"));
      if (!err && last && this._config.show_last_clean !== false) parts.push(`Zuletzt gereinigt ${last}`);
    }
    return html`<div class="status">
      <div class="primary">${this.statusText()}</div>
      ${parts.length ? html`<div class="secondary">${parts.join(" · ")}</div>` : nothing}
      ${progress != null && progress > 0 ? html`<div class="progress" title="${num(progress)} %"><i style="width:${progress}%"></i></div>` : nothing}
    </div>`;
  }

  private renderControls() {
    const modes = this.modes();
    const mode = this.modeNow();
    const v = this.st("vacuum")?.state ?? "";
    const busy = CLEAN_STATES.includes(v) || v === "paused";
    const off = !v || v === "unavailable";
    const showFan = mode !== "mop";
    const showMop = mode !== "vacuum" && !!this._e.mop_intensity;

    const fanList: string[] = this.st("vacuum")?.attributes.fan_speed_list ?? [];
    const mopList: string[] = this.st("mop_intensity")?.attributes.options ?? [];
    return html`<div class="controls">
      ${modes.length ? html`<div class="seg" role="radiogroup" aria-label="Reinigungsmodus">
        ${modes.map((m) => {
          const k = THEN_ALIASES.includes(m) ? "vac_then_mop" : m;
          const on = k === mode;
          // von HA nicht setzbar und kein Modus-Skript → Hinweis statt Befehl
          const tap = m === "vac_then_mop" && !this._config.mode_script && !(this.st("cleaning_mode")?.attributes.options ?? []).includes(m)
            ? () => on || this.ask({
              title: "Saugen, dann Wischen", info: true, ok: "OK", run: () => undefined,
              text: "Diesen Modus kann Home Assistant beim Saros noch nicht einstellen. Bitte in der Roborock-App wählen — die Karte zeigt ihn dann an.",
            })
            : () => this.pick("cleaning_mode", m);
          return html`<button role="radio" aria-checked=${on} class=${on ? "on" : ""}
            ?disabled=${busy || off} @click=${tap}>
            <span class="mi">${(MODE_ICONS[k] ?? ["mdi:robot-vacuum"]).map((i) => icon(i))}</span><span>${label(MODES, k)}</span></button>`;
        })}
      </div>` : nothing}
      ${showFan && fanList.length
        // Max+ geht nur beim reinen Saugen (außer es ist gerade aktiv, sonst wäre keine Stufe markiert)
        ? this.renderLevels("fan", "Saugstärke", "mdi:fan",
          FAN_LEVELS.filter((l) => l !== "max_plus" || mode === "vacuum" || this.shown("fan") === l), fanList, FAN, off)
        : nothing}
      ${showMop && mopList.length ? this.renderLevels("mop_intensity", "Wasserfluss", "mdi:water", MOP_LEVELS, mopList, MOP, off) : nothing}
    </div>`;
  }

  /** Stufen-Leiste: Segmente bis zur gewählten Stufe gefüllt */
  private renderLevels(k: string, title: string, ic: string, order: string[], avail: string[], names: Record<string, string>, off: boolean) {
    const levels = order.filter((l) => avail.includes(l));
    const cur = this.shown(k);
    const idx = levels.indexOf(cur ?? "");
    const stale = this.staleLong(k);
    return html`<div class="levels ${stale ? "stale" : ""}" title=${stale ? "Zuletzt bekannter Wert — Home Assistant meldet gerade keinen" : ""}>
      <div class="lv-head">${icon(ic)}<span>${title}</span><b>${cur ? label(names, cur) : "–"}${stale ? html`<small> · zuletzt</small>` : nothing}</b></div>
      <div class="steps">${levels.map((l, i) => html`<button class=${i <= idx ? "on" : ""} ?disabled=${off}
        title=${label(names, l)} aria-label="${title} ${label(names, l)}" @click=${() => this.pick(k, l)}></button>`)}</div>
    </div>`;
  }

  private renderActions() {
    const v = this.st("vacuum")?.state ?? "";
    const off = !v || v === "unavailable";
    const prep = this.val("prep");
    // „Abbrechen“ länger als 1 min → Automation hängt, Karte nicht blockieren
    const cancelStuck = prep === PREP.cancel && Date.now() - Date.parse(this.st("prep")?.last_changed ?? "") > 60_000;
    const prepBusy = prep === PREP.start || prep === PREP.running || (prep === PREP.cancel && !cancelStuck);
    const cleaning = v === "cleaning";

    // Rückweg aus dem anderen Stockwerk: Roboter muss getragen werden, Ablauf macht die Automation → nur Hinweis
    const back = this.val("back");
    // Hinweis + „Reinigung abbrechen“ (beendet den ganzen Reinigungsvorgang)
    const backBanner = (cls: string, ic: TemplateResult, title: string, text: TemplateResult | string) =>
      html`<div class="banner ${cls}">${ic}<div><b>${title}</b>${text}</div></div>${this.abortAll()}`;
    // in die Station gestellt bzw. Station-Ablauf läuft → Automation meldet danach „Kann zurück“
    // reinigt er schon wieder (Dropdown hängt noch), normale Knöpfe statt Hinweis
    const backStep = !CLEAN_STATES.includes(v);
    if (backStep && (back === BACK.running || (back === BACK.carry && v === "docked"))) {
      return backBanner("", html`<svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle></svg>`,
        "Station arbeitet", "Läuft automatisch — danach kommt der Hinweis zum Zurückbringen.");
    }
    if (backStep && back === BACK.carry) {
      return backBanner("warn", icon("mdi:hand-back-right"), "Zur Station tragen",
        "Roboter von Hand in die Station stellen — der Vorgang startet dann automatisch.");
    }
    if (backStep && back === BACK.done) {
      return backBanner("", icon("mdi:check-circle"), "Station fertig",
        html`Roboter an die vorherige Stelle bringen und einfach nur die ${icon("mdi:power", "inl")}-Taste drücken.`);
    }
    // Vorbereitung läuft → nur deren Knopf, Start/Pause würden der Automation dazwischenfunken
    if (prepBusy) return html`<div class="actions">${this.prepButton(prep!)}</div>`;
    // Vorbereitung fertig, Roboter wartet aufs Umstellen → Hinweis + Reinigung abbrechen
    if (prep === PREP.done && !CLEAN_STATES.includes(v)) {
      return html`<div class="banner">${icon("mdi:check-circle")}<div><b>Vorbereitung fertig</b>
        Roboter ins gewünschte Stockwerk stellen und einfach nur die ${icon("mdi:power", "inl")}-Taste drücken.</div></div>
        ${this.abortAll()}`;
    }

    let row: TemplateResult;
    if (cleaning || v === "returning") {
      row = html`
        ${this.btn("mdi:pause", "Pausieren", () => this.vac("pause"), "sec")}
        ${cleaning ? this.btn("mdi:stop", "Abbrechen", () => this.ask({
          title: "Reinigung abbrechen?", text: "Der Roboter beendet die Reinigung und fährt zurück zur Station.",
          ok: "Abbrechen", danger: true, run: () => this.vac("return_to_base"),
        }), "danger") : nothing}`;
    } else if (v === "paused") {
      // Pause kam von der Stockwerk-Vorbereitung → Roboter steht evtl. im falschen Stockwerk
      const resume = this._pausedForPrep ? () => this.ask({
        title: "Hier fortsetzen?", text: "Der Roboter wurde für ein anderes Stockwerk vorbereitet. Trotzdem hier weiterreinigen?",
        ok: "Fortsetzen", run: () => this.vac("start"),
      })
        // Pause während der Heimfahrt → weiter heimfahren statt neu reinigen
        : this._pausedFrom === "returning" ? () => this.vac("return_to_base")
        : () => this.vac("start");
      row = html`
        ${this.btn("mdi:play", "Fortsetzen", resume, "primary")}
        ${this.btn("mdi:stop", "Abbrechen", () => this.ask({
          title: "Reinigung abbrechen?", text: "Der Roboter beendet die Reinigung und fährt zurück zur Station.",
          ok: "Abbrechen", danger: true, run: () => this.vac("return_to_base"),
        }), "danger")}`;
    } else {
      row = html`
        ${this.btn("mdi:play", "Starten", () => this.vac("start"), "primary", off)}
        ${this._config.floor_prep ? this.prepButton(prep) : nothing}`;
    }
    return html`<div class="actions">${row}</div>`;
  }

  private btn(ic: string, text: string, fn: () => void, kind: string, disabled = false) {
    return html`<button class="btn ${kind}" ?disabled=${disabled} @click=${fn}>${icon(ic)}<span>${text}</span></button>`;
  }

  /** beendet den kompletten Reinigungsvorgang: Roboter stoppt, Stockwerk-/Rückweg-Abläufe werden zurückgesetzt */
  private abortAll() {
    return html`<div class="actions">${this.btn("mdi:stop", "Reinigung abbrechen", () => this.ask({
      title: "Reinigung komplett abbrechen?",
      text: "Die Reinigung wird beendet, Stockwerk-Wechsel und Rückweg werden zurückgesetzt. Der Roboter bleibt, wo er ist.",
      ok: "Abbrechen", danger: true, run: () => {
        this.vac("stop");
        if (this._config.floor_back && this.val("back") !== BACK.ok) {
          this.call("input_select", "select_option", { entity_id: this._config.floor_back, option: BACK.ok });
        }
        if (this.val("prep") === PREP.done) this.setPrep(PREP.cancel);
      },
    }), "danger")}</div>`;
  }

  private cancelPrep(): void {
    this.ask({
      title: "Vorbereitung abbrechen?", text: "Die Stockwerk-Vorbereitung wird abgebrochen.",
      ok: "Abbrechen", danger: true, run: () => this.setPrep(PREP.cancel),
    });
  }

  private prepButton(prep: string | undefined) {
    const spinner = html`<svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle></svg>`;
    const cancelPrep = () => this.cancelPrep();
    switch (prep) {
      case PREP.ready:
        return html`<button class="btn sec" @click=${() => this.setPrep(PREP.start)}>${icon("mdi:stairs")}<span>Stockwerk vorbereiten</span></button>`;
      case PREP.start:
      case PREP.running:
        return html`<button class="btn sec busy" title="Antippen zum Abbrechen" @click=${cancelPrep}>
          ${spinner}<span>Stockwerk wird vorbereitet…</span>${icon("mdi:close", "end")}</button>`;
      case PREP.cancel:
        return html`<button class="btn sec busy" disabled>${spinner}<span>Wird abgebrochen…</span></button>`;
      default:
        // Gesperrt / unbekannt / Entität fehlt
        return html`<button class="btn sec" disabled title="Gerade nicht möglich"><span>Stockwerk vorbereiten</span>${icon("mdi:lock", "end")}</button>`;
    }
  }

  // ---------- Wartungs-Menü ----------

  private close(sel: string): void {
    (this.renderRoot.querySelector(sel) as HTMLDialogElement | null)?.close();
  }

  private renderMenu() {
    if (!this._menu) return nothing;
    const issues = this.issues();
    const yes = (k: string) => this.val(k) === "on";
    const row = (ic: string, text: string, value: string | TemplateResult, cls = "") =>
      html`<div class="row ${cls}"><span class="ic">${icon(ic)}</span><span class="txt">${text}</span><span class="val">${value}</span></div>`;
    const okBad = (ok: boolean, good: string, bad: string) => html`<span class=${ok ? "good" : "bad"}>${ok ? good : bad}</span>`;
    const ve = this.val("vacuum_error");
    const de = this.val("dock_error");
    const dry = this.numVal("mop_drying_remaining_time");
    const total = [
      this.numVal("total_cleaning_count") != null ? row("mdi:counter", "Reinigungen", num(this.numVal("total_cleaning_count"))) : nothing,
      this.numVal("total_cleaning_area") != null ? row("mdi:ruler-square", "Gereinigte Fläche", `${num(this.numVal("total_cleaning_area"))} m²`) : nothing,
      this.numVal("total_cleaning_time") != null ? row("mdi:clock-outline", "Reinigungszeit", hours(this.numVal("total_cleaning_time")!)) : nothing,
      this.val("last_clean_end") ? row("mdi:history", "Letzte Reinigung", ago(this.val("last_clean_end")) ?? "–") : nothing,
    ];
    // Schmutzfänger hat in der Roborock-Integration (noch) gar keine Reset-Taste → kein HA-Hinweis dafür
    const missingReset = this.consumables().some((c) => !c.resetId && c.key !== "strainer_time_left");

    return html`<dialog id="menu" class="dlg ${this.hass?.themes?.darkMode ? "dark" : ""}"
      @close=${() => (this._menu = false)} @click=${(e: Event) => e.target === e.currentTarget && (e.currentTarget as HTMLDialogElement).close()}>
      <div class="dlg-in">
        <div class="dlg-head"><span>Zustand & Wartung</span>
          <button class="x" aria-label="Schließen" @click=${() => this.close("#menu")}>${icon("mdi:close")}</button></div>
        <div class="dlg-body">

        ${issues.length
          ? issues.map((i) => html`<div class="msg ${i.level}">${icon(i.level === "error" ? "mdi:alert-circle" : "mdi:alert")}<span>${i.text}</span></div>`)
          : html`<div class="msg ok">${icon("mdi:check-circle")}<span>Alles in Ordnung</span></div>`}

        <h3>Roboter & Station</h3>
        ${this._e.vacuum_error ? row("mdi:robot-vacuum", "Roboter", okBad(!ve || ve === "none", "Kein Fehler", label(VACUUM_ERROR, ve))) : nothing}
        ${this._e.dock_error ? row("mdi:home-import-outline", "Station", okBad(!de || de === "ok", "Kein Fehler", label(DOCK_ERROR, de))) : nothing}
        ${this._e.clean_box_empty ? row("mdi:water", "Frischwassertank", okBad(!yes("clean_box_empty") && !yes("water_shortage"), "OK", "Auffüllen")) : nothing}
        ${this._e.dirty_box_full ? row("mdi:water", "Schmutzwassertank", okBad(!yes("dirty_box_full"), "OK", "Leeren")) : nothing}
        ${this._e.water_box_attached ? row("mdi:water", "Wasserkasten", yes("water_box_attached") ? "Eingesetzt" : "Nicht eingesetzt") : nothing}
        ${this._e.mop_attached ? row("mdi:robot-vacuum", "Mopp", yes("mop_attached") ? "Angebracht" : "Abgelegt") : nothing}
        ${dry && dry > 0 ? row("mdi:clock-outline", "Mopp trocknet", `noch ${hours(dry)}`) : nothing}

        <h3>Verschleißteile</h3>
        ${this.consumables().map((c) => html`<div class="row cons ${c.due ? "due" : ""}">
          <span class="ic">${icon(c.icon)}</span>
          <span class="txt">${c.name}<small>${c.left <= 0 ? "Wartung überfällig" : `noch ${hours(c.left)}`}${!c.resetId && c.key === "strainer_time_left" ? " · Zurücksetzen in der Roborock-App" : ""}</small>
            <span class="bar"><i style="width:${c.pct}%"></i></span></span>
          <button class="reset" ?disabled=${!c.resetId} title=${c.resetId ? "Zurücksetzen" : c.key === "strainer_time_left" ? "In der Roborock-App zurücksetzen" : "Reset-Taste in HA deaktiviert"}
            aria-label="${c.name} zurücksetzen" @click=${() => this.ask({
              title: `${c.name} zurücksetzen?`,
              text: `Nur nach dem Tauschen bzw. Reinigen. Der Zähler startet dann wieder bei ${c.life} h.`,
              ok: "Zurücksetzen", run: () => this.call("button", "press", { entity_id: c.resetId }),
            })}>${icon("mdi:restore")}</button>
        </div>`)}
        ${missingReset ? html`<div class="note">Zurücksetzen: die „… zurücksetzen“-Tasten des Roboters in HA aktivieren
          (Einstellungen → Geräte → Saros → Entitäten).</div>` : nothing}

        ${total.some((t) => t !== nothing) ? html`<h3>Statistik</h3>${total}` : nothing}

        <div class="dlg-foot">
          <button class="btn sec" @click=${() => this.vac("locate")}>${icon("mdi:map-marker-radius")}<span>Roboter finden</span></button>
        </div>
        </div>
      </div>
    </dialog>`;
  }

  private renderConfirm() {
    const c = this._confirm;
    if (!c) return nothing;
    return html`<dialog id="confirm" class="dlg small ${this.hass?.themes?.darkMode ? "dark" : ""}" @close=${() => (this._confirm = undefined)}
      @click=${(e: Event) => e.target === e.currentTarget && (e.currentTarget as HTMLDialogElement).close()}>
      <div class="dlg-in pad">
        <div class="dlg-head"><span>${c.title}</span></div>
        <p>${c.text}</p>
        <div class="dlg-btns">
          ${c.info ? nothing : html`<button class="btn sec" @click=${() => this.close("#confirm")}>Zurück</button>`}
          <button class="btn ${c.danger ? "danger" : "primary"}" @click=${() => {
            this.close("#confirm");
            c.run();
          }}>${c.ok}</button>
        </div>
      </div>
    </dialog>`;
  }
}
